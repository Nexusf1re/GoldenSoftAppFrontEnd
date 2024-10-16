 window.onload = async () => {
  fetchVendedores();     // Busca e preenche vendedores
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

