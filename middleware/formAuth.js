document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

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
        if (response.ok) {
            return response.text(); // Se o token for válido, obtém o conteúdo
        } else {
            window.location.href = 'index.html'; // Redireciona se o token não for válido
        }
    })
    .then(html => {
        // Insere o HTML diretamente no body
        document.getElementById('formBody').innerHTML = html; // Carrega o conteúdo do formulário no body
    })
    .catch(error => {
        console.error('Erro ao acessar o formulário:', error);
        window.location.href = 'index.html'; // Redireciona em caso de erro
    });
});
