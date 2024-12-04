let user_id;
let lessons = []; // Declaração global para armazenar as aulas

// Função para carregar o ID do monitor
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

// Função para inscrever-se em uma aula
async function inscreverAula(aulaId) {
    try {
        const response = await fetch("/api/inscrever_aula", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id_aula: aulaId })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Mostra mensagem de sucesso
            fetchLessons();
        } else {
            alert(data.message); // Mostra mensagem de erro
        }
    } catch (error) {
        console.error("Erro ao inscrever-se na aula:", error);
    }
}

function renderLessons(aulas) {
    const lessonList = document.getElementById("lessonList");
    lessonList.innerHTML = ""; // Limpa o conteúdo atual

    aulas.forEach((aula) => {
        const lessonCard = document.createElement("div");
        lessonCard.className = "lesson-card";

        lessonCard.innerHTML = `
            <h2>${aula.titulo}</h2>
            <h3><strong>Matéria:</strong> ${aula.materia}</h3>
            <p><strong>Descrição:</strong> ${aula.descricao}</p>
            <p><strong>Data:</strong> ${aula.horario.split(" ")[0]}</p>
            <p><strong>Horário:</strong> ${aula.horario.split(" ")[1]}</p>
            <a href="#" class="lesson-link" onclick="inscreverAula(${aula.id_aula})">Inscrever-se</a>
        `;

        lessonList.appendChild(lessonCard);
    });
}


// Função para buscar aulas do backend
async function fetchLessons() {
    try {
        const response = await fetch("/api/aulas_disponiveis", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(`Erro ao buscar aulas: ${response.statusText}`);
            return;
        }

        const data = await response.json();
        lessons = data; // Atualiza a lista de aulas com os dados do backend
        renderLessons(lessons); // Chama a função de renderização
    } catch (error) {
        console.error("Erro ao buscar aulas:", error);
    }
}

// Função para filtrar as aulas com base na pesquisa e na data
function filterLessons() {
    const searchBar = document.getElementById("searchBar");
    const dateFilter = document.getElementById("dateFilter");

    const searchText = searchBar.value.toLowerCase();
    const selectedDate = dateFilter.value; // Formato: YYYY-MM-DD

    const filteredLessons = lessons.filter((lesson) => {
        const title = lesson.titulo.toLowerCase();
        const formattedDate = lesson.horario.split(" ")[0].split("/").reverse().join("-");
        const matchesSearch = title.includes(searchText);
        const matchesDate = !selectedDate || formattedDate === selectedDate;
        return matchesSearch && matchesDate;
    });

    renderLessons(filteredLessons);
}

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const dateFilter = document.getElementById("dateFilter");

    // Event listeners para filtros
    searchBar.addEventListener("input", filterLessons);
    dateFilter.addEventListener("input", filterLessons);

    // Inicializa a página buscando aulas
    fetchLessons();
});

// Executa funções globais ao carregar a página
window.onload = carregarIdMonitor;
