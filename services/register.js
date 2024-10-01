const API_3000 = "http://localhost:3000";
const API_URL = "https://golden-soft-app-back-end.vercel.app";

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    //Captura valore dos inputs
    const usuario = document.getElementById('usuario').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const senhaConfirmar = document.getElementById('senhaConfirmar').value;

    //Valida se as senhas batem
    if(senha !== senhaConfirmar) {
        alert('As senhas não coincidem');
        return;
    }

    //Objeto para os dados a serem enviado para o backend
    const data = {
        name: usuario,
        email: email,
        password: senha
    };

    try{
        const response = await fetch('https://golden-soft-app-back-end.vercel.app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            const result = await response.json();
            alert('Cadastro realizado com sucesso!');
        } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro de conexão com o servidor.');
    }
  });