const {allAuthor, createAuthor }= require("../../controllers/author/controllerAuthor")

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

module.exports ={ 
    getHandleAllAuthor,
    postHandleAuthor
};