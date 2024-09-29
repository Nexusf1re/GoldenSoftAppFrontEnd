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
            "https://golden-soft-app-back-end.vercel.app/inserir",
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