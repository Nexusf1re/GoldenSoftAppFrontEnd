let auth0Client;

const initAuth0 = async () => {
    auth0Client = await createAuth0Client({
        domain: 'dev-u1mo5s51vi28d48a.us.auth0.com', // Substitua pelo seu domínio do Auth0
        client_id: 'EnolPHhKFEBgLBhptmJl5K334e7NJRM2',       // Substitua pelo seu Client ID
        redirect_uri: window.location.origin
    });
};

const login = async () => {
    await auth0Client.loginWithRedirect();
};

const logout = () => {
    auth0Client.logout({ returnTo: window.location.origin });
};

const handleRedirectCallback = async () => {
    await auth0Client.handleRedirectCallback();
    window.location.replace(window.location.origin);
};

// Inicialize o Auth0 quando a página carregar
window.onload = async () => {
    await initAuth0();
    
    // Verifique se houve um callback de autenticação
    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        await handleRedirectCallback();
    }

    // Verifique se o usuário está autenticado
    const isAuthenticated = await auth0Client.isAuthenticated();
    console.log(isAuthenticated);

    if (isAuthenticated) {
        window.location.href = 'form.html'; // Redireciona para a página após login
        document.getElementById('logout').style.display = 'block'; // Mostra o botão de logout
    }
};

// Adicione eventos para login e logout
document.getElementById('login').addEventListener('click', login);

// Verifique se o botão de logout existe na página
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}
