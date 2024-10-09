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
        body: JSON.stringify({ nome, valor, descricao, observacao, data, username }), // Inclui o nome do usuário
    });

    if (response.ok) {
        const message = await response.text();
        alert(message);
        // Limpa o formulário após envio
        document.getElementById("expenseForm").reset();
    } else {
        const errorMessage = await response.text();
        alert(`Erro ao enviar os dados: ${errorMessage}`);
        window.location.href = 'index.html';
    }
});
