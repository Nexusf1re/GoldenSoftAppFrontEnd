document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log('Token recuperado:', token); // Verifique se o token está presente

    if (!token) {
        window.location.href = 'index.html'; // Redireciona se não houver token
        return;
    }

    fetch('https://golden-soft-app-back-end.vercel.app/api/form', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        console.log('Response Status:', response.status); // Verifique o status da resposta
        if (!response.ok) {
            window.location.href = 'index.html'; // Redireciona se o token não for válido
        }
    })
    .catch(error => {
        console.error('Erro ao acessar o formulário:', error);
        window.location.href = 'index.html'; // Redireciona em caso de erro
    });
});
