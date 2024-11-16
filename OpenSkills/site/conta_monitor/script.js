document.getElementById("accountForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const bio = document.getElementById("bio").value;

    // Simula o salvamento das informações
    console.log("Alterações salvas:", { nome, email, senha, bio });

    alert("Suas alterações foram salvas com sucesso!");
});
