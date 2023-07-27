const {Router} = require("express")

const {
	postHandlerPayment,
	postHandlerWebhook,
} = require("../../handlers/payment/handlePayment");

const routerPayment = Router();

routerPayment.post("/payment", postHandlerPayment);

routerPayment.get("/success", (req, res) => {
	res.send("success");
});
routerPayment.get("/failure", (req, res) => {
	res.send("failure");
});
routerPayment.get("/pending", (req, res) => {
	res.send("pending");
});

routerPayment.post("/webhook", postHandlerWebhook);

module.exports = routerPayment;