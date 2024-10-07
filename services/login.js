const API_3000 = "http://localhost:3000";
const API_URL = "https://golden-soft-app-back-end.vercel.app";

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 

    // Faz a requisição para o backend
    const response = await fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })  // Envia os dados do formulário
    });

    if (response.ok) {
        const result = await response.json();
        alert(result.message);  // Exibe a mensagem do backend

        // Armazena o token e o nome do usuário no localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username); // Armazena o nome do usuário

        // Redireciona para o form.html
        window.location.href = 'form.html';
        
    } else {
        const error = await response.json();
        alert('Erro: ' + error.message);  // Exibe a mensagem de erro
    }
});
