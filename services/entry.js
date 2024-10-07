// Função para buscar os dados da API e preencher a tabela
async function fetchData() {
    try {
        // Obtendo o token JWT do localStorage (ou onde quer que você tenha armazenado)
        const token = localStorage.getItem('token'); 

        const response = await fetch('https://golden-soft-app-back-end.vercel.app/entry', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Envia o token JWT no cabeçalho Authorization
                'Content-Type': 'application/json'
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Verifica se o resultado é um array
        if (!Array.isArray(data)) {
            throw new TypeError('Os dados retornados não são uma lista.');
        }

        // Chama a função para preencher a tabela com os dados
        populateTable(data);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para preencher a tabela com os dados da API
function populateTable(data) {
    const table = document.getElementById('data-table');

    data.forEach(row => {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${row.id}</td>
            <td>${row.nome}</td>
            <td>R$&nbsp;${row.valor.toFixed(2)}</td>
            <td>${row.descricao}</td>
            <td>${new Date(row.data).toLocaleDateString('pt-BR')}</td>
            <td><button class="far fa-edit" onClick="editarRegistro('${row.id}')"></button></td>
        `;

        table.appendChild(newRow);
    });
}

// Função para redirecionar para a página de edição
function editarRegistro(id) {
    window.location.href = `editar.html?id=${id}`;
}

// Carrega os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', fetchData);
