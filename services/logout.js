document.getElementById('logoutBtn').addEventListener('click', () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  

    window.location.href = 'index.html'; 
  });
  