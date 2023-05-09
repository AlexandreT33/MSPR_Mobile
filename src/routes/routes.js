//requetes api
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("SECRET_KEY", "TVNQUl9DYWZlOmVwc2kyMDIz");

export async function sendConnexion(email, password, setUserUUID) {
  var connexion = JSON.stringify({
    "email": {email},
    "password": {password}
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: connexion,
    redirect: 'follow'
  };

  const res = await fetch("https://192.168.1.13:5000/get_user_uuid", requestOptions)
  .then(response => response.text())
  .then(result => {return JSON.parse(result)})
  .catch(error => console.log('error', error));

  //TODO
  //setUserUUID();
}

export function verifyEmail(verifyURL) {
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch(verifyURL, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));    
}

export async function checkIfExist(email){
  var checkmail = JSON.stringify({
    "email": {email},
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: checkmail,
    redirect: 'follow'
  };

  const res = await fetch("https://7695-2a01-cb19-d81-c600-dd62-6606-ee27-e4bb.ngrok-free.app/check_mail_exist", requestOptions)
    .then(response => response.text())
    .then(result => {return JSON.parse(result)})
    .catch(error => console.log('error', error));


  //TODO : Correction bug API qui return le mauvais resultat
  console.log("RESULTAT Ici : ", res)
  if (res.message === "false") {
    console.log("test")
  }
  return false;
}

export function sendInscription(username, email, password){
  var inscription = JSON.stringify({
    "username": {username},
    "email": {email},
    "password": {password}
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: inscription,
    redirect: "follow"
  };

  fetch("https://7695-2a01-cb19-d81-c600-dd62-6606-ee27-e4bb.ngrok-free.app/create_user", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}