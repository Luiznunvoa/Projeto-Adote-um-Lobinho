let lobos; // Variável para armazenar os dados dos lobos

// Configuração da requisição fetch
const fetchConfig = { method: "GET" };

// Faz a requisição para obter os dados dos lobos
fetch("http://localhost:5500/data/lobinhos.json", fetchConfig)
    .then(res => res.json()) // Converte a resposta para JSON
    .then(dados => {
        lobos = dados; // Armazena os dados dos lobos
        atualizarImagemLobinho(); // Atualiza a imagem do lobinho selecionado
    })
    .catch(error => console.log("Erro ao buscar dados:", error)); // Captura e exibe erros

// Função para atualizar a imagem do lobinho selecionado
function atualizarImagemLobinho() {
    const loboId = localStorage.getItem('loboSelecionado'); // Obtém o ID do lobinho selecionado

    if (loboId) {
        const lobo = lobos[loboId - 1]; // Obtém os dados do lobinho selecionado
        // Atualiza os elementos da página com os dados do lobinho
        document.getElementById("lobinho-imagem").src = lobo.imagem;
        document.getElementById("lobinho-nome").innerHTML = lobo.nome;
        document.getElementById("lobinho-descricao").innerHTML = lobo.descricao;
    }
}

// Evento de clique no botão de adoção
document.getElementById('adotar-button').addEventListener('click', () => {
    const loboId = localStorage.getItem('loboSelecionado'); // Obtém o ID do lobinho selecionado
    window.location.href = `adocao.html?id=${loboId}`; // Redireciona para a página de adoção com o ID do lobinho
});

// Evento de clique no botão de exclusão
document.getElementById('excluir-button').addEventListener('click', () => {
    localStorage.removeItem('loboSelecionado'); // Remove o lobinho selecionado do localStorage
    const loboAtualId = document.getElementById('lobinho-nome').getAttribute('data-id'); // Obtém o ID do lobinho atual
    const novosLobos = lobos.filter(lobo => lobo.id != loboAtualId); // Filtra os lobos excluindo o atual

    if (novosLobos.length > 0) {
        const novoLobo = novosLobos[Math.floor(Math.random() * novosLobos.length)]; // Seleciona um novo lobinho aleatoriamente
        // Atualiza o novo lobinho selecionado no localStorage e na página
        localStorage.setItem('loboSelecionado', novoLobo.id);
        document.getElementById("lobinho-imagem").src = novoLobo.imagem;
        document.getElementById("lobinho-nome").innerHTML = novoLobo.nome;
        document.getElementById("lobinho-nome").setAttribute('data-id', novoLobo.id);
        document.getElementById("lobinho-descricao").innerHTML = novoLobo.descricao;
    } else {
        console.log("Não há mais lobos disponíveis."); // Mensagem se não houver mais lobos
    }
});