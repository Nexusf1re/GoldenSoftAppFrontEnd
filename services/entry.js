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
        populateTable(data);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para preencher a tabela com os dados da API, ordenados por data
function populateTable(data) {
    const table = document.getElementById('data-table');

    // Ordena os dados por data (mais recente primeiro)
    data.sort((a, b) => new Date(b.data) - new Date(a.data)); // Ordem decrescente (mais recente primeiro)

    data.forEach(row => {
        // Certifique-se de que o valor está sendo tratado como número
        const valor = parseFloat(row.valor);  // Converte o valor para número

        // Verifica se o valor é válido antes de aplicar toFixed
        const valorFormatado = isNaN(valor) ? 'Valor inválido' : `R$&nbsp;${valor.toFixed(2)}`;

        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${row.nome}</td>
            <td>${valorFormatado}</td>
            <td>${row.descricao}</td>
            <td>${row.observacao}</td>
            <td>${formatDate(row.data)}</td>
            <td><button id="alterar" class="far fa-edit" onClick="editarRegistro('${row.id}')"></button></td>
        `;

        table.appendChild(newRow);
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


function editarRegistro(id) {
    window.location.href = `edit.html?id=${id}`;
}

// Carrega os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', fetchData);
