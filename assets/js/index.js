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
  newUserInativa.classList.add('d-none');
  newUserAtiva.classList.add('scale-up-ver-center');
  newUserAtiva.classList.remove('d-none');

  loginAtivo.classList.add('scale-down-ver-center');

  setTimeout(() => {
    loginAtivo.classList.add('d-none');
    loginInativo.classList.remove('d-none');
    newUserAtiva.classList.remove('scale-up-ver-center');
    loginAtivo.classList.remove('scale-down-ver-center');
  }, 400);
}

function loginScreen() {
  loginInativo.classList.add('d-none');
  loginAtivo.classList.add('scale-up-ver-center');
  loginAtivo.classList.remove('d-none');

  newUserAtiva.classList.add('scale-down-ver-center');

  setTimeout(() => {
    newUserAtiva.classList.add('d-none');
    newUserInativa.classList.remove('d-none');
    loginAtivo.classList.remove('scale-up-ver-center');
    newUserAtiva.classList.remove('scale-down-ver-center');
  }, 400);
}

function passwordIptChange(id) {
  let eyeId = `eye-${id}`;
  let eye = document.getElementById(eyeId);

  iptId = `passwordIpt-${id}`;
  let input = document.getElementById(iptId);

  let eyeIndex = id - 1;

  if (eyesArray[eyeIndex].value == true) {
    input.type = 'text';
    eye.src = './assets/images/eye-slash.svg';
    eyesArray[eyeIndex].value = false;
  } else {
    input.type = 'password';
    eye.src = './assets/images/eye.svg';
    eyesArray[eyeIndex].value = true;
  }
}
