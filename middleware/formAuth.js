document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Obtém o token do armazenamento

    if (!token) {
        // Se não houver token, redireciona para a página de login
        window.location.href = 'index.html';
        return; // Para evitar que o código continue executando
    }

    // Faz uma solicitação para verificar a validade do token
    fetch('https://golden-soft-app-back-end.vercel.app/form', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        if (response.ok) {
            // Se o token for válido, redireciona para o formulário
            window.location.href = 'https://goldensoft-despesas.vercel.app/form.html';
        } else {
            // Redireciona se o token não for válido
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        console.error('Erro ao acessar o formulário:', error);
        window.location.href = 'index.html'; // Redireciona em caso de erro
    });
});
