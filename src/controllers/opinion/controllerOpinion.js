const { Venta, Book, Punctuation, Comment } = require("../../db")

const opinions = async (userId) => {
    const ventas = await Venta.findAll({
        where: { UserId: userId, send: true },
    });

    // Obtener todos los libros vendidos por el usuario en las ventas
    const librosVendidos = [];
    ventas.forEach((venta) => {
        console.log("venta", venta.products);
        const products = venta.products || []; // Si no hay productos, usa un array vacío
        products.forEach((product) => {
            if(product.item_id !== undefined){
                console.log("product", product.item_id);
                librosVendidos.push(product.item_id);
            }else{
                console.log("book-id", product.book_id);
                librosVendidos.push(product.book_id);

            }
        });
    });

    // Obtener los IDs de los libros con puntuaciones y comentarios del usuario
    const puntuaciones = await Punctuation.findAll({
        where: { UserId: userId },
        attributes: ["BookId"],
    });

    const comentarios = await Comment.findAll({
        where: { UserId: userId },
        attributes: ["BookId"],
    });

    const librosConOpiniones = new Set([
        ...puntuaciones.map((puntuacion) => puntuacion.BookId),
        ...comentarios.map((comentario) => comentario.BookId),
    ]);
console.log("libro", librosConOpiniones);
console.log("libroVendido", librosVendidos);
    // Filtrar los libros vendidos que no tienen puntuaciones ni comentarios
    const librosSinOpiniones = librosVendidos.filter(
        (libroId) => !librosConOpiniones.has(libroId)
    );
 if (librosSinOpiniones.length !== 0) {
     const response = await Book.findAll({
         where: {id: librosSinOpiniones}
     })
    return response
 }

    return librosSinOpiniones;
};

const opinionById = async (id, userId) => {
    const ventas = await Venta.findAll({
        where: { UserId: userId, send: true },
    });

    // Obtener todos los libros vendidos por el usuario en las ventas
    const librosVendidos = [];
    ventas.forEach((venta) => {
        //console.log("venta", venta.products);
        const products = venta.products || []; // Si no hay productos, usa un array vacío
        products.forEach((product) => {
            if(product.item_id !== undefined || product.item_id === id){
                console.log("product", product.item_id);
                librosVendidos.push(product.item_id);
            }else if(product.item_id === undefined ||product.book_id === id){
                console.log("book-id", product.book_id);
                librosVendidos.push(product.book_id);
            }
        });
    });

    // Obtener los IDs de los libros con puntuaciones y comentarios del usuario
    const puntuaciones = await Punctuation.findAll({
        where: { BookId: id, UserId: userId  },
        attributes: ["BookId"],
    });

    const comentarios = await Comment.findAll({
        where: { BookId: id,  UserId: userId },
        attributes: ["BookId"],
    });
    const filte = librosVendidos.filter((e)=> e === id)
    console.log("filte", filte);
    if(filte.length === 0){
        return true
    }

    if(comentarios.length !== 0 && puntuaciones.length !== 0){
        console.log("puntuaciones", puntuaciones);
        console.log("comentarios", comentarios);
        const librosConOpiniones = new Set([
        ...puntuaciones.map((puntuacion) => puntuacion.BookId),
        ...comentarios.map((comentario) => comentario.BookId),
    ]);
console.log("libro", librosConOpiniones);
console.log("libroVendido", librosVendidos);
// Filtrar los libros vendidos que no tienen puntuaciones ni comentarios
const librosSinOpiniones = librosVendidos.filter(
    (libroId) => !librosConOpiniones.has(libroId)
    );
    console.log("librosSinOpiniones", librosSinOpiniones);
 if (librosSinOpiniones.length !== 0) {
     return true
 }
 return false
    } 
    console.log("no");
    return false;
};

module.exports = {
    opinions,
    opinionById
}