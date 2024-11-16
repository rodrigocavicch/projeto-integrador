document.getElementById('cpf').addEventListener('input', function(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    // Formata apenas se tiver exatamente 11 números
    if (value.length === 11) {
        let formattedValue = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        input.value = formattedValue;
    } else {
        input.value = value;
    }
});

document.getElementById('celular').addEventListener('input', function(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    // Formata apenas se tiver exatamente 11 números
    if (value.length === 11) {
        let formattedValue = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        input.value = formattedValue;
    } else {
        input.value = value;
    }
});

document.getElementById('cep').addEventListener('input', function(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (value.length > 8) {
        value = value.slice(0, 8);
    }

    // Formata apenas se tiver exatamente 8 números
    if (value.length === 8) {
        let formattedValue = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        input.value = formattedValue;
    } else {
        input.value = value;
    }
});

document.querySelector('form').addEventListener('submit', function(event) {
    let cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // Remove formatação
    let celular = document.getElementById('celular').value.replace(/\D/g, ''); // Remove formatação
    let cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove formatação

    if (cpf.length !== 11) {
        alert("O CPF deve conter 11 números.");
        event.preventDefault();
    } else if (celular.length !== 11) {
        alert("O número de celular deve conter 11 números.");
        event.preventDefault();
    } else if (cep.length !== 8) {
        alert("O CEP deve conter 8 números.");
        event.preventDefault();
    }
});
