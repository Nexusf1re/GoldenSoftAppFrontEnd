const API_URL = "https://golden-soft-app-back-end.vercel.app";

document.getElementById("expenseForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  const nome = document.getElementById("tipo").value;
  const valor = document.getElementById("valorinn").value;
  const descricao = document.getElementById("pgto").value;
  const observacao = document.getElementById("observacao").value;
  const data = document.getElementById("data").value;

  const token = localStorage.getItem('token'); // Obtém o token do localStorage
  const username = localStorage.getItem('username'); // Obtém o nome do usuário logado

  // Envio da requisição
  const response = await fetch(API_URL + "/despesas/inserir", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nome, valor, descricao, observacao, data, username }),
  });

  if (response.ok) {
    const message = await response.text();
    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: alert(message),
      confirmButtonText: 'OK',
      confirmButtonColor: '#28a745', // Verde para sucesso
      background: '#fefefe',
      backdrop: `rgba(0,0,0,0.4)`,
    }).then(() => {
      // Limpa o formulário após envio
      document.getElementById("expenseForm").reset();
    })

  }
  // Código que utiliza o SweetAlert2
  else {
    const errorMessage = await response.text();

    Swal.fire({
      icon: 'error',
      title: 'Erro ao enviar os dados',
      text: errorMessage,
      confirmButtonText: 'OK',
      confirmButtonColor: '#d33',
      background: '#fefefe',
      backdrop: `rgba(0,0,0,0.4)`,
    }).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = 'index.html';
    });
  }
});
