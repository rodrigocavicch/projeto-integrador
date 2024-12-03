let user_id;
let lessons = []; // Declaração global para armazenar as aulas

// Função para carregar o ID do monitor
async function carregarIdAluno() {
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