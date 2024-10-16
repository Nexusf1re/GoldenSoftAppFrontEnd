window.onload = async () => {
  await fetchVendedores(); // Busca e preenche vendedores
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
  document.getElementById('valorinn').value = data.valor;
  document.getElementById('tipo').value = data.nome;
  document.getElementById('observacao').value = data.observacao;
  document.getElementById('data').value = new Date(data.data).toISOString().split('T')[0]; // Formata a data
}

// Função para buscar movimentações gerais
async function fetchMovimentacoesGeral() {
  try {
      const response = await fetch(API_URL + '/movimentacoes/movimentacoesGeral');
      const categorias = await response.json();

      const selectElementMovimentacoes = document.getElementById("pgto");
      selectElementMovimentacoes.innerHTML = '<option disabled selected value>Selecionar</option>'; // Limpa opções antigas

      categorias.forEach(categoria => {
          console.log(`Adicionando categoria: ${categoria.categoria}`); // Log para verificação
          const option = document.createElement("option");
          option.value = categoria.categoria;
          option.textContent = categoria.categoria;
          selectElementMovimentacoes.appendChild(option);
      });
  } catch (error) {
      console.error("Erro ao buscar movimentações gerais:", error);
  }
}

// Função para buscar movimentações normais
async function fetchMovimentacoes() {
  try {
      const response = await fetch(API_URL + '/movimentacoes/movimentacoes');
      const categorias = await response.json();

      const selectElementMovimentacoes = document.getElementById("pgto");
      selectElementMovimentacoes.innerHTML = '<option disabled selected value>Selecionar</option>'; // Limpa opções antigas

      categorias.forEach(categoria => {
          console.log(`Adicionando categoria: ${categoria.categoria}`); // Log para verificação
          const option = document.createElement("option");
          option.value = categoria.categoria;
          option.textContent = categoria.categoria;
          selectElementMovimentacoes.appendChild(option);
      });
  } catch (error) {
      console.error("Erro ao buscar movimentações:", error);
  }
}

// Obtenção do ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Carrega os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
  fetchEntryData(id);
});

// Evento para capturar a mudança do vendedor
document.getElementById("tipo").addEventListener("change", async function () {
  const selectedValue = this.value; // Captura o valor selecionado

  // Limpa as opções atuais do select de movimentações
  const selectElementMovimentacoes = document.getElementById("pgto");
  selectElementMovimentacoes.innerHTML = '<option disabled selected value>Selecionar</option>'; // Adiciona a opção padrão

  console.log(`Vendedor selecionado: ${selectedValue}`);

  if (selectedValue === "GERAL") {
      console.log("Carregando movimentações gerais...");
      await fetchMovimentacoesGeral(); // Chama a função para buscar movimentações gerais
  } else {
      console.log("Carregando movimentações normais...");
      await fetchMovimentacoes(); // Chama a função para buscar movimentações normais
  }
});
