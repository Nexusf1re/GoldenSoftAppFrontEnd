  // Verifica se o token existe no localStorage
  const token = localStorage.getItem('token');
  if (!token) {
      // Se não existir, redireciona para a página de login
      window.location.href = 'index.html';
  }