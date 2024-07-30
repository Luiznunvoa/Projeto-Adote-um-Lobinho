// Função para atualizar os dados do lobo na página
function mudarDados(imagem, nome, id) {
    document.querySelector(".lobo").src = imagem; // Atualiza a imagem do lobo
    document.querySelector(".h1").innerText = nome; // Atualiza o nome do lobo
    document.querySelector(".h6").innerText = id; // Atualiza o ID do lobo
}

// Função para enviar os dados de adoção
function publicar() {
    // Coleta os valores dos campos de entrada do formulário
    let nomeDono = document.querySelector(".input-nome").value;
    let idadeDono = document.querySelector(".input-idade").value;
    let emailDono = document.querySelector(".input-email").value;

    // Cria o corpo da requisição com os dados do dono
    let corpo = {
        "nomeDono": nomeDono,
        "idadeDono": parseInt(idadeDono, 10),
        "emailDono": emailDono
    }

    // Configuração da requisição fetch para envio dos dados
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(corpo),
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Envia os dados do dono para o servidor
    fetch("http://localhost:8080//api/lobinhos", fetchConfig) // Endpoint de exemplo
        .then(resposta => resposta.json()) // Converte a resposta para JSON
        .then(dados => {
            console.log(dados);
            alert('Lobo adicionado à adoção com sucesso!'); // Alerta de sucesso
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao adicionar lobo à adoção.'); // Alerta de erro
        });
}

// Função para obter os dados do lobo da URL e exibi-los na página
function pegarDados() {
    const urlParams = new URLSearchParams(window.location.search); // Obtém os parâmetros da URL
    const id = urlParams.get('id'); // Obtém o ID do lobo da URL
    
    if (!id) {
        alert('Nenhum ID de lobo foi fornecido na URL.'); // Alerta se não houver ID na URL
        return;
    }

    // Faz a requisição para obter os dados dos lobinhos
    fetch("http://localhost:8080/data/lobinhos.json")
        .then(resposta => resposta.json()) // Converte a resposta para JSON
        .then(lobinhos => {
            const lobo = lobinhos.find(l => l.id == id); // Encontra o lobo pelo ID
            if (lobo) {
                mudarDados(lobo.imagem, lobo.nome, lobo.id); // Atualiza os dados do lobo na página

                // Adiciona um evento de clique ao botão de adoção
                document.getElementById('adotar').addEventListener('click', () => {
                    // Verificação de campos preenchidos
                    const nome = document.getElementById('input-nome').value;
                    const idade = document.getElementById('input-idade').value;
                    const email = document.getElementById('input-email').value;

                    if (nome && idade && email) {
                        publicar(); // Envia os dados se todos os campos estiverem preenchidos
                    } else {
                        alert("Preencha todos os campos antes de adotar o lobinho."); // Alerta se algum campo estiver vazio
                    }
                });

            } else {
                alert('Lobo não encontrado.'); // Alerta se o lobo não for encontrado
            }
        })
        .catch(error => {
            console.log(error);
        });
}
// Chama a função para pegar os dados ao carregar a página
pegarDados();