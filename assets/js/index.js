// Animations

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

// Listar inputs
let inputs = document.querySelectorAll('input');

// Verificar users no localStorage
let usersStorage = localStorage.getItem('usersStorage');
if (usersStorage == null) {
  localStorage.setItem('usersStorage', '[]');
}
usersStorage = localStorage.getItem('usersStorage');

// Pegar botão de cadastrar
const btnCreate = document.getElementById('newUserBtn');
btnCreate.addEventListener('click', (e) => {
  e.preventDefault();
  let validOK = validar();

  if (validOK) {
    createUser();
  }
});

// Cadastrar usuário
let newName = inputs[3];
let newEmail = inputs[4];
let newPassword = inputs[5];
let passwordConfirm = inputs[6];

// Validar senha
function validar() {
  if (newPassword.value.length < 5) {
    alert('Digite uma senha com no mínimo 5 caracteres');
    return false;
  }

  if (newPassword.value !== passwordConfirm.value) {
    alert('As senhas digitadas não conferem');
    return false;
  }
  return true;
}

// validar email e caso não exista criar novo usuário
function createUser() {
  const users = JSON.parse(localStorage.getItem('usersStorage'));

  let existe = users.some((value) => value.email === newEmail.value);
  if (existe) {
    alert('E-mail já cadastrado!');
    return;
  }

  const newUser = {
    name: newName.value,
    email: newEmail.value,
    password: newPassword.value,
    recados: [],
  };

  users.push(newUser);
  saveUser(users);
  alert('Conta criada com sucesso!');
  location.href = './index.html';
}

function saveUser(newUser) {
  localStorage.setItem('usersStorage', JSON.stringify(newUser));
}

// Logar no sistema

const btnLogin = document.getElementById('loginBtn');
let iptEmail = inputs[0];
let iptPassword = inputs[1];
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

checklogged();

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});

function login() {
  const users = JSON.parse(localStorage.getItem('usersStorage'));

  const userFound = users.find((value) => value.email === iptEmail.value && value.password === iptPassword.value);
  const email = iptEmail.value;
  const checksession = inputs[2].checked;

  if (userFound) {
    localStorage.setItem('loggedUser', JSON.stringify(userFound));
    saveSession(email, checksession);
    location.href = './home.html';
  } else {
    alert('E-mail ou senha incorretos');
  }
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem('session', data);
  }
  sessionStorage.setItem('logged', data);
}

function checklogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);

    window.location.href = '/home.html';
  }
}
