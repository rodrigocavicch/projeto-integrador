let user_id;

// Função para carregar o ID do monitor
async function carregarIdMonitor() {
    try {
        const response = await fetch('/api/session');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da sessão');
        }

        const sessionData = await response.json();
        user_id = sessionData.user_id;
        user_name = sessionData.user_name;

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
// Função para carregar o e-mail do usuário
async function carregarEmailUsuario() {
    try {
        // Faz a requisição para obter o e-mail do usuário
        const response = await fetch('/api/get_user_email');
        if (!response.ok) {
            throw new Error('Erro ao buscar o e-mail do usuário');
        }

        const emailData = await response.json();

        // Verifica se houve erro no dado retornado
        if (emailData.error) {
            console.error(emailData.error);
            document.getElementById('email').innerHTML = 'E-mail não encontrado';
            return;
        }

        // Exibe o e-mail no elemento HTML
        document.getElementById('email').textContent = emailData.email;
    } catch (error) {
        console.error('Erro ao carregar e-mail do usuário:', error);
        document.getElementById('email').textContent = 'Erro ao carregar o e-mail.';
    }
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEmailUsuario);
window.onload = carregarIdMonitor;