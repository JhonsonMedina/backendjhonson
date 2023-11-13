const router = require("express").Router();

// crear un usuario
router.post("/crear", (req, res) => res.send("rutas para crear un usuario")); 

//hacer login
router.post("/login", (req, res) => res.send("rutas para loguear")); 


//obtener un usuario por su id


//obtener el listado de todos los usuarios

//actualizar su informacion


module.exports = router