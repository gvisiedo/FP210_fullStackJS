document.getElementById("register").addEventListener("click", (e) => {
  console.log("boton apretado");
  //e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let user = {
    username: username,
    password: password,
  };

  //sendInformation(user);
  console.log(user);
  alert("Datos de usuario guardados");
});

async function sendInformation(user){
  const response = await fetch("http://localhost:8888/register",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => response.json())
    .then((data) => {
      console.info(data);
    
    })

}

