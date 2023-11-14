const { crearUser,getUserById, loginUser } = require("../controllers/user.controller");

const router = require("express").Router();

// crear un usuario
router.post("/crear", crearUser); 

//hacer login
router.post("/login", loginUser); 


//obtener un usuario por su id

router.get("/getbyid/:iduser", getUserById)
//obtener el listado de todos los usuarios

//actualizar su informacion


module.exports = router