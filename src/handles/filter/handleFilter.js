const filter = require("../../controllers/filter/controllerFilter")

const getFilter = async (req, res) => {
    const query = req.query
  try {
    //console.log("query",query)
    const response = await filter(query)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({error: error.message})
  }
}

module.exports = getFilter;