        async function fetchMovimentacoesGeral() {
        try {
        const response = await fetch(API_URL + '/movimentacoes/movimentacoesGeral');
        const categorias = await response.json();

        // Ordena as categorias em ordem alfabética
        categorias.sort((a, b) => a.categoria.localeCompare(b.categoria));

        const selectElementMovimentacoes = document.getElementById("pgto");
        selectElementMovimentacoes.innerHTML = '<option disabled selected value>Selecionar</option>'; // Limpa opções anteriores

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
