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

    // Recorremos cada compra
    for (const compra of allcompra) {
        const purchaseDate = new Date(compra.purchaseDate);
        const dayOfWeek = purchaseDate.getDay(); // 0 (Domingo) a 6 (Sábado)

        // Recorremos cada producto de la compra
        for (const product of compra.products) {
            let productId;
            
            // Comprobamos si existe item_id o book_id en el producto
            if (product.item_id !== undefined) {
                productId = product.item_id;
            } else if (product.book_id !== undefined) {
                productId = product.book_id;
            } else {
                continue; // Salta a la próxima iteración si no hay ID válido
            }

            // Buscamos el libro relacionado con el producto
            const book = await Book.findOne({
                where: {
                    id: productId,
                    venta_user_id: userId, // Asegúrate de que el libro sea tuyo
                },
            });

            if (book) {
                if (!purchaseDataByDayOfWeek[dayOfWeek]) {
                    purchaseDataByDayOfWeek[dayOfWeek] = 0;
                }

                // Sumamos el totalAmount al día correspondiente
                purchaseDataByDayOfWeek[dayOfWeek] += product?.price;
            }
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