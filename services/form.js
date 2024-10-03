const API_3000 = "http://localhost:3000";
const API_URL = "https://golden-soft-app-back-end.vercel.app";

document
        .getElementById("expenseForm")
        .addEventListener("submit", async (event) => {
          event.preventDefault(); // Impede o envio padrão do formulário

          const nome = document.getElementById("tipo").value;
          const valor = document.getElementById("valorinn").value;
          const descricao = document.getElementById("pgto").value;
          const data = document.getElementById("data").value;

          // Atualize a URL para apontar para o seu aplicativo Vercel
          const response = await fetch(
            API_URL+"/inserir",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ nome, valor, descricao, data }),
            }
          );

          if (response.ok) {
            const message = await response.text();
            alert(message);
            // Limpa o formulário após envio
            document.getElementById("expenseForm").reset();
          } else {
            const errorMessage = await response.text();
            alert(`Erro ao enviar os dados: ${errorMessage}`);
          }
        });

        document.getElementById('logoutBtn').addEventListener('click', () => {
          // Remove o token do localStorage
          localStorage.removeItem('token'); // Certifique-se de usar a mesma chave que você usou ao armazenar o token
      
          // Redireciona o usuário para a página de login
          window.location.href = '../index.html'; // Altere para o caminho correto da sua página de login
      });

      function removeInvalidCharacters() {
        const input = document.getElementById('valorinn');
        input.value = input.value.replace(/[eE]/g, ''); // Remove 'e' ou 'E'
      }
      
       // Função para fazer logout
 function logout() {
  // Remove o token do localStorage (ou sessionStorage)
  localStorage.removeItem('token'); // ou sessionStorage.removeItem('token');
  
  // Redireciona o usuário para a página de login
  window.location.href = '/index.html'; // Substitua pelo caminho correto da sua página de login
}

// Adiciona um evento ao botão "Sair"
document.getElementById('logoutBtn').addEventListener('click', logout);