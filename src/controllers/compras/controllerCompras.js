const { Venta } = require("../../db")

const allCompras = async () => {
    const allcompra = await Venta.findAll({
        where: {
            send: true,
        },
    });

    const purchaseDataByMonth = {};

    allcompra.forEach(compra => {
        const purchaseDate = new Date(compra.purchaseDate);
        const month = purchaseDate.toLocaleString("default", { month: "long" }); // Obtener el nombre del mes
        const totalAmount = compra.products.reduce((total, product) => total + product.totalAmount ?product.totalAmount: product.unit_price, 0);

        if (!purchaseDataByMonth[month]) {
            purchaseDataByMonth[month] = 0;
        }

        purchaseDataByMonth[month] += totalAmount;
    });

    const formattedPurchaseData = Object.keys(purchaseDataByMonth).map(month => ({
        mes: month,
        total: purchaseDataByMonth[month],
    }));

    return formattedPurchaseData;
}

module.exports = {
    allCompras
}