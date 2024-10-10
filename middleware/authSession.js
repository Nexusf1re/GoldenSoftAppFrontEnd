// Função para verificar o token no back-end
const checkToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não houver token, redireciona para a página de login
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch('https://golden-soft-app-back-end.vercel.app/user/validate-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      // Se o token for inválido ou expirado, redireciona para a página de login
      window.location.href = 'index.html';
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    } else {
      // Token válido, continue com o fluxo normal
      console.log("Token válido");
    }
  } catch (error) {
    console.error(
      '%c❌ Erro ao validar token: %c%s',
      'color: white; background-color: darkred; font-weight: bold; padding: 2px 4px; border-radius: 3px;',
      'color: darkred;',
      error
    );
    
    // Em caso de erro, redireciona para a página de login
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  }
};
