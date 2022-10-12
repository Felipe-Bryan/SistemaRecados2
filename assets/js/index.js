// Identificar modal
let modalAdd = new bootstrap.Modal(document.getElementById('modalAddTask'));

// Index Animations

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
usersStorage = JSON.parse(localStorage.getItem('usersStorage'));

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

// verifica se o usuário já realizou login anterior e marcou a checkbox para permanecer conectado
checklogged();

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});

// valida os dados do usuário
function login() {
  const users = JSON.parse(localStorage.getItem('usersStorage'));

  const userFound = users.find((value) => value.email === iptEmail.value && value.password === iptPassword.value);
  const email = iptEmail.value;
  const checksession = inputs[2].checked;

  if (userFound) {
    localStorage.setItem('loggedUser', JSON.stringify(userFound));
    saveSession(email, checksession);
    showHome();
    location.reload();
  } else {
    alert('E-mail ou senha incorretos');
  }
}

// salva os dados da sessão
function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem('session', data);
  }
  sessionStorage.setItem('logged', data);
}

// verifica se o usuário já realizou login anterior e marcou a checkbox para permanecer conectado
function checklogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);

    showHome();
  }
}

// mostrar janela de recados

function showHome() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  let homeScreen = document.getElementById('home');
  let btnAdd = document.getElementById('btnAdd');
  let btnLogout = document.getElementById('btnLogout');
  let indexScreen = document.getElementById('index');
  let Taskstable = document.getElementById('Taskstable');

  let welcomeMsg = document.getElementById('welcomeMsg');

  indexScreen.classList.add('d-none');
  homeScreen.classList.remove('d-none');
  btnAdd.classList.remove('d-none');
  btnLogout.classList.remove('d-none');
  welcomeMsg.innerHTML = `Olá, ${loggedUser.name}`;
  Taskstable.classList.remove('d-none');
}

// Logout

function logout() {
  sessionStorage.removeItem('logged');
  localStorage.removeItem('session');
  localStorage.removeItem('loggedUser');

  location.href = './index.html';
}

// Definir array de Recados
function findUserIndex() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const userEmail = loggedUser.email;

  for (let i = 0; i < usersStorage.length; i++) {
    if (usersStorage[i].email === userEmail) {
      return i;
    }
  }
}

userIndex = findUserIndex();
let recados = usersStorage[userIndex].recados;
createTable(recados);

let newTaskDetailIpt = document.getElementById('detailIpt');
let newTaskDescriptionIpt = document.getElementById('descriptionIpt');

function addNewTask() {
  let task = {
    id: recados.length + 1,
    detail: newTaskDetailIpt.value,
    description: newTaskDescriptionIpt.value,
  };

  recados.push(task);
  modalAdd.hide();
  saveToStorage();
  newTaskDetailIpt.value = '';
  newTaskDescriptionIpt.value = '';

  createTable(recados);
}

function saveToStorage() {
  usersStorage[userIndex].recados = recados;
  localStorage.setItem('usersStorage', JSON.stringify(usersStorage));
}

function createTable(recadosArray) {
  const table = document.getElementById('table');

  table.innerHTML = '';

  recadosArray.forEach((recado) => {
    table.innerHTML += `
  <tr id="line-${recado.id}" class="flip-horizontal-bottom">
  <td>${recado.detail}</td>
  <td>${recado.description}</td>
  <td class="actionsTD">
    <button type="button" class="btn btn-success" onclick="edit(${recado.id})">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path
          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
        />
        <path
          fill-rule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
        />
      </svg>
    </button>
    <button type="button" class="btn btn-danger" onclick="remove(${recado.id})">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path
          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
        />
      </svg>
    </button>
  </td>
</tr>`;
  });
}

// função remover

function remove(id) {
  let newRecadosArray = [];

  recados.forEach((recado) => {
    if (recado.id !== id) {
      recado.id = newRecadosArray.length + 1;
      newRecadosArray.push(recado);
    }
  });

  recados = newRecadosArray;
  createTable(recados);
  saveToStorage();
}

function edit(id) {
  let TaskToEdit = usersStorage[userIndex].recados[id - 1];

  let lineToEdit = document.getElementById(`line-${id}`);

  let editDetailValue = TaskToEdit.detail;
  let editDescriptionValue = TaskToEdit.description;

  lineToEdit.innerHTML = `
  <td>
  <div class="input-group editIpt">
    <input type="text" id="editDetail" class="form-control" value="${editDetailValue}" placeholder="Detalhamento" aria-label="Username" aria-describedby="basic-addon1" />
  </div>
</td>
<td>
  <div class="input-group editIpt">
    <input type="text" id="editDescription" class="form-control" value="${editDescriptionValue}" placeholder="Descrição" aria-label="Username" aria-describedby="basic-addon1" />
  </div>
</td>
<td>
  <button type="button" class="btn btn-primary" onclick="saveEdit(${id})">Save</button>
</td>`;
}

function saveEdit(id) {
  let editLineId = `line-${id}`;
  let editLine = document.getElementById(editLineId);

  const editDescriptionIpt = document.getElementById('editDescription');
  const editDetailIpt = document.getElementById('editDetail');

  let editedTask = {
    id: id,
    detail: editDetailIpt.value,
    description: editDescriptionIpt.value,
  };

  recados.forEach((recado) => {
    if (recado.id == id) {
      recado = editedTask;
      recados[id - 1] = recado;
    }
  });

  createTable(recados);
  saveToStorage();
}
