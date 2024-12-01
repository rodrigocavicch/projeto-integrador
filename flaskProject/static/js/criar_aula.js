async function carregarMaterias() {
    try {
        // Fazendo a requisição GET ao endpoint do Flask
        const response = await fetch('/api/materias');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar matérias');
        }
        
        // Obtendo os dados em JSON
        const materias = await response.json();
        
        // Selecionando o dropdown
        const dropdown = document.getElementById('materia');
        console.log("materias");
        console.log(materias);
        // Preenchendo as opções no dropdown
        materias.forEach(materia => {
            const option = document.createElement('option');
            option.value = materia.id_materia;  // Define o value como id_materia
            option.textContent = materia.nome_materia; // Define o texto como nome_materia
            dropdown.appendChild(option); // Adiciona a opção ao dropdown
        });
    } catch (error) {
        console.error(error);
        document.getElementById('materia-error').textContent = 'Erro ao carregar matérias.';
    }
}

// Chama a função ao carregar a página
window.onload = carregarMaterias;

document.getElementById("createClassForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const materia = document.getElementById("materia").value;
    const link = document.getElementById("link").value;
    const data = document.getElementById("data").value;

    

    // Simula a criação da aula
    console.log("Aula criada:", { titulo, descricao, materia, data });

    alert("Aula criada com sucesso!");

    // Redireciona de volta para a página principal do monitor
    window.location.href = "../home_monitor";
});
