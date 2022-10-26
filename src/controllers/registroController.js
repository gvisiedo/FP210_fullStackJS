const Usuario = require("../models/usuarioModel");
const usuarios = require('../../usuarios.json')

async function userExists(username,password){
  var estaRegistrado =false;

  new Promise((resolve, reject) => {
      resolve(usuarios);
  })

  usuarios.forEach((user)=>{
      if(user.username == username && user.password == password){
          estaRegistrado = true;
      }
  });

  return userRegistered;
}


async function registraUsuario(req, res) {


  try {
    await Usuario.createUser(req.body);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Usuario creado");
    res.end();
  } catch (error) {
    console.log(error);
  }

}
  

module.exports = {
  userExists,
  registraUsuario
}