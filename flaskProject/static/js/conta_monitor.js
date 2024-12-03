// Função para lidar com o logout
function handleLogout(event) {
    event.preventDefault(); // Previne o comportamento padrão do botão de submit

    // Envia a requisição de logout para o servidor
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Redireciona o usuário para a página inicial ("/") após o logout
            window.location.href = '/';
        } else {
            alert('Erro ao fazer logout. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro na solicitação de logout:', error);
        alert('Erro ao se comunicar com o servidor.');
    });
}

// Adiciona um evento de clique ao botão de logout
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});
