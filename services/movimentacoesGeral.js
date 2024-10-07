// movimentacoesGeral.js
async function fetchMovimentacoesGeral() {
  try {
      const response = await fetch(API_URL + '/movimentacoesGeral');
      const categorias = await response.json();

      const selectElementMovimentacoes = document.getElementById("pgto");

      categorias.forEach(categoria => {
          const option = document.createElement("option");
          option.value = categoria.categoria;
          option.textContent = categoria.categoria;
          selectElementMovimentacoes.appendChild(option);
      });
  } catch (error) {
      console.error("Erro ao buscar movimentações gerais:", error);
  }
}