const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../services/generar-jwt");

//gestionar la creacion de un usuario

const crearUser = async(req, res) =>{

const{ name, lastName, email, password} = req.body

if(!name || !lastName || !email || !password){
    return res.status(404).json({
        msg: "todos los campos son requeridos",
        status: 404
    })
}


try{

    const salt = bcrypt.genSaltSync();

    bcrypt.hashSync(password, salt)

    await User.create({

        name:name,
        lastName:lastName,
        email:email,
        password:bcrypt.hashSync(password, salt)
    })

    res.status(201).json({
        msg: "Usuario creado corectamente",
        status: 201,
    })

} 
catch(error) {
    console.log(error)
    res.status(500).json({
        msg: "Error al crear el usuario",
        status: 500,
    })


}

}
    
    


//gestionar el login de un usuario

const loginUser =  async(req, res) =>{

    const { email, password} = req.body;

    if(!email || !password){

     return res.status(404).json({
     msg: "todos los campos son requeridos",
     status: 404

    })
    }

try{

    const findUser = await User.findOne({email: email});
    if(!findUser) {
    return res.status(404).json({
        msg: `Usuario con email ${email} no encontrado`,
        status: 404,
    })

    }

    if(findUser.status !== "active"){
        return res.status(404).json({
            msg: `Usuario no esta activo`,
            status: 404,
    })
}

//Verificar contraseña

const passVerifi = bcrypt.compareSync(password, findUser.password);

if(!passVerifi){
    return res.status(404).json({
        msg:"contraseña incorrecta",
        status: 404,
    });
}

const token = await generarJWT(findUser._id);

res.status(200).json ({
    msg:`Usuario con email ${email} logueado correctamente`,
    status: 200,
    data:{
        name: findUser.name,
        lastName: findUser.lastName,
        email: findUser.email
    },
    token: token
})

}catch (error){
    console.log(error)
    res.status(500).json({
        msg: "Error al crear el usuario",
        status: 500,

})
}

}



const getUserById = async(req, res) => {

    const {iduser} = req.params;


    if(!iduser){
        return res.status(404).json({
            msg:"Id de usuario es requerido",
            status: 404,
        });
    }


const user =  await User.findById(iduser);

if(!user){
    return res.status(404).json({
        msg:"Usuario no encontrado",
        status: 404,
    });
}

res.status(200).json({
    msg:"usuario encontrado exitosamente",
    data:{
        name: user.name,
        lastName: user.lastName,
        email: user.email,
    },
    status: 200,
});

}
module.exports = { crearUser,getUserById,
loginUser}