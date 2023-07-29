const mercadopago = require("mercadopago");
const { Buy } = require("../../db.js");

const createPayment = async (products, totalPrice, title) => {
	console.log(products, "items");
	mercadopago.configure({
		access_token:
			"TEST-720103210760998-062018-26bb891f51d99b0b8cd420627bbe27f2-1404207396",
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
			success: "http://localhost:5173/home",
			failure: "http://localhost:5173/carrito",
			pending: "http://localhost:3000/payment/pending",
		},
		binary_mode: true,
		notification_url: "https://6d96-181-66-151-108.ngrok.io/webhook",
	};

	try {
		const paymentPreference = await mercadopago.preferences.create(preference);

		const [newEntry, created] = await Buy.findOrCreate({
			where: {
				id: paymentPreference.body.id,
			},
			defaults: {
				id: paymentPreference.body.id,
				products: products,
				purchaseDate: new Date(),
			},
		});

		console.log(created, "created");

		if (created) {
			return {
				preference_id: paymentPreference.body.id,
				new: newEntry,
				url: paymentPreference.body.init_point,
			};
		}

		res.status(400).json("Error al subir la compra");
		return paymentPreference;
	} catch (error) {
		res.status(500).json("Error creating payment preference.");
	}
};

const receiveWebhook = async (req) => {
	 try {
		// console.log(req.query, "query");
			if (req.query.topic === "merchant_order") {
				const mpResponse = await mercadopago.merchant_orders.findById(
					req.query.id
				);
				const { preference_id, order_status } = mpResponse.response;
				if (order_status === "payment_required") {
					const response = await Buy.findByPk(preference_id);
					const { send } = response.dataValues;
					if (!send) {
						await response.update({ send: true });
					}
				}
			}
			return {
				status: "success",
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
};
module.exports = {
	createPayment,
	receiveWebhook,
};
