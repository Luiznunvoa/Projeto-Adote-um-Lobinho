let orfaos
let num1 = 1

const fetchConfig = {
   "method": "GET"
}

fetch("http://localhost:8080/data/lobinhos.json", fetchConfig)
   .then((resposta)=>{
       resposta.json()
           .then((resposta)=>{
            orfaos = resposta.filter((lobos)=>{
               return !lobos.adotado
            })
            console.log(orfaos)
           })
           .catch((error)=>{
               console.log("error 2")
               console.log(error)
           })
   })
   .catch((error)=>{
       console.log("error 1")
       console.log(error)
   })


function criarPerfil(numero, resposta){
    //definindo ids

    let imagem = `imagem${numero}`;
    let nome = `nome${numero}`;
    let idade = `idade${numero}`;
    let desc = `desc${numero}`;

    // Criação da tag section de classe profile

    const novaperfil = document.createElement("section");
    novaperfil.classList.add('profile');

    // Criação da tag img 

    const novaimagem = document.createElement("img");
    novaimagem.setAttribute("id",imagem)

    // Adicionando imagem a seçao

    novaperfil.appendChild(novaimagem);

    // Criação da tag div de classe desc

    const novadesc = document.createElement("div");
    novadesc.classList.add('desc');

    // Criação da tag h1

    const novotitulo = document.createElement("h1");
    novotitulo.setAttribute("id", nome)

    //Adicionando titulo a descrição

    novadesc.appendChild(novotitulo);

    // Criação da tag span

    const novospan = document.createElement("span");

    // Criação da tag p

    const novaidade = document.createElement("p");
    novotitulo.setAttribute("id", idade)

    //Adicionando idade ao span

    novaidade.appendChild(novospan);


    //Adicionando span a descrição

    novadesc.appendChild(novospan);

    //Adicionando caixa de texto

    const novacaixadetexto = document.createElement("div");
    novacaixadetexto.classList.add('textbox');
    novaimagem.setAttribute("id", desc)

    //Adicionando caixa de texto a descriçao

    novadesc.appendChild(novacaixadetexto);

    //Adicionando descrição a seção

    novaperfil.appendChild(novadesc);

    const section = document.getElementById("list");
    section.appendChild(novaperfil);

    return
}

criarPerfil(num1);

let lobo = orfaos[num1].nome;
let desc = orfaos[num1].descricao;
let idade = orfaos[num1].idade;
let imagem = orfaos[num1].imagem;

document.getElementById("imagem1").src = imagem;
document.getElementById("nome1").innerHTML = lobo;
document.getElementById("idade1").innerHTML = idade;
document.getElementById("desc1").innerHTML = desc;