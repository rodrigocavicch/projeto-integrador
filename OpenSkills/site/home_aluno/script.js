document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const dateFilter = document.getElementById("dateFilter");
    const lessonList = document.getElementById("lessonList");
    const lessons = Array.from(lessonList.getElementsByClassName("lesson-card"));

    // Função para formatar a data no formato padrão (YYYY-MM-DD)
    function formatDate(dateStr) {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    }

    // Função para filtrar as aulas com base na pesquisa e na data
    function filterLessons() {
        const searchText = searchBar.value.toLowerCase();
        const selectedDate = dateFilter.value; // Formato: YYYY-MM-DD

        lessons.forEach((lesson) => {
            const title = lesson.querySelector("h2").textContent.toLowerCase();
            const date = lesson.querySelector("p:nth-child(2)").textContent.replace("Data: ", ""); // Ex.: "20/11/2024"
            const formattedDate = formatDate(date); // Converte para YYYY-MM-DD

            const matchesSearch = title.includes(searchText);
            const matchesDate = !selectedDate || formattedDate === selectedDate;

            if (matchesSearch && matchesDate) {
                lesson.style.display = "block";
            } else {
                lesson.style.display = "none";
            }
        });
    }

    // Event listeners para atualizar a lista de aulas com base nos filtros e pesquisa
    searchBar.addEventListener("input", filterLessons);
    dateFilter.addEventListener("input", filterLessons);
});
