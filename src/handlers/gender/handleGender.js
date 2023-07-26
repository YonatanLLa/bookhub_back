const allGender = require("../../controllers/gender/controllerGender");

const getHandleAllGender = async (req, res) => {
    try {
        const response = await allGender();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

module.exports = getHandleAllGender;