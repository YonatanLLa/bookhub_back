const {
	createPayment,
	receiveWebhook,
} = require("../../controllers/payment/controllerPayment");

const postHandlerPayment = async (req, res) => {
	try {
		const {unit_price} = req.body

		const response = await createPayment(unit_price);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

const postHandlerWebhook = async (req, res) => {
	try {
		const response = await receiveWebhook(req);
		return res.status(200).json("success");

	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	postHandlerPayment,
	postHandlerWebhook,
};
