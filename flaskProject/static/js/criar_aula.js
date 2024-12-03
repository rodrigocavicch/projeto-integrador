let id_da_materia;
let user_id;

async function carregarIdMonitor() {
    try {
        const response = await fetch('/api/session');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da sessão');
        }

        const sessionData = await response.json();
        user_id = sessionData.user_id;

        if (user_id) {
            console.log("ID do Usuário:", user_id);
        } else {
            console.log("Usuário não autenticado ou sem permissões.");
        }
    } catch (error) {
        console.error("Erro ao carregar ID do usuário:", error);
        alert("Erro ao carregar informações do usuário.");
    }
}

async function carregarMaterias() {
    try {
        const response = await fetch('/api/materias');

        if (!response.ok) {
            throw new Error('Erro ao buscar matérias');
        }

        const materias = await response.json();
        const dropdown = document.getElementById('materia');
        
        // Popula o dropdown com as opções de matérias
        materias.forEach(materia => {
            const option = document.createElement('option');
            option.value = materia.id_materia; // Valor da matéria
            id_da_materia = materia.id_materia;
            option.textContent = materia.nome_materia; // Nome da matéria
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar matérias:", error);
        document.getElementById('materia-error').textContent = 'Erro ao carregar matérias.';
    }
}

// Função para validar os inputs do formulário
function validateClassInput(titulo, descricao, materia, data, link) {
    if (!titulo || !descricao || !materia || !data) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    // Verifica o formato do link (se for obrigatório e opcionalmente vazio)
    if (link && !validateURLFormat(link)) {
        alert("Por favor, insira um link válido.");
        return false;
    }

    return true;
}

// Valida o formato do link (URL)
function validateURLFormat(link) {
    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.[a-z]{2,}(:\d+)?(\/[\w.-]*)*(\?.*)?$/i;
    return urlRegex.test(link);
}


// Lida com o envio do formulário de criação da aula
document.getElementById("createClassForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const id_materia = document.getElementById("materia").value;
    const link = document.getElementById("link").value;
    const horario = new Date(document.getElementById("data").value).toISOString().slice(0, 19).replace('T', ' ');

    // Validação
    if (!validateClassInput(titulo, descricao, id_materia, horario, link)) {
        return;
    }

    if (!user_id) {
        alert("Erro: Não foi possível identificar o usuário. Faça login novamente.");
        return;
    }

    try {
        const response = await fetch('/api/aulas', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id, // Adicionando o user_id explicitamente
                titulo,
                descricao,
                id_materia,
                link,
                horario
            })
        });

        const result = await response.json();
        if (response.ok) {
            alert("Aula criada com sucesso!");
            window.location.href = "/home_monitor";
        } else {
            alert(result.error || "Erro ao criar a aula.");
        }
    } catch (error) {
        console.error("Erro ao criar aula:", error);
        alert("Erro ao criar aula. Tente novamente mais tarde.");
    }
});


window.onload = async function() {
    await carregarIdMonitor(); // Certifique-se de carregar o user_id antes de usar
    carregarMaterias();
};



// async function carregarMaterias() {
//     try {
//         // Fazendo a requisição GET ao endpoint do Flask
//         const response = await fetch('/api/materias');
        
//         if (!response.ok) {
//             throw new Error('Erro ao buscar matérias');
//         }
        
//         // Obtendo os dados em JSON
//         const materias = await response.json();
        
//         // Selecionando o dropdown
//         const dropdown = document.getElementById('materia');
//         console.log("materias");
//         console.log(materias);
//         // Preenchendo as opções no dropdown
//         materias.forEach(materia => {
//             const option = document.createElement('option');
//             option.value = materia.id_materia;  // Define o value como id_materia
//             option.textContent = materia.nome_materia; // Define o texto como nome_materia
//             dropdown.appendChild(option); // Adiciona a opção ao dropdown
//         });
//     } catch (error) {
//         console.error(error);
//         document.getElementById('materia-error').textContent = 'Erro ao carregar matérias.';
//     }
// }

// // Chama a função ao carregar a página
// window.onload = carregarMaterias;

// document.getElementById("createClassForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Evita recarregar a página

//     const titulo = document.getElementById("titulo").value;
//     const descricao = document.getElementById("descricao").value;
//     const materia = document.getElementById("materia").value;
//     const link = document.getElementById("link").value;
//     const data = document.getElementById("data").value;

    

//     // Simula a criação da aula
//     console.log("Aula criada:", { titulo, descricao, materia, data });

//     alert("Aula criada com sucesso!");

//     // Redireciona de volta para a página principal do monitor
//     window.location.href = "../home_monitor";
// });
