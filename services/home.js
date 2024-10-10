// services/dashboard.js

window.onload = function() {
    // Exemplo simples de dados, no seu caso, você pode buscar esses valores do backend
    let totalDespesas = 5000;  // Valor fictício
    let despesasMes = 2000;    // Valor fictício
    let vendedorAtivo = 'Vendedor X';  // Nome fictício

    document.getElementById('totalDespesas').innerText = `R$ ${totalDespesas.toFixed(2)}`;
    document.getElementById('despesasMes').innerText = `R$ ${despesasMes.toFixed(2)}`;
    document.getElementById('vendedorAtivo').innerText = vendedorAtivo;
};
