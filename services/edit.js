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

  // Preenche o select de movimentações com o valor correto
  const selectElementMovimentacoes = document.getElementById("pgto");
  selectElementMovimentacoes.value = data.movimentacao; // Assume que data.movimentacao contém o valor da movimentação

  // Se o valor da movimentação não estiver na lista, adicione um log para verificar
  if (!Array.from(selectElementMovimentacoes.options).some(option => option.value === data.movimentacao)) {
      console.log(`Movimentação ${data.movimentacao} não encontrada no dropdown.`);
  }
}
