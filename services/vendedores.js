


// Função para buscar movimentações do servidor
async function fetchVendedores() {
    try {
      const response = await fetch(API_URL+'/vendedores');
      const vendedores  = await response.json();

      const selectElementTipo = document.getElementById("tipo");

      vendedores.forEach(vendedor => {
        const optionVendedor = document.createElement("option");
        optionVendedor.value = vendedor.vendedor;  // Pega o valor correto do campo "vendedor"
        optionVendedor.textContent = vendedor.vendedor;  // Exibe o texto correto no dropdown
        selectElementTipo.appendChild(optionVendedor);
      });
    } catch (error) {
      console.error("Erro ao buscar os vendedores:", error);
    }
  }