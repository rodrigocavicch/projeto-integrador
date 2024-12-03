document.addEventListener("DOMContentLoaded", () => {
    const lessonList = document.getElementById("lessonList");

    // Função para buscar as aulas
    async function fetchLessons() {
        try {
            const response = await fetch("/api/minhas_aulas");
            if (!response.ok) {
                throw new Error("Erro ao buscar aulas");
            }
            const lessons = await response.json();
            renderLessons(lessons);
        } catch (error) {
            console.error("Erro ao buscar aulas:", error);
            lessonList.innerHTML = "<p>Erro ao carregar suas aulas.</p>";
        }
    }

    // Função para renderizar as aulas
    function renderLessons(lessons) {
        if (lessons.length === 0) {
            lessonList.innerHTML = "<p>Você ainda não está inscrito em nenhuma aula.</p>";
            return;
        }

        lessonList.innerHTML = lessons.map(lesson => `
            <div class="lesson-card">
                <h2>${lesson.titulo}</h2>
                <p><strong>Data:</strong> ${lesson.horario.split(' ')[0]}</p>
                <p><strong>Horário:</strong> ${lesson.horario.split(' ')[1]}</p>
                <p><strong>Matéria:</strong> ${lesson.materia || "N/A"}</p>
                <p><strong>Monitor:</strong> ${lesson.monitor || "N/A"}</p>
                <button class="access-button" onclick="window.location.href='/aula_aluno_inscrito?id=${lesson.id_aula}'">Acessar</button>
            </div>
        `).join('');
    }

    // Buscar aulas ao carregar a página
    fetchLessons();
});