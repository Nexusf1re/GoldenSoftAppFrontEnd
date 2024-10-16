const API_URL = "https://golden-soft-app-back-end.vercel.app";

window.onload = async () => {
    await fetchVendedores();     // Busca e preenche vendedores
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
        populateForm(data); // Preenche o formulário com os dados obtidos
        await loadMovimentacoes(data.nome); // Carrega as movimentações de acordo com o vendedor
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para preencher o formulário com os dados obtidos
function populateForm(data) {
    document.getElementById('valorinn').value = data.valor;
    document.getElementById('tipo').value = data.nome;
    document.getElementById('observacao').value = data.observacao;
    document.getElementById('data').value = new Date(data.data).toISOString().split('T')[0]; // Formata a data
}

// Função para carregar movimentações com base no vendedor
async function loadMovimentacoes(vendedor) {
    const selectElementMovimentacoes = document.getElementById("pgto");
    selectElementMovimentacoes.innerHTML = '<option disabled selected value>Selecionar</option>'; // Limpa as opções atuais

    if (vendedor === "GERAL") {
        await fetchMovimentacoesGeral(); // Carrega movimentações gerais
    } else {
        await fetchMovimentacoes(); // Carrega movimentações normais
    }
}

// Obtenção do ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Carrega os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    fetchEntryData(id);
});

// Lidar com mudança de vendedor
document.getElementById("tipo").addEventListener("change", async function() {
    const selectedValue = this.value; // Captura o valor selecionado
    await loadMovimentacoes(selectedValue); // Carrega movimentações com base no vendedor selecionado
});
