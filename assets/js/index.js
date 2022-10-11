const loginAtivo = document.getElementById('loginAtivo');
const loginInativo = document.getElementById('loginInativo');
const newUserAtiva = document.getElementById('newUserAtiva');
const newUserInativa = document.getElementById('newUserInativa');

let eyesArray = [
  {
    value: true,
  },
  {
    value: true,
  },
  {
    value: true,
  },
];

function newUserScreen() {
  loginAtivo.classList.add('d-none');
  loginInativo.classList.remove('d-none');
  newUserAtiva.classList.remove('d-none');
  newUserInativa.classList.add('d-none');
}

function loginScreen() {
  loginAtivo.classList.remove('d-none');
  loginInativo.classList.add('d-none');
  newUserAtiva.classList.add('d-none');
  newUserInativa.classList.remove('d-none');
}

function passwordIptChange(id) {
  let eyeId = `eye-${id}`;
  let eye = document.getElementById(eyeId);

  iptId = `passwordIpt-${id}`;
  let input = document.getElementById(iptId);

  let eyeIndex = id - 1;

  if (eyesArray[eyeIndex].value == true) {
    input.type = 'text';
    eye.src = '/assets/images/eye-slash.svg';
    eyesArray[eyeIndex].value = false;
  } else {
    input.type = 'password';
    eye.src = '/assets/images/eye.svg';
    eyesArray[eyeIndex].value = true;
  }
}
