const { 
       suspendUser, 
       unSuspendUser, 
       deletedUser,
       adminUser
      } = require("../../controllers/darkboardAdmin/darkboradAdmin");

//Convertir usuario a Admin
const handleAdminUser = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await adminUser(id)
  
      if (response) {
        res.status(200).json({ message: "Usuario ya es Admin." })
      } else {
        res.status(401).json({ message: "Usuario no encontrado." })
      }
    } catch (error){
      console.log(error.message);
      res.status(400).json({error: error.message})
    }
  };

//Eliminar usuario
const handleDeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteUser = await deletedUser(id)
  
      if (deleteUser) {
        res.status(200).json({ message: "Usuario eliminado." })
      } else {
        res.status(401).json({ message: "Usuario no encontrado." })
      }
    } catch (error){
      console.log(error.message);
      res.status(400).json({error: error.message})
    }
  };
  
  //Suspender usuario
  const handleSuspendUser = async (req, res) => {
    const { id } = req.params;
    try {
      const suspendeUser = await suspendUser(id)
      console.log(suspendeUser);
      if (suspendeUser) {
        res.status(200).json({message: "Usuario suspendido."})
      } else {
        res.status(401).json({message: "Usuario no encontrado."})
      }
    } catch (error) {
      console.log(error.message)
      res.status(400).json({error: error.message})
    }
  }
  
  //Quitar suspension al usuario
  const handleUnsuspendUser = async (req, res) => {
    const { id } = req.params;
    try {
      const unSuspendeUser = await unSuspendUser(id)
      console.log(unSuspendeUser);
      if (unSuspendeUser) {
        res.status(200).json({message: "Se quito la suspensión del usuario."})
      } else {
        res.status(401).json({message: "Usuario no encontrado."})
      }
    } catch (error) {
      console.error(error)
      res.status(400).json({message: "Error al quitar la suspensión."})
    }
  }
  
module.exports = {
    handleDeleteUser,
    handleSuspendUser,
    handleUnsuspendUser,
    handleAdminUser
}