document.getElementById("loginForm").addEventListener("submit", handleLoginFormSubmit);

function handleLoginFormSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!validateLoginInput(email, senha)) {
        console.log("Email ou senha inválidos.");
        return;
    }

    // Faz a requisição POST para o backend
    fetch("/login_func", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, senha: senha }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redireciona para a página apropriada
                window.location.href = data.redirect;
            } else {
                alert(data.message || "Erro ao fazer login.");
            }
        })
        .catch(error => console.error("Erro ao validar usuário: ", error));
}



// Função para validar o formato do e-mail e verificar campos
function validateLoginInput(email, senha) {
    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }
    if (!validateEmailFormat(email)) {
        alert("Por favor, insira um e-mail válido.");
        return false;
    }
    return true;
}

function validateEmailFormat(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function handleInputChange(event) {
    const inputId = event.target.id;
    const value = event.target.value;

    console.log(`Input com ID '${inputId}' mudou. Novo valor: ${value}`);
}
