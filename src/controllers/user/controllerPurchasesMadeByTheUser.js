const { User, BuyBook } = require("../../db");

const purchasesMadeByTheUser = async (id) => {
    try {

        const buys = await User.findByPk(id, {
            include: BuyBook
        });

        return buys;

    } catch (error) {
        throw error;
    };
};

module.exports = {
    purchasesMadeByTheUser
};