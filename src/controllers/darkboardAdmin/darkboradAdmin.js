const { User } = require("../../db")

const deletedUser = async (id) => {
    const deletedUser = await User.destroy({ where: { id: id } })
    console.log(deletedUser)
    return deletedUser;
}
const suspendUser = async (id) => {
    const suspendUser = await User.findByPk(id);
    if(suspendUser.isActive === true){
        await suspendUser.update({isActive: false})
        return true;
    }
    return false;
}
const unSuspendUser = async (id) => {
    const unsuspendUser = await User.findByPk(id);
    if(unsuspendUser.isActive === false){
       await unsuspendUser.update({isActive: true})
       return true
    }
    return false;
}

module.exports = {
    deletedUser,
    suspendUser,
    unSuspendUser
}