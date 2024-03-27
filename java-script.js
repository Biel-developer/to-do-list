let Inputnametarefas = document.querySelector('#Inputnametarefas');
let Btnaddtarefa = document.querySelector('#Btnaddtarefa');
let Listatarefas = document.querySelector('#Listatarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let janelaEdicaofundo = document.querySelector('#janelaEdicaofundo');
let btnAtualaizarTarefa = document.querySelector('#btnAtualaizarTarefa');
let tarefaedicaoId = document.querySelector('#tarefaedicaoId');
let InputTarefaEdicao = document.querySelector('#InputTarefaEdicao');
let ExcluirButton = document.getElementById('ExcluirButton');
let NaoExcluirButton = document.getElementById('NaoExcluirButton');
let janelaexclusao = document.getElementById('janelaexclusao');


Inputnametarefas.addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        let tarefa = {
            nome: Inputnametarefas.value,
            id: gerarid(),
        }
        adicionarTarefa(tarefa);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});


Btnaddtarefa.addEventListener('click', (e) => {
    let tarefa = {
        nome: Inputnametarefas.value,
        id: gerarid(),
    }
    adicionarTarefa(tarefa);
});

btnAtualaizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    let IDtarefa = tarefaedicaoId.innerHTML.replace('#', '');

    let tarefa = {
        nome: InputTarefaEdicao.value,
        id: IDtarefa
    }

    let tarefaAtual = document.getElementById(''+IDtarefa+'');

    if(tarefaAtual){
        let li = criartagLI(tarefa);
        Listatarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    }else{
        alert('Elemento HTML não encontrado')
    }

});




function gerarid(){
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa){
    let li = criartagLI(tarefa);
    Listatarefas.appendChild(li);
    Inputnametarefas.value = '';
}

function criartagLI(tarefa){

    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('BtnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnexcluir = document.createElement('button');
    btnexcluir.classList.add('BtnAcao');
    btnexcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnexcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnexcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(tarefaID){
    let li = document.getElementById(''+ tarefaID + '');
    if(li){
        tarefaedicaoId.innerHTML = '#' + tarefaID;
        InputTarefaEdicao.value = li.innerText;
        alternarJanelaEdicao();
    }else{
        alert('Elemento não encontrado');
    }
}

window.addEventListener('load', () => {
    carregarTarefas();
});

// Função para carregar as tarefas salvas no localStorage
function carregarTarefas() {
    let tarefasSalvas = localStorage.getItem('tarefas');
    let tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];

    tarefas.forEach(tarefa => adicionarTarefa(tarefa));
}

function adicionarTarefa(tarefa) {
    let li = criartagLI(tarefa);

    // Verifica se a tarefa já existe na lista
    if (document.getElementById(tarefa.id)) {
        return; // Tarefa já existe, ignora
    }

    Listatarefas.appendChild(li);
}

// Função para salvar uma tarefa no localStorage
function salvarTarefaNoLocalStorage(tarefa) {
    let tarefasSalvas = localStorage.getItem('tarefas');
    let tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];

    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para remover uma tarefa da lista e do localStorage
function excluir(tarefaID) {
    let li = document.getElementById(tarefaID);
    if (li) {
        Listatarefas.removeChild(li);
        removerTarefaDoLocalStorage(tarefaID);
    }
}

// Função para remover uma tarefa do localStorage
function removerTarefaDoLocalStorage(tarefaID) {
    let tarefasSalvas = localStorage.getItem('tarefas');
    let tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];

    let novaLista = tarefas.filter(tarefa => tarefa.id !== tarefaID);
    localStorage.setItem('tarefas', JSON.stringify(novaLista));
}

function gerarNovoID() {
    let id = Math.floor(Math.random() * 1000000) + 1;
    return id;
}



function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaofundo.classList.toggle('abrir');
}

