const {allAuthor, createAuthor, updateAuthor, deleteAuthor }= require("../../controllers/author/controllerAuthor")

//trae todo los autores
const getHandleAllAuthor = async (req, res) => {
    const { name } = req.query;
    try {
        const response = await allAuthor()
        if(name){
            const responseName = response.filter((element)=> element.toLowerCase().includes(name.toLowerCase()))
            return res.status(200).json(responseName)
        }
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

//crea el autor
const postHandleAuthor = async (req, res) => {
    const { name } = req.body
    try {
        const response = await createAuthor(name)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

//actualiza el autor
const putHandleAuthor = async (req, res) => {
    const { name } = req.params;
    const { newName } = req.body;
    try {
        const response = await updateAuthor(name, newName)
        if (!response) {
            return res.status(404).json({ error: 'Autor no encontrado' });
          }
        return res.status(200).json({msg: "Autor modificado."})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

//elimina el autor
const deleteHandleAuthor = async (req, res) => {
    const { name } = req.params;
    try {
        const response = await deleteAuthor(name)

        return res.status(200).json({msg: "Autor eliminado."})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

module.exports ={ 
    getHandleAllAuthor,
    postHandleAuthor,
    putHandleAuthor,
    deleteHandleAuthor
};