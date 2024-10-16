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
        console.log('Dados retornados:', data); // Log para verificar os dados retornados

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
    console.log('Preenchendo o formulário com os dados:', data); // Log para verificar os dados

    document.getElementById('valorinn').value = data.valor || ''; // Certifique-se de que `data.valor` existe
    document.getElementById('tipo').value = data.nome || ''; // Certifique-se de que `data.nome` existe
    document.getElementById('observacao').value = data.observacao || ''; // Certifique-se de que `data.observacao` existe
    document.getElementById('data').value = new Date(data.data).toISOString().split('T')[0] || ''; // Formata a data

    // Preenche o select de movimentações com o valor correto
    const selectElementMovimentacoes = document.getElementById("pgto");
    selectElementMovimentacoes.value = data.movimentacao || ''; // Verifica se data.movimentacao existe

    // Se o valor da movimentação não estiver na lista, adicione um log para verificar
    if (!Array.from(selectElementMovimentacoes.options).some(option => option.value === data.movimentacao)) {
        console.log(`Movimentação ${data.movimentacao} não encontrada no dropdown.`);
    }
}

// Obtenção do ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Carrega os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    fetchEntryData(id);
});

document.getElementById("tipo").addEventListener("change", async function() {
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
