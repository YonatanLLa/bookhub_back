const mercadopago = require("mercadopago");
const { Venta, User } = require("../../db.js");
require("dotenv").config();

const { URL_BACK, URL_fRONT, URL_TOKEN } = process.env;

const createPayment = async (products, totalPrice, title, userid) => {
	console.log(userid, "items");
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
			products: products,
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

			console.log(response, "response");

			const { send } = response.dataValues;
			if (!send) {
				await response.update({ send: true });
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
