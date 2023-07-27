const {
	createPayment,
	receiveWebhook,
} = require("../../controllers/payment/controllerPayment");

const postHandlerPayment = async (req, res) => {
	try {
		const { totalAmount, title, item_id, quantity } = req.body;

		const response = await createPayment(totalAmount, item_id, title, quantity);
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
