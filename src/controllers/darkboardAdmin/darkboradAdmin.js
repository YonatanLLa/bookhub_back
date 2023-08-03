const { User, Book } = require("../../db")

// eliminar usuario
const adminUser = async (id) => {
    const response = await User.findByPk(id);
    if(response.admin === false){
        await response.update({admin: true})
        return true;
    }
    return false;
}

// eliminar usuario
const deletedUser = async (id) => {
    const deletedUser = await User.destroy({ where: { id: id } })
    console.log(deletedUser)
    return deletedUser;
}

// supender usuario
const suspendUser = async (id) => {
    const suspendUser = await User.findByPk(id);
    if(suspendUser.isActive === true){
        await suspendUser.update({isActive: false})
        return true;
    }
    return false;
}

// aquita suspencion del usuario
const unSuspendUser = async (id) => {
    const unsuspendUser = await User.findByPk(id);
    if(unsuspendUser.isActive === false){
       await unsuspendUser.update({isActive: true})
       return true
    }
    return false;
}

//
const suspenBook = async (id) => {
    const suspendBook = await Book.findByPk(id);
    if(suspendBook.isActive === true){
       await suspendBook.update({isActive: false})
       return true
    }
    return false;
}
//
const unSuspenBook = async (id) => {
    const unsuspendBook = await Book.findByPk(id);
    if(unsuspendBook.isActive === false){
       await unsuspendBook.update({isActive: true})
       return true
    }
    return false;
}

module.exports = {
    deletedUser,
    suspendUser,
    unSuspendUser,
    suspenBook,
    unSuspenBook,
    adminUser
}