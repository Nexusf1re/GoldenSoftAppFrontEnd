// Função para verificar o token no back-end
const checkToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não houver token, redireciona para a página de login
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch('http://https://golden-soft-app-back-end.vercel.app/user/validate-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      // Se o token for inválido ou expirado, redireciona para a página de login
      window.location.href = 'index.html';
    } else {
      // Token válido, continue com o fluxo normal
      console.log("Token válido");
    }
  } catch (error) {
    console.error('Erro ao validar token:', error);
    // Em caso de erro, redireciona para a página de login
    window.location.href = 'index.html';
  }
};

// Chame a função checkToken quando a página for carregada
window.onload = checkToken;
