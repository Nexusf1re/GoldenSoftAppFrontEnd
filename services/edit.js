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