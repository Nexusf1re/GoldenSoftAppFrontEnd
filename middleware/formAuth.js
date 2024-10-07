fetch('https://golden-soft-app-back-end.vercel.app/form', {
    method: 'GET',
    headers: {
        'Authorization': localStorage.getItem('token') // ou cookies, se preferir
    }
})
.then(response => {
    if (response.ok) {
        return response.text(); // Pega o HTML
    } else {
        window.location.href = 'login.html'; // Redireciona para a página de login
    }
})
.then(html => {
    document.open();
    document.write(html); // Carrega o conteúdo do formulário
    document.close();
})
.catch(error => {
    console.error('Erro ao acessar o formulário:', error);
    window.location.href = 'login.html'; // Redireciona em caso de erro
});
