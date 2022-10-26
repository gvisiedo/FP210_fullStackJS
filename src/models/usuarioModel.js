const usuarios = require('../../usuarios.json');
const Usuario = require("./Usuario");
const {v4: uuidv4} = require('uuid');

const {writeDataToFile} = require('../../util');

function findAll(){
    return new Promise((resolve, reject) =>{
      resolve(usuarios);
    })
}

async function create(user) {
  let u =  new Promise((resolve,reject) => {
      const newUser = user;     
          usuarios.push(newUser);
          // llamamos al utility para agregar los datos a la array
          writeDataToFile('../../usuarios.json', usuarios);
          resolve(newUser);
  })
  u.then((message) => {
      console.log(message)
  }). catch((message) => {
      console.log(message)
  })
}

/*function createUser(data) {
  return new Promise((resolve, reject) => {
      resolve(usuarios.push(data));
  })
}*/

//some devuelve un booleano. Si está devolverá true
function usernameExist(username){
  return usuarios.some((usuario) => usuario.username === username);
}

function findByUsername(username){
  return new Promise((resolve, reject) =>{
    const usuario = usuarios.find((usuario) => usuario.username === username);
    resolve(usuario);
  })
}

function createUserJson(usuario){
  return new Promise((resolve, reject) =>{
    const newUsuario = {id: uuidv4(), ...usuario};
    usuarios.push(newUsuario);
    writeDataToFile('./usuarios.json', usuarios);
    resolve(newUsuario);
  })
}

function update(id, usuario){
  return new Promise((resolve, reject) =>{
    const index = usuarios.findIndex((u) =>u.id === id);
    usuarios[index] = {id, ...usuario};

    writeDataToFile('./usuarios.json', usuarios);
    resolve(usuarios[index]);
  })
}

function remove(id){
  return new Promise((resolve, reject) =>{
    usuarios = usuarios.filter((u) => u.id !== id);
    writeDataToFile('./usuarios.json', usuarios);
    resolve();
  })
}

module.exports = {
  create,
  //createUser,
  findAll,
  usernameExist,
  findByUsername,
  createUserJson,
  update,
  remove,
  

}

