let orfaos;
let num1 = 1;

const fetchConfig = {
    "method": "GET"
};

fetch("http://localhost:8080/data/lobinhos.json", fetchConfig)
    .then((resposta) => resposta.json())
    .then((dados) => {
        orfaos = dados.filter((lobos) => !lobos.adotado);
        console.log(orfaos);

        criarPerfil(num1);

        let lobo = orfaos[num1].nome;
        let desc = orfaos[num1].descricao;
        let idade = orfaos[num1].idade;
        let imagem = orfaos[num1].imagem;

        document.getElementById("imagem1").src = imagem;
        document.getElementById("nome1").innerHTML = lobo;
        document.getElementById("idade1").innerHTML = idade;
        document.getElementById("desc1").innerHTML = desc;
    })
    .catch((error) => {
        console.log("Erro ao buscar dados:", error);
    });

function criarPerfil(numero) {
    // Definindo ids
    let imagemId = `imagem${numero}`;
    let nomeId = `nome${numero}`;
    let idadeId = `idade${numero}`;
    let descId = `desc${numero}`;

    // Criação da tag section de classe profile
    const novaperfil = document.createElement("section");
    novaperfil.classList.add('profile');

    // Criação da tag img
    const novaimagem = document.createElement("img");
    novaimagem.setAttribute("id", imagemId);

    // Adicionando imagem à seção
    novaperfil.appendChild(novaimagem);

    // Criação da tag div de classe desc
    const novadesc = document.createElement("div");
    novadesc.classList.add('desc');

    // Criação da tag h1
    const novotitulo = document.createElement("h1");
    novotitulo.setAttribute("id", nomeId);

    // Adicionando título à descrição
    novadesc.appendChild(novotitulo);

    // Criação da tag span
    const novospan = document.createElement("span");

    // Criação da tag p
    const novaidade = document.createElement("p");
    novaidade.setAttribute("id", idadeId);

    // Adicionando idade ao span
    novospan.appendChild(novaidade);

    // Adicionando span à descrição
    novadesc.appendChild(novospan);

    // Adicionando caixa de texto
    const novacaixadetexto = document.createElement("div");
    novacaixadetexto.classList.add('textbox');
    novacaixadetexto.setAttribute("id", descId);

    // Adicionando caixa de texto à descrição
    novadesc.appendChild(novacaixadetexto);

    // Adicionando descrição à seção
    novaperfil.appendChild(novadesc);

    const section = document.getElementById("list");
    section.appendChild(novaperfil);
}