const { REACT_APP_API_URL } = process.env

export function signIn(uName, password) {


  console.log(REACT_APP_API_URL);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "username": uName,
    "password": password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${REACT_APP_API_URL}usr/login`, requestOptions)
    .then(response => response.json())
    .then(result => {
      localStorage.setItem('uToken', result);
      return result;
    })
    .catch(error => console.log('error', error));
}

export function signUp({ username, pswd, email, biography, picture }) {

  const data = {
    "username": username,
    "password": pswd,
    "email": email,
    "biography": biography
  }


  var formdata = new FormData();
  formdata.append("username", data.username);
  formdata.append("password", data.password);
  formdata.append("email", data.email);
  formdata.append("biography", data.biography);

  formdata.append("photo", picture);


  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(`${REACT_APP_API_URL}usr/register`, requestOptions)
    .then(response => response.json())
    .then(result => {
      localStorage.setItem('uToken', result);
    })
    .catch(error => console.log('error', error));
}