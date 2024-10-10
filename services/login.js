const API_3000 = "http://localhost:3000";
const API_URL = "https://golden-soft-app-back-end.vercel.app";

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 

    // Faz a requisição para o backend
    const response = await fetch(API_URL + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })  // Envia os dados do formulário
    });

    if (response.ok) {
        const result = await response.json();

        // Armazena o token e o nome do usuário no localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username); // Armazena o nome do usuário

        window.location.href = 'form.html';
        
    } else {
        const error = await response.json();
        
        // Usando SweetAlert2 para mostrar o erro
        Swal.fire({
            icon: 'error',
            title: 'Erro de Login',
            text: error.message,  // Mensagem de erro recebida
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33',
            background: '#fefefe',
            backdrop: `rgba(0,0,0,0.4)`,
        });
    }
});
