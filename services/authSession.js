const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'index.html'; // Redireciona para login se o token não existir
} else {
    fetch('https://golden-soft-app-back-end.vercel.app/auth', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            // Se o token for inválido ou expirado, redireciona para a página de login
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        console.error('Erro ao verificar o token:', error);
        window.location.href = 'index.html';
    });
}
