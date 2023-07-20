const allAuthor = require("../../controllers/author/controllerAuthor")

const getHandleAllAuthor = async (req, res) => {
    try {
        const response = await allAuthor()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

module.exports = getHandleAllAuthor;