const mercadopago = require("mercadopago");

const createPayment = async (unit_price) => {
	mercadopago.configure({
		access_token:
			"TEST-720103210760998-062018-26bb891f51d99b0b8cd420627bbe27f2-1404207396",
	});
	const result = await mercadopago.preferences.create({
		items: [
			{
				title: "Test",
				quantity: 1,
				currency_id: "ARS",
				unit_price: unit_price,
			},
		],
		back_urls: {
			success: "http://localhost:5173/payment/failure",
			failure: "http://localhost:3000/payment/failure",
			pending: "http://localhost:3000/payment/pending",
		},
		notification_url: "https://4b30-181-66-151-71.ngrok.io",
	});

	console.log(result);

	return result;
};

const receiveWebhook = async (req) => {
	try {
		const { action, data } = req.body;
		if (action === "payment.created") {
			const paymentId = data.id;

			// Consultar el estado del pago en Mercado Pago
			const payment = await mercadopago.payment.findById(paymentId);
         
			console.log(payment, "payment.... ");
			// Actualizar el estado del pago en la base de datos según corresponda
	
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	createPayment,
	receiveWebhook,
};
