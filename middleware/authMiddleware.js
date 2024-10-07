document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token'); // ou cookies, se você estiver usando

  if (!token) {
      // Se não houver token, redireciona para a página de login
      window.location.href = 'login.html';
  } else {
      // Você pode fazer uma verificação adicional no servidor se desejar
      fetch('/api/verificar-token', {
          method: 'GET',
          headers: {
              'Authorization': token
          }
      })
      .then(response => {
          if (!response.ok) {
              // Se o token não for válido, redireciona
              window.location.href = 'login.html';
          }
      })
      .catch(error => {
          console.error('Erro ao verificar o token:', error);
          window.location.href = 'login.html';
      });
  }
});
