document.addEventListener("DOMContentLoaded", async () => {
    const lessonList = document.getElementById("lessonList");

    try {
        // Busca aulas do monitor logado
        const response = await fetch("/api/aulas_monitor");
        if (!response.ok) {
            throw new Error("Erro ao buscar as aulas");
        }

        const aulas = await response.json();

        // Limpa a lista de aulas existente
        lessonList.innerHTML = "";

        // Adiciona cada aula à lista
        aulas.forEach((aula) => {
            const lessonCard = document.createElement("div");
            lessonCard.className = "lesson-card";

            lessonCard.innerHTML = `
                <h2>${aula.titulo}</h2>
                <p><strong>Descrição:</strong> ${aula.descricao}</p>
                <p><strong>Link:</strong> ${aula.link}</p>
                <p><strong>Data:</strong> ${aula.horario.split(" ")[0]}</p>
                <p><strong>Hora:</strong> ${aula.horario.split(" ")[1]}</p>
                <p><strong>Matéria:</strong> ${aula.materia}</p>
            `;

            lessonList.appendChild(lessonCard);
        });
    } catch (error) {
        console.error("Erro ao carregar as aulas:", error);
        lessonList.innerHTML = "<p>Erro ao carregar as aulas.</p>";
    }
});