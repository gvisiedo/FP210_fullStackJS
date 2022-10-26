const Usuario = require("../models/usuarioModel");

const { getPostData } = require("../../util");




async function createUsuario(req, res) {
  try {
      let body = '';
      // recibir los datos
      req.on('data', (chunk) => {
          // lo convertimos a una string
          body += chunk.toString();
      })
      // para terminar el request
      req.on('end', async () => {
      // objeto js con la informacion
          const { username, password } = JSON.parse(body);

          const usuario = {
              username,
              password,
          }

          const newUsuario = await Usuario.create(usuario);

          // escribir la informacion del head
          res.writeHead(201, {'Content-Type': 'application/json'})
          return res.end(JSON.stringify(newUsuario));
      })
  } catch (error) {
      console.log(error);
  }
}



async function createUser(req, res, data) {
  try {
    await Usuario.createUser(data);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function ApiGetUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(usuarios));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function ApiGetUsuario(req, res, id) {
  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Usuario no encontrado" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(usuario));
    }
  } catch (error) {
    console.log(error);
  }
}

async function ApiCreateUsuario(req, res) {
  try {
    const body = await getPostData(req);

    const { username, password } = JSON.parse(body);

    const usuario = {
      username,
      password,
    };

    const newUsuario = await Usuario.create(usuario);
    res.writeHead(201, { "Content-type": "application/json" });
    return res.end(JSON.stringify(newUsuario));
  } catch (error) {
    console.log(error);
  }
}

async function ApiUpdateUsuario(req, res, id) {
  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Usuario no encontrado" }));
    } else {
      const body = await getPostData(req);

      const { username, password } = JSON.parse(body);

      const usuarioData = {
        username: username || usuario.username,
        password: password || usuario.password,
      };

      const updUsuario = await Usuario.update(id, usuarioData);
      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify(updUsuario));
    }
  } catch (error) {
    console.log(error);
  }
}

//
async function ApiDeleteUsuario(req, res, id) {
  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Usuario no encontrado" }));
    } else {
      await Usuario.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Usuario ${id} ha sido eliminado` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUsuario,
  createUser,
  ApiGetUsuarios,
  ApiGetUsuario,
  ApiCreateUsuario,
  ApiUpdateUsuario,
  ApiDeleteUsuario,
};
