// Função para verificar se o token JWT está presente e válido
function isAuthenticated() {
    const token = localStorage.getItem('token'); // ou sessionStorage
  
    if (!token) {
      return false; // Token não existe
    }
  
    // Opcional: verificar a validade do token decodificando o JWT (por exemplo, verificar a expiração)
    // Você pode usar bibliotecas como jwt-decode para isso
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
  
      if (payload.exp < currentTime) {
        return false; // Token expirado
      }
  
      return true; // Token válido
    } catch (e) {
      return false; // Erro ao decodificar o token
    }
  }
  
  // Redirecionar se o usuário não estiver autenticado
  if (!isAuthenticated()) {
    window.location.href = "/login.html"; // Redireciona para a página de login
  }
  