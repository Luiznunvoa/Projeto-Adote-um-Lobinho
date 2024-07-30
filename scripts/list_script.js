let lobos, adotados = false, loboprocurado = false, num = 0, atual = 1;

// Realiza uma requisição GET para obter os dados dos lobos
fetch("http://localhost:8080/data/lobinhos.json")
    .then(res => res.json())  // Converte a resposta para JSON
    .then(dados => {
        lobos = dados;  // Armazena os dados dos lobos
        atualizarLobos();  // Atualiza a exibição dos lobos
    })
    .catch(error => console.log("Erro ao buscar dados:", error));  // Captura e exibe erros

// Função para atualizar a exibição dos lobos na página
function atualizarLobos() {
    // Filtra os lobos com base no status de adoção
    const lobosFiltrados = lobos.filter(lobo => lobo.adotado === adotados);
    console.log(lobosFiltrados);

    // Atualiza os elementos da página com os dados dos lobos filtrados
    for (let i = 0; i < 4; i++) {
        const lobo = lobosFiltrados[num + i];
        if (lobo) {
            document.getElementById(`imagem${i}`).src = lobo.imagem;
            document.getElementById(`nome${i}`).innerHTML = lobo.nome;
            document.getElementById(`idade${i}`).innerHTML = lobo.idade;
            document.getElementById(`desc${i}`).innerHTML = lobo.descricao;
            document.getElementById(`profile${i}`).style.visibility = "visible";

            // Define o comportamento do botão de status (adotar/adotado)
            document.getElementById(`status${i}`).onclick = function() {
                if (!lobo.adotado && !loboprocurado) {
                    localStorage.setItem('loboSelecionado', lobo.id);
                    console.log("Lobo selecionado ID:", lobo.id);
                    window.location.href = "show.html";
                } else if (!loboprocurado) {
                    console.log("Este lobo já foi adotado.");
                }
            };
        } else {
            // Limpa os campos se não houver mais lobos para exibir
            ['imagem', 'nome', 'idade', 'desc'].forEach(id => document.getElementById(`${id}${i}`).innerHTML = '');
            document.getElementById(`profile${i}`).style.visibility = "hidden";
        }
    }
}

// Função para atualizar os controles de navegação (página atual, próximo, anterior)
const atualizarControles = () => {
    document.getElementById("next").innerHTML = atual + 1;
    document.getElementById("actual").innerHTML = atual;
    document.getElementById("back").innerHTML = atual - 1;
};

// Evento para botão "next" (próxima página)
document.getElementById("next").onclick = () => {
    if (num + 4 < lobos.length) {
        num += 4;  // Avança para o próximo conjunto de lobos
        atual++;  // Incrementa o número da página atual
        atualizarControles();
        atualizarLobos();
    }
};

// Evento para botão "back" (página anterior)
document.getElementById("back").onclick = () => {
    if (num - 4 >= 0) {
        num -= 4;  // Volta para o conjunto anterior de lobos
        atual--;  // Decrementa o número da página atual
        atualizarControles();
        atualizarLobos();
    }
};

// Evento para checkbox de "adotados"
document.getElementById("checkbox-adotados").addEventListener("change", function() {
    adotados = this.checked;  // Atualiza o status de exibição (adotados/não adotados)
    num = 0;  // Reinicia o contador de lobos exibidos
    atual = 1;  // Reinicia a página atual
    loboprocurado = false;  // Reseta o estado de lobo procurado
    atualizarControles();

    // Atualiza o texto e a classe dos botões de status com base no estado de adoção
    for (let i = 0; i < 4; i++) {
        document.getElementById(`status${i}`).className = adotados ? 'adotados' : 'adotar';
        document.getElementById(`status${i}`).innerHTML = adotados ? 'Adotado' : 'Adotar';
        document.getElementById(`profile${i}`).style.visibility = "visible";  // Torna os perfis visíveis novamente
    }

    atualizarLobos();
});

// Evento para busca de lobos pelo nome
document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        const query = event.target.value.toLowerCase();  // Obtém o texto da busca em minúsculas
        const loboEncontrado = lobos.find(lobo => lobo.nome.toLowerCase() === query);  // Procura o lobo pelo nome

        if (loboEncontrado) {
            // Se o lobo for encontrado, exibe seus dados no primeiro perfil
            localStorage.setItem('loboSelecionado', loboEncontrado.id);
            document.getElementById("imagem0").src = loboEncontrado.imagem;
            document.getElementById("nome0").innerHTML = loboEncontrado.nome;
            document.getElementById("idade0").innerHTML = loboEncontrado.idade;
            document.getElementById("desc0").innerHTML = loboEncontrado.descricao;
            loboprocurado = true;

            // Esconde os outros perfis
            for (let i = 1; i < 4; i++) document.getElementById(`profile${i}`).style.visibility = "hidden";
            
            // Atualiza o botão de status do lobo encontrado
            const statusEl = document.getElementById("status0");
            statusEl.innerHTML = loboEncontrado.adotado ? 'Adotado' : 'Adotar';
            statusEl.className = loboEncontrado.adotado ? 'adotados' : 'adotar';
            if (!loboEncontrado.adotado) {
                statusEl.onclick = function() {
                    localStorage.setItem('loboSelecionado', loboEncontrado.id);
                    window.location.href = "show.html";
                };
            } else {
                statusEl.onclick = null;
            }
        } else {
            // Se não encontrar, esconde todos os perfis
            for (let i = 0; i < 4; i++) document.getElementById(`profile${i}`).style.visibility = "hidden";
        }
    }
});