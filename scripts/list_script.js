let lobos;
let adotados = false;
let num = 0;
let actual = 1;

const fetchConfig = {
    method: "GET"
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
        if (lobosFiltrados[number + i]) {
            document.getElementById("imagem" + i).src = lobosFiltrados[number + i].imagem;
            document.getElementById("nome" + i).innerHTML = lobosFiltrados[number + i].nome;
            document.getElementById("idade" + i).innerHTML = lobosFiltrados[number + i].idade;
            document.getElementById("desc" + i).innerHTML = lobosFiltrados[number + i].descricao;
        } else {
            document.getElementById("imagem" + i).src = '';
            document.getElementById("nome" + i).innerHTML = '';
            document.getElementById("idade" + i).innerHTML = '';
            document.getElementById("desc" + i).innerHTML = '';
        }
    }
    return number;
}

document.getElementById("next").onclick = function next() {
    if (num + 4 < lobos.length) {
        actual += 1;
        num += 4;
        document.getElementById("next").innerHTML = actual + 1;
        document.getElementById("actual").innerHTML = actual;
        document.getElementById("back").innerHTML = actual - 1;
        atualizarLobos(adotados, num);
    }
};

document.getElementById("back").onclick = function back() {
    if (num - 4 >= 0) {
        actual -= 1;
        num -= 4;
        document.getElementById("next").innerHTML = actual + 1;
        document.getElementById("actual").innerHTML = actual;
        document.getElementById("back").innerHTML = actual - 1;
        atualizarLobos(adotados, num);
    }
};

document.getElementById("checkbox-adotados").addEventListener("change", function() {
    adotados = this.checked;
    num = 0; // Reinicia o contador para começar do início da nova lista
    actual = 1; // Reinicia a página atual
    document.getElementById("next").innerHTML = actual + 1;
    document.getElementById("actual").innerHTML = actual;
    document.getElementById("back").innerHTML = actual - 1;
    if(adotados){
        for(let i = 0; i < 4; i++){
            document.getElementById("status" + i).className = "adotados";
            document.getElementById("status" + i).innerHTML = "Adotado";
        }
    }
    else{
        for(let i = 0; i < 4; i++){
            document.getElementById("status" + i).className = "adotar";
            document.getElementById("status" + i).innerHTML = "Adotar";
        }
    }
    atualizarLobos(adotados, num);
});