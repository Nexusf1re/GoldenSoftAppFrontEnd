const API_3000 = "http://localhost:3000";
const API_URL = "https://golden-soft-app-back-end.vercel.app";

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Captura valores dos inputs
    const usuario = document.getElementById('usuario').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const senhaConfirmar = document.getElementById('senhaConfirmar').value;

    // Valida se as senhas batem
    if (senha !== senhaConfirmar) {
        Swal.fire({
            icon: 'error',
            title: 'Erro de Validação',
            text: 'As senhas não coincidem',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33',
            background: '#fefefe',
            backdrop: `rgba(0,0,0,0.4)`,
        });
        return;
    }

    // Objeto para os dados a serem enviados para o backend
    const data = {
        name: usuario,
        email: email,
        password: senha
    };

    try {
        const response = await fetch(API_URL + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Cadastro realizado com sucesso!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#28a745', // Verde para sucesso
                background: '#fefefe',
                backdrop: `rgba(0,0,0,0.4)`,
            }).then(() => {
                // Redireciona após o clique no botão "OK"
                window.location.href = 'index.html';
            });
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Erro: ${errorData.message}`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33',
                background: '#fefefe',
                backdrop: `rgba(0,0,0,0.4)`,
            });
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro de Conexão',
            text: 'Erro de conexão com o servidor.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33',
            background: '#fefefe',
            backdrop: `rgba(0,0,0,0.4)`,
        });
    }
});
