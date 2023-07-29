const {
	createPayment,
	receiveWebhook,
} = require("../../controllers/payment/controllerPayment");

const postHandlerPayment = async (req, res) => {
	try {
		const { products, totalPrice, title } = req.body;
		console.log(totalPrice, title, "datoooooooo");


		const response = await createPayment(products, totalPrice, title);

		console.log(response);
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
