document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmarSenha");
    const cpf = document.getElementById("cpf");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio do formulário se houver erros
        const valid = validarFormulario();
        if (valid) {
            alert("Cadastro realizado com sucesso!");
            form.submit();
            window.location.href = "../login/index.html";
        }
    });

    function validarFormulario() {
        let isValid = true;

        // Valida as senhas
        const senhaError = document.getElementById("senha-error");
        const confirmarSenhaError = document.getElementById("confirmarSenha-error");
        if (senha.value !== confirmarSenha.value) {
            senhaError.textContent = "As senhas não coincidem.";
            confirmarSenhaError.textContent = "As senhas não coincidem.";
            senhaError.style.display = "block";
            confirmarSenhaError.style.display = "block";
            isValid = false;
        } else {
            senhaError.style.display = "none";
            confirmarSenhaError.style.display = "none";
        }

        // Valida o CPF
        const cpfError = document.getElementById("cpf-error");
        if (!validarCPF(cpf.value)) {
            cpfError.textContent = "CPF inválido.";
            cpfError.style.display = "block";
            isValid = false;
        } else {
            cpfError.style.display = "none";
        }

        return isValid;
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;

        return true;
    }
});
