// -----------------------------------------------------------------------------------------
// Identificar modal
let modalAdd = new bootstrap.Modal(document.getElementById('modalAddTask'));
let modalRemove = new bootstrap.Modal(document.getElementById('modalRemove'));
let changeDataModal = new bootstrap.Modal(document.getElementById('changeDataModal'));

// -----------------------------------------------------------------------------------------
// flag editar
let editOn = false;

// -----------------------------------------------------------------------------------------
// Alerts personalizados

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const alert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [`<div class="alert alert-${type} alert-dismissible" role="alert">`, `   <div>${message}</div>`, '</div>'].join('');

  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    closealert();
  }, 2000);
};

function closealert() {
  alertPlaceholder.classList.add('fade');

  setTimeout(() => {
    alertPlaceholder.innerHTML = '';
  }, 500);

  setTimeout(() => {
    alertPlaceholder.classList.remove('fade');
  }, 1100);
}

// -----------------------------------------------------------------------------------------
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
    eye.src = './assets/images/eye.svg';
    eyesArray[eyeIndex].value = false;
  } else {
    input.type = 'password';
    eye.src = './assets/images/eye-slash.svg';
    eyesArray[eyeIndex].value = true;
  }
}

// -----------------------------------------------------------------------------------------
// Index Animations Xs

const xsLogin = document.getElementById('loginAtivoXs');
const newUserXs = document.getElementById('newUserXs');
let xsFlag = true;

function changeScreenXs() {
  if (xsFlag) {
    newUserXs.classList.remove('d-none');
    xsLogin.classList.remove('d-flex');
    xsLogin.classList.add('d-none');
    xsLogin.classList.remove('slide-top');
    newUserXs.classList.add('slide-top');
    xsFlag = false;
  } else {
    xsLogin.classList.remove('d-none');
    xsLogin.classList.add('d-flex');
    newUserXs.classList.add('d-none');
    newUserXs.classList.remove('slide-top');
    xsLogin.classList.add('slide-top');
    xsFlag = true;
  }
}

// -----------------------------------------------------------------------------------------
// Listar inputs
let inputs = document.querySelectorAll('input');

// -----------------------------------------------------------------------------------------
// Verificar users no localStorage
let usersStorage = localStorage.getItem('usersStorage');
if (usersStorage == null) {
  localStorage.setItem('usersStorage', '[]');
}
usersStorage = JSON.parse(localStorage.getItem('usersStorage'));

// -----------------------------------------------------------------------------------------
// Pegar botão de cadastrar usuário
const btnCreate = document.getElementById('newUserBtn');
btnCreate.addEventListener('click', (e) => {
  e.preventDefault();
  let validOK = validar();

  if (validOK) {
    createUser();
  }
});

const btnCreateXs = document.getElementById('newUserBtnXs');
btnCreateXs.addEventListener('click', (e) => {
  e.preventDefault();
  let validOK = validarXs();

  if (validOK) {
    createUserXs();
  }
});

// -----------------------------------------------------------------------------------------
// Cadastrar usuário
let newName = inputs[3];
let newEmail = inputs[4];
let newPassword = inputs[5];
let passwordConfirm = inputs[6];

let newNameXs = inputs[10];
let newEmailXs = inputs[11];
let newPasswordXs = inputs[12];
let passwordConfirmXs = inputs[13];

// -----------------------------------------------------------------------------------------
// Validar senha
function validar() {
  if (newPassword.value.length < 5) {
    alert('Digite uma senha com no mínimo 5 caracteres', 'warning');
    newPassword.classList.add('is-invalid');
    newPassword.focus();
    return false;
  }

  if (newPassword.value !== passwordConfirm.value) {
    alert('As senhas digitadas não conferem', 'danger');
    newPassword.classList.add('is-invalid');
    passwordConfirm.classList.add('is-invalid');
    return false;
  }
  newPassword.classList.remove('is-invalid');
  passwordConfirm.classList.remove('is-invalid');
  return true;
}

function validarXs() {
  if (newPasswordXs.value.length < 5) {
    alert('Digite uma senha com no mínimo 5 caracteres', 'warning');
    newPasswordXs.classList.add('is-invalid');
    newPasswordXs.focus();
    return false;
  }

  if (newPasswordXs.value !== passwordConfirmXs.value) {
    alert('As senhas digitadas não conferem', 'danger');
    newPasswordXs.classList.add('is-invalid');
    passwordConfirmXs.classList.add('is-invalid');
    return false;
  }
  newPasswordXs.classList.remove('is-invalid');
  passwordConfirmXs.classList.remove('is-invalid');
  return true;
}

// -----------------------------------------------------------------------------------------
// validar email e caso não exista criar novo usuário
function createUser() {
  const users = JSON.parse(localStorage.getItem('usersStorage'));

  let existe = users.some((value) => value.email === newEmail.value);
  if (existe) {
    alert('E-mail já cadastrado!', 'danger');
    newEmail.classList.add('is-invalid');
    newEmail.focus();
    return;
  } else if (newName.value == '') {
    alert('Informe seu nome', 'danger');
    newName.classList.add('is-invalid');
    newName.focus();
    return;
  } else if (newEmail.value == '') {
    alert('Informe seu e-mail', 'danger');
    newEmail.classList.add('is-invalid');
    newEmail.focus();
  }

  const newUser = {
    name: newName.value,
    email: newEmail.value,
    password: newPassword.value,
    recados: [],
  };

  users.push(newUser);
  saveUser(users);

  newEmail.classList.remove('is-invalid');
  newName.classList.remove('is-invalid');
  newPassword.classList.remove('is-invalid');
  passwordConfirm.classList.remove('is-invalid');

  alert('Conta criada com sucesso!', 'success');
  setTimeout((location.href = './index.html'), 3000);
}

function createUserXs() {
  const users = JSON.parse(localStorage.getItem('usersStorage'));

  let existe = users.some((value) => value.email === newEmailXs.value);
  if (existe) {
    alert('E-mail já cadastrado!', 'danger');
    newEmailXs.classList.add('is-invalid');
    newEmailXs.focus();
    return;
  } else if (newNameXs.value == '') {
    alert('Informe seu nome', 'danger');
    newNameXs.classList.add('is-invalid');
    newNameXs.focus();
    return;
  } else if (newEmailXs.value == '') {
    alert('Informe seu e-mail', 'danger');
    newEmailXs.classList.add('is-invalid');
    newEmailXs.focus();
  }

  const newUser = {
    name: newNameXs.value,
    email: newEmailXs.value,
    password: newPasswordXs.value,
    recados: [],
  };

  users.push(newUser);
  saveUser(users);

  newEmailXs.classList.remove('is-invalid');
  newNameXs.classList.remove('is-invalid');
  newPasswordXs.classList.remove('is-invalid');
  passwordConfirmXs.classList.remove('is-invalid');

  alert('Conta criada com sucesso!', 'success');
  setTimeout((location.href = './index.html'), 3000);
}

// -----------------------------------------------------------------------------------------
// Salvar novo usuário no localStorage
function saveUser(newUser) {
  localStorage.setItem('usersStorage', JSON.stringify(newUser));
}

// -----------------------------------------------------------------------------------------
// Logar no sistema

const btnLogin = document.getElementById('loginBtn');
const btnLoginXs = document.getElementById('loginBtnXs');
let iptEmail = inputs[0];
let iptPassword = inputs[1];
let iptEmailXs = inputs[7];
let iptPasswordXs = inputs[8];
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

// -----------------------------------------------------------------------------------------
// verifica se o usuário já realizou login anterior e marcou a checkbox para permanecer conectado
checklogged();

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});

btnLoginXs.addEventListener('click', (e) => {
  e.preventDefault();
  loginXs();
});

// -----------------------------------------------------------------------------------------
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
    iptEmail.classList.remove('is-invalid');
    iptPassword.classList.remove('is-invalid');
    location.reload();
    setTimeout(alert('Logado com sucesso', 'success'), 300);
  } else {
    alert('E-mail ou senha incorretos', 'danger');
    iptEmail.classList.add('is-invalid');
    iptPassword.classList.add('is-invalid');
  }
}

function loginXs() {
  const users = JSON.parse(localStorage.getItem('usersStorage'));

  const userFound = users.find((value) => value.email === iptEmailXs.value && value.password === iptPasswordXs.value);
  const email = iptEmailXs.value;
  const checksession = inputs[9].checked;

  if (userFound) {
    localStorage.setItem('loggedUser', JSON.stringify(userFound));
    saveSession(email, checksession);
    showHome();
    iptEmailXs.classList.remove('is-invalid');
    iptPasswordXs.classList.remove('is-invalid');
    location.reload();
    setTimeout(alert('Logado com sucesso', 'success'), 300);
  } else {
    alert('E-mail ou senha incorretos', 'danger');
    iptEmailXs.classList.add('is-invalid');
    iptPasswordXs.classList.add('is-invalid');
  }
}

// -----------------------------------------------------------------------------------------
// salva os dados da sessão
function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem('session', data);
  }
  sessionStorage.setItem('logged', data);
}

// -----------------------------------------------------------------------------------------
// verifica se o usuário já realizou login anterior e marcou a checkbox para permanecer conectado
function checklogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);

    showHome();
    setTimeout(alert('Logado com sucesso', 'success'), 300);
  }
}

// -----------------------------------------------------------------------------------------
// mostrar janela de recados

function showHome() {
  let welcomeMsg = document.getElementById('welcomeMsg');
  let homeScreen = document.getElementById('home');
  let btnAdd = document.getElementById('btnAdd');
  let btnTop = document.getElementById('btnTop');
  let indexScreen = document.getElementById('index');
  let Taskstable = document.getElementById('Taskstable');
  let body = document.getElementById('body');

  body.classList.remove('gradient');
  body.classList.remove('body-bg-1');
  body.classList.add('body-bg-2');

  indexScreen.classList.add('d-none');
  welcomeMsg.innerHTML = setWelcomeMsg();
  homeScreen.classList.remove('d-none');
  btnAdd.classList.remove('d-none');
  btnTop.classList.remove('d-none');
  Taskstable.classList.remove('d-none');
}

function setWelcomeMsg() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  return `Olá, ${loggedUser.name}`;
}

// -----------------------------------------------------------------------------------------
// Logout

function logout() {
  if (editOn == true) {
    alert('Finalize a edição antes de continuar!', 'danger');
    return;
  } else {
    alert('Deslogado com sucesso! Até logo!', 'warning');
    setTimeout((location.href = './index.html'), 3000);
    setTimeout(sessionStorage.removeItem('logged'), 3000);
    setTimeout(localStorage.removeItem('session'), 3000);
    setTimeout(localStorage.removeItem('loggedUser'), 3000);
  }
}

// -----------------------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------------------
// abrir modal adicionar recado
function openModal() {
  if (editOn == true) {
    alert('Finalize a edição atual antes de continuar!', 'warning');
  } else {
    modalAdd.show();
  }
}

// -----------------------------------------------------------------------------------------
// adicionar recado

let newTaskDetailIpt = document.getElementById('detailIpt');
let newTaskDescriptionIpt = document.getElementById('descriptionIpt');

function addNewTask() {
  if (newTaskDetailIpt.value == '') {
    alert('Detalhe não pode estar vazio!', 'danger');
    newTaskDetailIpt.classList.add('is-invalid');
    newTaskDetailIpt.focus();

    return;
  } else if (newTaskDescriptionIpt.value == '') {
    alert('Descrição não pode estar vazia!', 'danger');
    newTaskDescriptionIpt.classList.add('is-invalid');
    newTaskDescriptionIpt.focus();

    return;
  } else {
    let task = {
      id: recados.length + 1,
      detail: newTaskDetailIpt.value,
      description: newTaskDescriptionIpt.value,
    };

    recados.push(task);
    modalAdd.hide();
    saveToStorage();
    newTaskDetailIpt.value = '';
    newTaskDetailIpt.classList.remove('is-invalid');
    newTaskDescriptionIpt.value = '';
    newTaskDescriptionIpt.classList.remove('is-invalid');

    createTable(recados);
    alert('Recado adicionado com sucesso!', 'success');
  }
}

function resetInputs() {
  newTaskDetailIpt.value = '';
  newTaskDetailIpt.classList.remove('is-invalid');
  newTaskDescriptionIpt.value = '';
  newTaskDescriptionIpt.classList.remove('is-invalid');
}

// -----------------------------------------------------------------------------------------
// salvar os novos dados no localStorage

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
    <button type="button" class="btn btn-danger" onclick="openModalRemove(${recado.id})">
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
// -----------------------------------------------------------------------------------------
let toRemoveId = 0;
// Abrir modal de remover
function openModalRemove(id) {
  if (editOn == true) {
    alert('Finalize a edição atual antes de continuar!', 'warning');
    return;
  }
  toRemoveId = id;
  modalRemove.show();
}

// -----------------------------------------------------------------------------------------
// função remover

function remove() {
  let newRecadosArray = [];

  let id = toRemoveId;

  recados.forEach((recado) => {
    if (recado.id !== id) {
      recado.id = newRecadosArray.length + 1;
      newRecadosArray.push(recado);
    }
  });

  recados = newRecadosArray;
  toRemoveId = 0;
  createTable(recados);
  saveToStorage();
  modalRemove.hide();
  alert('Recado removido com sucesso', 'info');
}

// -----------------------------------------------------------------------------------------
// função editar

function edit(id) {
  if (editOn == true) {
    alert('Finalize a edição atual antes de continuar', 'warning');
    return;
  } else {
    editOn = true;

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
  <button type="button" class="btn btn-primary" onclick="saveEdit(${id})">Salvar</button>
  </td>`;
  }
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
  editOn = false;
  alert('Recado editado com sucesso!', 'success');
}

// -----------------------------------------------------------------------------------------
// alterar dados

let modalContent = document.getElementById('modalChangeBody');
let modalTitle = document.getElementById('changeDataModalLabel');

function setName() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  let btnSaveChanges = document.getElementById('btnSaveChanges');

  modalTitle.innerHTML = 'Alterar nome de usuário';

  modalContent.innerHTML = `
  <div class="form-floating mb-3">
  <input type="text" class="form-control" id="changeName" value="${loggedUser.name}" placeholder="João">
  <label for="floatingInput">Novo nome</label>
  </div>`;

  btnSaveChanges.setAttribute('onclick', 'saveNewName()');
  btnSaveChanges.innerText = 'Salvar';
  btnSaveChanges.classList.add('btn-primary');
  btnSaveChanges.classList.remove('btn-danger');

  if (editOn == true) {
    alert('Finalize a edição atual antes de continuar', 'warning');
  } else {
    changeDataModal.show();
  }
}

function saveNewName() {
  let changeNameIpt = document.getElementById('changeName');
  let welcomeMsg = document.getElementById('welcomeMsg');

  let nameToChange = usersStorage[userIndex].name;
  let newName = changeNameIpt.value;

  usersStorage[userIndex].name = newName;

  localStorage.setItem('usersStorage', JSON.stringify(usersStorage));
  let loggedUser = usersStorage[userIndex];
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  welcomeMsg.innerHTML = setWelcomeMsg();

  changeDataModal.hide();
  alert('Nome de usuário alterado com sucesso', 'info');
}

function setPassword() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  let btnSaveChanges = document.getElementById('btnSaveChanges');

  modalTitle.innerHTML = 'Alterar senha de usuário';

  modalContent.innerHTML = `
  <div class="input-group mb-3">
  <div class="form-floating">
    <input type="password" class="form-control" id="passwordIpt-4" placeholder="Senha" required />
    <label for="floatingInputGroup4">Nova senha</label>
  </div>
  <span class="input-group-text" onclick="passwordIptChange(4)"><img id="eye-4" src="./assets/images/eye-slash.svg" alt="" /></span>
</div>

<div class="input-group mb-3">
<div class="form-floating">
  <input type="password" class="form-control" id="passwordIpt-5" placeholder="Senha" required />
  <label for="floatingInputGroup5">Confirme a nova senha</label>
</div>
<span class="input-group-text" onclick="passwordIptChange(5)"><img id="eye-5" src="./assets/images/eye-slash.svg" alt="" /></span>
</div>`;

  btnSaveChanges.setAttribute('onclick', 'saveNewPassword()');
  btnSaveChanges.innerText = 'Salvar';
  btnSaveChanges.classList.add('btn-primary');
  btnSaveChanges.classList.remove('btn-danger');

  if (editOn == true) {
    alert('Finalize a edição atual antes de continuar', 'warning');
  } else {
    changeDataModal.show();
  }
}

function saveNewPassword() {
  let changePasswordIpt = document.getElementById('passwordIpt-4');
  let changePasswordIpt2 = document.getElementById('passwordIpt-5');

  let passwordToChange = usersStorage[userIndex].password;
  let newPassword = changePasswordIpt.value;

  let validOK = validNewPassword();

  if (validOK) {
    usersStorage[userIndex].password = newPassword;

    localStorage.setItem('usersStorage', JSON.stringify(usersStorage));
    let loggedUser = usersStorage[userIndex];
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    changePasswordIpt.classList.remove('is-invalid');
    changePasswordIpt2.classList.remove('is-invalid');
    changeDataModal.hide();
    alert('Senha alterada com sucesso!', 'info');
  }
}

function validNewPassword() {
  let changePasswordIpt = document.getElementById('passwordIpt-4');
  let changePasswordIpt2 = document.getElementById('passwordIpt-5');

  if (changePasswordIpt.value.length < 5) {
    alert('Digite uma senha com no mínimo 5 caracteres', 'warning');
    changePasswordIpt.classList.add('is-invalid');
    changePasswordIpt.focus();
    return false;
  }

  if (changePasswordIpt2.value !== changePasswordIpt.value) {
    alert('As senhas digitadas não conferem', 'danger');
    changePasswordIpt2.classList.add('is-invalid');
    changePasswordIpt2.focus();
    return false;
  }
  changePasswordIpt.classList.remove('is-invalid');
  changePasswordIpt2.classList.remove('is-invalid');
  return true;
}

function confirmDeleteUser() {
  modalTitle.innerHTML = 'Confirmar exclusão de usuário';
  let btnSaveChanges = document.getElementById('btnSaveChanges');

  modalContent.innerHTML = `Tem certeza da exclusão da sua conta de recados?`;

  btnSaveChanges.innerText = 'Remover';
  btnSaveChanges.classList.remove('btn-primary');
  btnSaveChanges.classList.add('btn-danger');
  btnSaveChanges.setAttribute('onclick', 'deleteUser()');

  if (editOn == true) {
    alert('Finalize a edição atual antes de continuar', 'warning');
  } else {
    changeDataModal.show();
  }
}

function deleteUser() {
  let usersStorage = JSON.parse(localStorage.getItem('usersStorage'));
  let id = userIndex;

  changeDataModal.hide();

  usersStorage.splice(userIndex, 1);
  localStorage.setItem('usersStorage', JSON.stringify(usersStorage));

  alert('Usuário deletado com sucesso', 'info');

  setTimeout(sessionStorage.removeItem('logged'), 3000);
  setTimeout(localStorage.removeItem('session'), 3000);
  setTimeout(localStorage.removeItem('loggedUser'), 3000);
  setTimeout((location.href = './index.html'), 3500);
}

function setEmail() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  let btnSaveChanges = document.getElementById('btnSaveChanges');

  modalTitle.innerHTML = 'Alterar email de usuário';

  modalContent.innerHTML = `
  <div class="form-floating mb-3">
  <input type="email" class="form-control" id="emailChangeIpt1" placeholder="name@example.com" required />
  <label for="floatingInput">Novo email</label>
</div>

<div class="form-floating mb-3">
<input type="email" class="form-control" id="emailChangeIpt2" placeholder="name@example.com" required />
<label for="floatingInput">Confirme o novo email</label>
</div>`;

  btnSaveChanges.setAttribute('onclick', 'saveNewEmail()');
  btnSaveChanges.innerText = 'Salvar';
  btnSaveChanges.classList.add('btn-primary');
  btnSaveChanges.classList.remove('btn-danger');

  if (editOn == true) {
    alert('Finalize a edição atual antes de continuar', 'warning');
  } else {
    changeDataModal.show();
  }
}

function saveNewEmail() {
  let changeEmailIpt = document.getElementById('emailChangeIpt1');
  let changeEmailIpt2 = document.getElementById('emailChangeIpt1');

  let emailToChange = usersStorage[userIndex].email;
  let newEmail = changeEmailIpt.value;

  let validOK = validNewEmail();

  if (validOK) {
    usersStorage[userIndex].email = newEmail;

    localStorage.setItem('usersStorage', JSON.stringify(usersStorage));
    let loggedUser = usersStorage[userIndex];
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    changeEmailIpt.classList.remove('is-invalid');
    changeEmailIpt2.classList.remove('is-invalid');
    changeDataModal.hide();
    alert('Email alterado com sucesso!', 'info');
  }
}

function validNewEmail() {
  let changeEmailIpt = document.getElementById('emailChangeIpt1');
  let changeEmailIpt2 = document.getElementById('emailChangeIpt1');

  if (changeEmailIpt.value.length < 5) {
    alert('Digite um email válido', 'warning');
    changeEmailIpt.classList.add('is-invalid');
    changeEmailIpt.focus();
    return false;
  }

  if (changeEmailIpt2.value !== changeEmailIpt.value) {
    alert('As senhas digitadas não conferem', 'danger');
    changeEmailIpt2.classList.add('is-invalid');
    changeEmailIpt2.focus();
    return false;
  }
  changeEmailIpt.classList.remove('is-invalid');
  changeEmailIpt2.classList.remove('is-invalid');
  return true;
}
