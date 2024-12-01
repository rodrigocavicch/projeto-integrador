document.getElementById("loginForm").addEventListener("submit", handleLoginFormSubmit);

function handleLoginFormSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Check if inputs are valid
    if (!validateLoginInput(email, senha)) {
        console.log("Invalid email or password.");
        return;
    }

    // Function to validate user in a given API
    function validateUser(apiEndpoint, isMonitor = false) {
        return fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                // Check user credentials based on the flag
                const user = data.find(info => 
                    isMonitor 
                        ? info.email_monitor == email && info.senha_monitor == senha 
                        : info.email_aluno == email && info.senha_aluno == senha
                );
                console.log(user);
                return user || null; // Return user if found, otherwise null
            });
    }

    // First, check in the "alunos" database
    validateUser('/api/alunos')
        .then(user => {
            if (user) {
                window.location.href = "../home_aluno";
                // Perform login action for aluno
                return;
            } else {
                // If not found, check in the "monitores" database
                return validateUser('/api/monitores', true)
                    .then(monitor => {
                        if (monitor) {
                            window.location.href = "../home_monitor";
                            alert("Logged in as monitor.");
                            // Perform login action for monitor
                        } else {
                            // If not found in both, show an alert
                            alert("Invalid credentials.");
                        }
                    });
            }
        })
        .catch(error => console.error('Error fetching data: ', error));
}



// Function to validate email and password
function validateLoginInput(email, senha) {
    // Simple validation checks (you can customize this as needed)
    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    // You could add more specific checks here, like email format
    if (!validateEmailFormat(email)) {
        alert("Por favor, insira um e-mail vÃ¡lido.");
        return false;
    }

    return true;
}

// Function to validate the email format
function validateEmailFormat(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function handleInputChange(event) {
    const inputId = event.target.id;  // Get the ID of the input element
    const value = event.target.value; // Get the current value of the input

    console.log(`Input with ID '${inputId}' changed. New value: ${value}`);
}