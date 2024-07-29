let lobos;
let adotados = false;

const fetchConfig = {
    "method": "GET"
};

fetch("http://localhost:8080/data/lobinhos.json", fetchConfig)
    .then((resposta) => resposta.json())
    .then((dados) => {
        lobos = dados;
        adotados = atualizarLobos(adotados);
    })
    .catch((error) => {
        console.log("Erro ao buscar dados:", error);
    });

function atualizarLobos(status) {
    let lobosFiltrados;

    if (status) {
        lobosFiltrados = lobos.filter((lobo) => lobo.adotado);
    } else {
        lobosFiltrados = lobos.filter((lobo) => !lobo.adotado);
    }

    console.log(lobosFiltrados);

    for (let i = 0; i < 4; i++) {
        console.log(i)

        document.getElementById("imagem"+ i).src = lobosFiltrados[i].imagem;
        document.getElementById("nome"+ i).innerHTML = lobosFiltrados[i].nome;
        document.getElementById("idade"+ i).innerHTML = lobosFiltrados[i].idade;
        document.getElementById("desc"+ i).innerHTML = lobosFiltrados[i].descricao;
    }
}