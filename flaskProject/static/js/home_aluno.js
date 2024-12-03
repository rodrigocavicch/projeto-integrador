document.addEventListener("DOMContentLoaded", () => {
    const lessonList = document.getElementById("lessonList");
    const searchBar = document.getElementById("searchBar");
    const dateFilter = document.getElementById("dateFilter");
    let lessons = [];

    // Função para buscar aulas do backend
    async function fetchLessons() {
        try {
            const response = await fetch("/api/aulas");
            const data = await response.json();
            lessons = data; // Atualiza a lista de aulas com os dados do backend
            renderLessons(lessons);
        } catch (error) {
            console.error("Erro ao buscar aulas:", error);
        }
    }

    // Função para renderizar as aulas
    function renderLessons(aulas) {
        lessonList.innerHTML = ""; // Limpa o conteúdo atual
        aulas.forEach((aula) => {
            const lessonCard = document.createElement("div");
            lessonCard.className = "lesson-card";
            lessonCard.innerHTML = `
                <h2>${aula.titulo}</h2>
                <p><strong>Data:</strong> ${aula.horario.split(" ")[0]}</p>
                <p><strong>Horário:</strong> ${aula.horario.split(" ")[1]}</p>
                <p><strong>Matéria:</strong> ${aula.materia}</p>
                <p><strong>Monitor:</strong> ${aula.monitor}</p>
                <button class="access-button" onclick="window.location.href='../aula_aluno'">Ver Mais</button>
            `;
            lessonList.appendChild(lessonCard);
        });
    }

    // Função para filtrar as aulas com base na pesquisa e na data
    function filterLessons() {
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

    // Event listeners para filtros
    searchBar.addEventListener("input", filterLessons);
    dateFilter.addEventListener("input", filterLessons);

    // Inicializa a página buscando aulas
    fetchLessons();
});