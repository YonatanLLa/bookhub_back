const mercadopago = require("mercadopago");
const { Venta, User, Book } = require("../../db.js");
const { avisoDeCompra, avisoAlVendedor } = require("../../email/email.js");
require("dotenv").config();

const { URL_BACK, URL_fRONT, URL_TOKEN } = process.env;

const createPayment = async (products, totalPrice, title, userid) => {
	const bookInstances = await Book.findAll({
		attributes: ["venta_user_id", "id"],
	});

	const productsTotal = products?.map((product) => {
		const matchingBookInstance = bookInstances.find(
			(bookInstance) => bookInstance.dataValues.id === product.item_id
		);

		if (matchingBookInstance) {
			return {
				...product,
				ventaId: matchingBookInstance.dataValues.venta_user_id,
			};
		}
		return product;
	});

	mercadopago.configure({
		access_token: `${URL_TOKEN}`,
	});

	const preference = {
		items: [
			{
				title: title,
				quantity: 1,
				currency_id: "ARS",
				unit_price: totalPrice,
			},
		],
		back_urls: {
			success: `${URL_fRONT}/home`,
			failure: `${URL_fRONT}/carrito`,
			pending: `${URL_fRONT}/carrito`,
		},
		binary_mode: true,
		notification_url: `${URL_BACK}/webhook`,
	};
	const paymentPreference = await mercadopago.preferences.create(preference);

	const [newEntry, created] = await Venta.findOrCreate({
		where: {
			id: paymentPreference.body.id,
		},
		defaults: {
			id: paymentPreference.body.id,
			products: productsTotal,
			purchaseDate: new Date(),
		},
	});

	const user = await User.findByPk(userid);
	await newEntry.setUser(user);

	if (created) {
		return {
			preference_id: paymentPreference.body.id,
			new: newEntry,
			url: paymentPreference.body.init_point,
		};
	}
	return paymentPreference;
};

const receiveWebhook = async (req) => {
	if (req.query.topic === "merchant_order") {
		const mpResponse = await mercadopago.merchant_orders.findById(req.query.id);
		const { preference_id, order_status } = mpResponse.response;

		if (order_status === "payment_required") {
			const response = await Venta.findByPk(preference_id);

			const productsTotal = response.products;
			const { send } = response.dataValues;
			if (!send) {
				await response.update({ send: true });
				await avisoDeCompra(preference_id);
				await avisoAlVendedor(preference_id);
				for (const product of productsTotal) {
					const book = await Book.findByPk(product.item_id);
					if (book) {
						const newAvailable = book.available - product.quantity;
						console.log(newAvailable, "newAvailable");
						const available = Math.max(0, newAvailable);
						await book.update({ available });
					}
				}
			}
		}
	}
	return {
		status: "success",
	};
};
module.exports = {
	createPayment,
	receiveWebhook,
};
