document.getElementById("createClassForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const materia = document.getElementById("materia").value;
    const data = document.getElementById("data").value;

    // Simula a criação da aula
    console.log("Aula criada:", { titulo, descricao, materia, data });

    alert("Aula criada com sucesso!");

    // Redireciona de volta para a página principal do monitor
    window.location.href = "monitor_home.html";
});
