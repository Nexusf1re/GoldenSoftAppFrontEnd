


// Função para buscar movimentações do servidor
async function fetchMovimentacoes() {
    try {
      const response = await fetch(API_URL+'/movimentacoes');
      const categorias  = await response.json();

      const selectElementMovimentacoes = document.getElementById("pgto");

      categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.categoria;  // Pega o valor correto do campo "categoria"
        option.textContent = categoria.categoria;  // Exibe o texto correto no dropdown
        selectElementMovimentacoes.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao buscar movimentações:", error);
    }
  }