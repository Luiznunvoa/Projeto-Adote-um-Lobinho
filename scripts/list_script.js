let lobos;
let adotados = false;
let num = 0;
let actual = 1;

const fetchConfig = {
    method: "GET"
};

//fetch("http://localhost:5500/data/lobinhos.json", fetchConfig)
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

            // Adicionar evento onclick para salvar no localStorage
            document.getElementById("status" + i).onclick = function() {
                localStorage.setItem('loboSelecionado', lobosFiltrados[number + i].id);
                console.log("Lobo selecionado ID:", lobosFiltrados[number + i].id);
            };
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
    for (let i = 0; i < 4; i++) {
        document.getElementById("profile" + i).style.visibility = "visible"; 
    }
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

document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        const query = event.target.value.toLowerCase();
        const loboEncontrado = lobos.find(lobo => lobo.nome.toLowerCase() === query);

        if (loboEncontrado) {
            document.getElementById("imagem0").src = loboEncontrado.imagem;
            document.getElementById("nome0").innerHTML = loboEncontrado.nome;
            document.getElementById("idade0").innerHTML = loboEncontrado.idade;
            document.getElementById("desc0").innerHTML = loboEncontrado.descricao;

            // Esconde os outros lobos
            for (let i = 1; i < 4; i++) {
                document.getElementById("profile" + i).setAttribute("style", "visibility: hidden;"); 
            }
        } else {
            // Se não encontrar, limpe os campos
            for (let i = 0; i < 4; i++) {
                document.getElementById("profile" + i).setAttribute("style", "visibility: hidden;"); 
            }
        }
        
    }
});