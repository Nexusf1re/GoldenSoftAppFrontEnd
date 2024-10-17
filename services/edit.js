API_URL = "https://golden-soft-app-back-end.vercel.app";

window.onload = async () => {
    fetchVendedores(); // Busca e preenche vendedores
    checkToken();
};

// Função para buscar os dados e preencher o formulário
async function fetchEntryData(id) {
    try {
        const token = localStorage.getItem('token');
        const url = `${API_URL}/despesas/entry/${id}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const data = await response.json();
        // Verifica o vendedor e carrega as movimentações antes de preencher o formulário
        if (data.nome === "GERAL") {
            await fetchMovimentacoesGeral();
        } else {
            await fetchMovimentacoes();
        }

        populateForm(data); // Preenche o formulário com os dados obtidos
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para preencher o formulário com os dados obtidos
function populateForm(data) {
    document.getElementById('valorinn').value = data.valor || '';
    document.getElementById('tipo').value = data.nome || '';
    document.getElementById('observacao').value = data.observacao || '';
    document.getElementById('data').value = new Date(data.data).toISOString().split('T')[0] || '';

    const movimentacaoCorreta = data.descricao;
    const selectElementMovimentacoes = document.getElementById("pgto");
    selectElementMovimentacoes.value = movimentacaoCorreta || '';

    // Se o valor da movimentação não estiver na lista, adicione um log para verificar
    if (!Array.from(selectElementMovimentacoes.options).some(option => option.value === movimentacaoCorreta)) {
        //console.log(`Movimentação ${movimentacaoCorreta} não encontrada no dropdown.`);
    }
}

// Obtenção do ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Carrega os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    fetchEntryData(id);
});

// Lida com a alteração no campo 'tipo'
document.getElementById("tipo").addEventListener("change", async function () {
    const selectedValue = this.value; // Captura o valor selecionado

    // Limpa as opções atuais do select de movimentações
    const selectElementMovimentacoes = document.getElementById("pgto");
    selectElementMovimentacoes.innerHTML = '<option disabled selected value>Selecionar</option>'; // Adiciona a opção padrão

    if (selectedValue === "GERAL") {
        // Se o vendedor selecionado for "GERAL", chama a função para buscar movimentações gerais
        await fetchMovimentacoesGeral();
    } else {
        // Caso contrário, chama a função para buscar movimentações normais
        await fetchMovimentacoes();
    }
});

// Função para enviar a atualização
async function updateEntry() {
    const token = localStorage.getItem('token');
    const nome = document.getElementById('tipo').value;
    const valor = document.getElementById('valorinn').value;
    const descricao = document.getElementById('pgto').value;
    const observacao = document.getElementById("observacao").value.toUpperCase();
    const data = document.getElementById('data').value;
    const username = localStorage.getItem('username');

    const response = await fetch(`${API_URL}/despesas/entryUpdate/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ nome, valor, descricao, observacao, data, username }),
    });

    if (response.ok) {
        const message = await response.text();
        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: message,
            confirmButtonText: 'OK',
            confirmButtonColor: '#28a745', // Verde para sucesso
            background: '#fefefe',
            backdrop: `rgba(0,0,0,0.4)`,
        }).then(() => {
            // Limpa o formulário e redireciona após sucesso
            document.getElementById("expenseForm").reset();
            window.location.href = 'entry.html';
        });
    } else {
        const errorMessage = await response.text();
        Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar os dados',
            text: errorMessage,
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33',
            background: '#fefefe',
            backdrop: `rgba(0,0,0,0.4)`,
        }).then(() => {
            // Remove token e redireciona para login
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }
}


// Adiciona o listener de submissão do formulário
document.getElementById("expenseForm").addEventListener("submit", function (event) {
    event.preventDefault();
    updateEntry();
});


// Alterar de "submit" para "click"
document.getElementById('deleteBtn').addEventListener("click", function (event) {
    event.preventDefault();
    deleteEntry();
});

function deleteEntry() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    
    // Obtenção do ID da URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');


    fetch(`${API_URL}/despesas/entryDelete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username })
    })
    .then(async response => {  // Usar async para o bloco de resposta
        if (response.ok) {
            const message = await response.text();  // Usar await para garantir que seja resolvido
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: message,
                confirmButtonText: 'OK',
                confirmButtonColor: '#28a745', // Verde para sucesso
                background: '#fefefe',
                backdrop: `rgba(0,0,0,0.4)`,
            }).then(() => {
                // Limpa o formulário e redireciona para sucesso
                document.getElementById("expenseForm").reset();
                window.location.href = 'entry.html';
            });
        } else {
            const errorMessage = await response.text();  // Usar await para pegar o erro corretamente
            Swal.fire({
                icon: 'error',
                title: 'Erro ao enviar os dados',
                text: errorMessage,
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33',
                background: '#fefefe',
                backdrop: `rgba(0,0,0,0.4)`,
            }).then(() => {
                // Remove token e redireciona para login
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                window.location.href = 'index.html';
            });
        }
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message,
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33',
            background: '#fefefe',
            backdrop: `rgba(0,0,0,0.4)`,
        });
    });
}
