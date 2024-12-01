document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const senha = document.getElementById("senha_aluno");
    const confirmarSenha = document.getElementById("confirmarSenha");
    const cpf = document.getElementById("cpf_aluno");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const valid = validarFormulario(); // Run your validation logic
        if (valid) {
            const formData = new FormData(form); // Get form data
            const data = Object.fromEntries(formData.entries()); // Convert form data to JSON-friendly object

            try {
                // Send the JSON data to the `create_aluno` API
                const response = await fetch("/api/alunos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data), // Convert object to JSON string
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");
                    console.log("Response data:", await response.json());
                    window.location.href = "../login"; // Redirect after success
                } else {
                    const errorData = await response.json();
                    alert("Erro ao realizar cadastro: " + errorData.error);
                    console.error("Error response:", errorData);
                }
            } catch (error) {
                console.error("An unexpected error occurred:", error);
                alert("Erro inesperado ao tentar realizar o cadastro.");
            }
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
        }

        // Valida o CPF
        const cpfError = document.getElementById("cpf-error");
        if (!validarCPF(cpf.value)) {
            cpfError.textContent = "CPF inválido.";
            cpfError.style.display = "block";
            isValid = false;
        } else {
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
