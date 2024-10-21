const API_URL = "https://golden-soft-app-back-end.vercel.app";

// Função para buscar os dados da API e preencher a tabela
async function fetchData() {
    try {
        const token = localStorage.getItem('token'); // Obtém o token do localStorage

        const response = await fetch(API_URL + '/despesas/entry', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviando o token no cabeçalho
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.statusText}`); // Tratar erros de resposta
        }

        const data = await response.json();
        populateTable(data);  // Preenche a tabela com os dados
        initializeDataTable(); // Inicializa o DataTables após preencher a tabela
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para preencher a tabela com os dados da API, ordenados por data
function populateTable(data) {
    const tableBody = document.querySelector('#data-table tbody');  // Usando o tbody diretamente

    // Limpa o corpo da tabela antes de inserir novos dados
    tableBody.innerHTML = '';

    // Ordena os dados por data (mais recente primeiro)
    data.sort((a, b) => new Date(b.data) - new Date(a.data)); // Ordem decrescente (mais recente primeiro)

    data.forEach(row => {
        const valor = parseFloat(row.valor);  // Converte o valor para número
        const valorFormatado = isNaN(valor) ? 'Valor inválido' : `R$&nbsp;${valor.toFixed(2)}`;

        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${row.nome}</td>
            <td>${valorFormatado}</td>
            <td>${row.descricao}</td>
            <td>${row.observacao}</td>
            <td>${formatDate(row.data)}</td>
            <td>${row.id}</td>
            <td><button id="alterar" class="far fa-edit" onClick="editarRegistro('${row.id}')"></button></td>
        `;

        tableBody.appendChild(newRow);
    });
}

// Função para formatar a data sem fuso horário
function formatDate(dataString) {
    const date = new Date(dataString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}

// Função para inicializar o DataTables
function initializeDataTable() {
    // Verifica se o DataTable já está inicializado
    if ($.fn.DataTable.isDataTable('#data-table')) {
        $('#data-table').DataTable().destroy(); // Destrói a instância existente
    }

    // Inicializa o DataTables
    $('#data-table').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/2.1.8/i18n/pt-BR.json"
        },
        "paging": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "order": [[4, 'desc']] // Ordena a primeira coluna (índice 0) em ordem decrescente
      //  "lengthChange": true
    });
}

// Função de redirecionamento ao editar um registro
function editarRegistro(id) {
    window.location.href = `edit.html?id=${id}`;
}

// Carrega os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', fetchData);
