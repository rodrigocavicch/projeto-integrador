// Função para abrir o modal
function abrirModal() {
    const modal = document.getElementById("evaluationModal");
    modal.style.display = "block";
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById("evaluationModal");
    modal.style.display = "none";
}

// Fechar o modal ao clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById("evaluationModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Enviar avaliação
document.getElementById("evaluationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    alert(`Avaliação enviada com sucesso!\nNota: ${rating}\nComentário: ${comment}`);

    // Fecha o modal após enviar a avaliação
    fecharModal();
});
