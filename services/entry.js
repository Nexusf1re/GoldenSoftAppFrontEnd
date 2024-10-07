
        // Função para buscar os dados da API e preencher a tabela
        async function fetchData() {
            try {
                const response = await fetch('https://golden-soft-app-back-end.vercel.app/entry'); // Substitua pela URL da sua API
                const data = await response.json();

                populateTable(data);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        }

        // Função para preencher a tabela com os dados da API
        function populateTable(data) {
            const table = document.getElementById('data-table');

            data.forEach(row => {
                // Certifique-se de que o valor está sendo tratado como número
                const valor = parseFloat(row.valor);  // Converte o valor para número

                // Verifica se o valor é válido antes de aplicar toFixed
                const valorFormatado = isNaN(valor) ? 'Valor inválido' : `R$&nbsp;${valor.toFixed(2)}`;

                const newRow = document.createElement('tr');

                newRow.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.nome}</td>
                    <td>${valorFormatado}</td>
                    <td>${row.descricao}</td>
                    <td>${new Date(row.data).toLocaleDateString('pt-BR')}</td>
                    <td><button class="far fa-edit" onClick="editarRegistro('${row.id}')"></button></td>
                `;

                table.appendChild(newRow);
            });
        }

        function editarRegistro(id) {
            window.location.href = `editar.html?id=${id}`;
        }

        // Carrega os dados ao iniciar a página
        document.addEventListener('DOMContentLoaded', fetchData);
