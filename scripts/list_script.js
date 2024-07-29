let lobos;
let adotados = false;
let num = 0;

const fetchConfig = {
    "method": "GET"
};

fetch("http://localhost:8080/data/lobinhos.json", fetchConfig)
    .then((resposta) => resposta.json())
    .then((dados) => {
        lobos = dados;
        num = atualizarLobos(adotados, num);
    })
    .catch((error) => {
        console.log("Erro ao buscar dados:", error);
    });

function atualizarLobos(status, number) {
    let lobosFiltrados;

    if (status) {
        lobosFiltrados = lobos.filter((lobo) => lobo.adotado);
    } else {
        lobosFiltrados = lobos.filter((lobo) => !lobo.adotado);
    }

    console.log(lobosFiltrados);

    for (let i = 0; i < 4; i++) {
        document.getElementById("imagem"+ i).src = lobosFiltrados[number + i].imagem;
        document.getElementById("nome"+ i).innerHTML = lobosFiltrados[number + i].nome;
        document.getElementById("idade"+ i).innerHTML = lobosFiltrados[number + i].idade;
        document.getElementById("desc"+ i).innerHTML = lobosFiltrados[number + i].descricao;
    }
    return number + 4
}

document.getElementById("next").onclick = function next(){
    num = atualizarLobos(adotados, num)
}
