document.getElementById('logoutBtn').addEventListener('click', () => {
    // Remove the token and username from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  
    // Optionally, you can also clear sessionStorage if you are using it
    // sessionStorage.clear();
  
    // Redirect the user to the login page
    window.location.href = 'index.html'; // Change to the correct path for your login page
  });
  