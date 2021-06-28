import {
    fillForm,
    getObjectFromForm,
    formatDataHora,
    toggleLoading,
} from "./utils.js";
import { loadComponents } from "./components.js";
import { showMessage } from "./popup-message.js";

const url = "https://projeto-final-ppw.herokuapp.com/api/117430";

const table = document.getElementById("cliente-table");
const tableList = document.getElementById("list");
const noData = document.getElementById("no-content");
const search = document.getElementById("search");

let clientes = [];

function Cliente(id, nome, email, telefone, endereco) {
    this._id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.endereco = endereco;
}

function loadData() {
    showTable(false);
    toggleLoading();
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            clientes = data;
            renderList(clientes);
            toggleLoading();
            clearFilter();
        });
}

function showTable(option) {
    option ? table.classList.remove("hide") : table.classList.add("hide");
}

function adicionar() {
    toggleModal();
    fillForm("clienteForm", new Cliente(null, "", "", "", ""));
}

function saveCliente() {
    const cliente = getObjectFromForm("clienteForm");

    if (!cliente._id) {
        novoCliente(cliente);
    } else {
        updateCliente(cliente);
    }
}

function novoCliente(cliente) {
    showMessage("info", "Adicionando novo cliente...");
    fetch(url, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(cliente),
    }).then((res) => {
        if (res.status === 200) {
            toggleModal();
            loadData();
            showMessage("success", "Cliente adicionado com sucesso!");
        } else {
            showMessage("error", "Erro ao cadastrar cliente.");
        }
    });
}

function updateCliente(cliente) {
    const id = cliente._id;
    delete cliente._id;

    showMessage("info", "Alterando cliente...");

    fetch(`${url}/${id}`, {
        method: "PUT",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(cliente),
    }).then((res) => {
        if (res.status === 200) {
            loadData();
            toggleModal();
            showMessage("success", "Cliente alterado com sucesso!");
        } else {
            showMessage("error", "Erro ao atualizar cliente.");
        }
    });
}

function edit(clienteId) {
    const cliente = clientes.find((cli) => cli._id === clienteId);

    if (cliente) {
        fillForm("clienteForm", cliente);
        toggleModal();
    }
}

function remove(clienteId) {
    showMessage("info", "Excluindo cliente...");

    fetch(`${url}/${clienteId}`, {
        method: "DELETE",
    }).then((res) => {
        if (res.status === 200) {
            loadData();
            showMessage("success", "Cliente excluído com sucesso!");
        } else {
            showMessage("error", "Erro ao excluir cliente");
        }
    });
}

function showActions(id) {
    const actionsId = `actions-${id}`;

    document
        .querySelectorAll("div.actions")
        .forEach((e) => e.id !== actionsId && e.classList.remove("show"));
    document.getElementById(actionsId).classList.toggle("show");
}

function toggleModal() {
    document.querySelector(".modal").classList.toggle("show");
}

function filter() {
    if (search.value) {
        const filtered = clientes.filter((cli) => cli.nome.toLowerCase().includes(search.value.toLowerCase()));
        renderList(filtered);
    }
}

function clearFilter() {
    search.value = '';
}

function renderList(clientes) {
    let rows = "";

    if (clientes.length === 0) {
        noData.classList.add("show");
        showTable(false);
    } else {
        noData.classList.remove("show");
        showTable(true);
    }

    clientes.forEach((cliente, index) => {
        const id = cliente._id;

        const createdAt = formatDataHora(new Date(cliente.createdAt));
        const updatedAt = formatDataHora(new Date(cliente.updatedAt));

        rows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefone}</td>
                    <td>${cliente.endereco}</td>
                    <td>${createdAt}</td>
                    <td>${updatedAt}</td>
                    <td class="actions">
                        <button class="btn-icon" onclick="showActions('${id}')">
                            <span class="material-icons">more_vert</span>
                        </button>
    
                        <div class="actions" id="actions-${id}" onclick="showActions('${id}')">
                            <button onclick="edit('${id}')" class="btn-text" id="btn-edit-${id}">
                                <span class="material-icons">edit</span>
                                Editar
                            </button>
                            <button onclick="remove('${id}')" class="btn-text" id="btn-edit-${id}">
                                <span class="material-icons">delete</span>
                                Excluir
                            </button>
                        </div>
                    </td>
                </tr>
            `;
    });

    tableList.innerHTML = rows;
}

function onInit() {
    loadComponents();
    loadData();
}

onInit();

window.loadData = loadData;
window.edit = edit;
window.remove = remove;
window.toggleModal = toggleModal;
window.showActions = showActions;
window.adicionar = adicionar;
window.saveCliente = saveCliente;
window.filter = filter;
