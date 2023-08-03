const { allGender, postGender, putGender, deleteGender } = require("../../controllers/gender/controllerGender");

// me trae todo los generos
const getHandleAllGender = async (req, res) => {
    try {
        const response = await allGender();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

// me crea el generos
const postHandleGender = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await postGender(name);
        if(!response){
           return res.status(404).json({ error: 'Nombre no encontrado' });
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

// me actualiza el generos
const putHandleGender = async (req, res) => {
    const { name } = req.params;
    const { newName } = req.body;
    try {
        const response = await putGender(name, newName);
        if (!response) {
            return res.status(404).json({ error: 'Gender no encontrado' });
          }
        return res.status(200).json({msg: "Gender modificado."})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

// me elimina el generos
const deleteHandleGender = async (req, res) => {
    const { name } = req.params;
    try {
        const response = await deleteGender(name);
        return res.status(200).json({msg: "Genero eliminado."});
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getHandleAllGender,
    postHandleGender,
    putHandleGender,
    deleteHandleGender
};