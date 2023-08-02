const { suspenBook, unSuspenBook } = require("../../controllers/darkboardAdmin/darkboradAdmin");

// suspende el libro
const handleSuspendBook = async (req, res) => {
    const  { id } = req.params;
    try {
        const response = await suspenBook(id)
        if (response) {
            res.status(200).json({message: "Libro suspendido."})
          } else {
            res.status(401).json({message: "Libro no encontrado."})
          }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: error.message})
    }
}

// quita la suspencion del libro
const handleUnsuspendBook = async (req, res) => {
    const  { id } = req.params;
    try {
        const response = await unSuspenBook(id)
        if (response) {
            res.status(200).json({message: "Se quito la suspensión del libro."})
          } else {
            res.status(401).json({message: "Libro no encontrado."})
          }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    handleSuspendBook,
    handleUnsuspendBook
}