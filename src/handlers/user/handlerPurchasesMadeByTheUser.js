const { purchasesMadeByTheUser } = require("../../controllers/user/controllerPurchasesMadeByTheUser");

const handlerPurchasesMadeByTheUser = async (req, res) => {
    try {

        const { id } = req.params;
        const buys = await purchasesMadeByTheUser(id);

        res.status(200).json(buys);

    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    handlerPurchasesMadeByTheUser
};