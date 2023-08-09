const { Venta, Book } = require("../../db")
const { Op } = require("sequelize")


const allCompras = async (userId,startOfWeek, endOfWeek) => {
    const allcompra = await Venta.findAll({
        where: {
            send: true,
            purchaseDate: {
                [Op.gte]: startOfWeek,
                [Op.lt]: endOfWeek,
            },
        },
    });

    const purchaseDataByDayOfWeek = {};
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    for (const compra of allcompra) {
        const purchaseDate = new Date(compra.purchaseDate);
        const dayOfWeek = purchaseDate.getDay();

        for (const product of compra.products) {
            if (!purchaseDataByDayOfWeek[dayOfWeek]) {
                purchaseDataByDayOfWeek[dayOfWeek] = 0;
            }

            purchaseDataByDayOfWeek[dayOfWeek] += product?.price || 0;
        }
    }

    const formattedPurchaseData = daysOfWeek.map((day, index) => ({
        dia: day,
        ventas: purchaseDataByDayOfWeek[index] || 0,
    }));

    return formattedPurchaseData;
}

module.exports = {
    allCompras
}