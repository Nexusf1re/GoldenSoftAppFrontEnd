function isAuthenticated() {
    const token = localStorage.getItem('token'); // ou sessionStorage
    
    if (!token) {
      return false; // Token não existe
    }
    
    try {
      const payload = jwt_decode(token); // Use a biblioteca jwt-decode para decodificar o token
  
      // Verifica se o token está expirado
      const currentTime = Date.now() / 1000; // Tempo atual em segundos
      if (payload.exp < currentTime) {
        return false; // Token expirado
      }
      
      return true; // Token válido
    } catch (e) {
      console.error("Erro ao decodificar o token:", e);
      return false; // Erro ao decodificar o token
    }
  }
  
  // Redirecionar se o usuário não estiver autenticado
  if (!isAuthenticated()) {
    window.location.href = "/index.html"; // Redireciona para a página de login
  }
  