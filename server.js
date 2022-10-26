const path = require("path");
const { createReadStream } = require("fs");
const http = require("http");

// importar utils
const { getReqData } = require("./util");

// importar las clases
const Usuario = require("./src/models/Usuario");
const { findByEmail } = require("./src/models/usuarioModel");

// importar controladores y modelos
const register = require("./src/controllers/registroController");
const {
  createUsuario,
  createUser,
  ApiGetUsuarios,
  ApiGetUsuario,
  ApiCreateUsuario,
  ApiUpdateUsuario,
  ApiDeleteUsuario,
} = require("./src/controllers/usuarioController");

let usuarioArray = new Array();

const usuario1 = new Usuario("iago", "iago1@uoc.edu", "1234");
usuarioArray.push(usuario1);
const usuario2 = new Usuario("blanca", "blanca2@uoc.edu", "5678");
usuarioArray.push(usuario2);

// definir el puerto en el environment, o el local
const PORT = process.env.PORT || 8888;
const HTML_CONTENT_TYPE = "text/html";
const CSS_CONTENT_TYPE = "text/css";
const JS_CONTENT_TYPE = "text/javascript";
const JSON_CONTENT_TYPE = "application/json";

// creamos la ruta de las vistas
const PUBLIC_FOLDER = path.join(__dirname, "public");

// creamos un servidor
const server = http.createServer(async (req, res) => {
  const { url } = req;
  let statusCode = 200;
  let contentType = HTML_CONTENT_TYPE;
  let stream;

  // crear los endpoints
  if (url === "/") {
    stream = createReadStream(`${PUBLIC_FOLDER}/views/login.html`);
  } else if (url === "/register" && req.method === "GET") {
    console.log(usuarioArray);
    stream = createReadStream(`${PUBLIC_FOLDER}/views/registro.html`);
  } else if (url === "/register" && req.method === "POST") {
    console.log(usuarioArray);
    createUsuario(req, res)

      // cargar login page
      stream = createReadStream(`${PUBLIC_FOLDER}/views/registro.html`);

  } else if (url === "/login") {
    if (req.method === "GET") {
      stream = createReadStream(`${PUBLIC_FOLDER}/views/login.html`);
    }
    if (req.method === "POST") {
      req.on("data", async (chunk) => {
        let usuarioEnviado = JSON.parse(chunk);
        var exists = await findByEmail(usuarioEnviado.email);
        if (exists) {
          console.log(
            "El usuario " +
              usuarioEnviado.email +
              " existe y sus credenciales son correctas. "
          );
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(exists));
        } else {
          console.log("El usuario " + usuarioEnviado.email + " NO EXISTE!!! ");
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("User no found");
        }
      });
    }
  }
  // para los archivos CSS
  else if (url.match(".css$")) {
    contentType = CSS_CONTENT_TYPE;
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`);

    // para los archivos JavaScript
  } else if (url.match(".js$")) {
    contentType = JS_CONTENT_TYPE;
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`);

    // para los archivos png
  } else if (url.match(".png$")) {
    contentType = "image/png";
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`);
  } else {
    // si llegamos aquí, es un 404
    statusCode = 404;
  }
  // escribimos las cabeceras de la respuesta dependiendo de la request
  res.writeHead(statusCode, { "Content-Type": contentType });
  // si tenemos un stream, lo enviamos a la respuesta
  if (stream) stream.pipe(res);
  //     // si no, devolvemos un string diciendo que no hemos encontrado nada
  //    else return res.end('Not found')
  //     // Leer el formulario de registro
});
// hacemos que el servidor escuche el puerto configurado
server.listen(PORT, () =>
  console.log(`Servidor ejecutandose en el puerto ${PORT}`)
);
