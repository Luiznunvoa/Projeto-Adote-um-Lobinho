// Função para obter um número aleatório entre 0 e max-1
const getRandomNumber = max => Math.floor(Math.random() * max);

// Função para obter dois números aleatórios diferentes entre 0 e 1000
const getTwoDifferentRandomNumbers = () => {
    let num1 = getRandomNumber(1001);
    let num2;
    do {
        num2 = getRandomNumber(1001);
    } while (num1 === num2);
    return [num1, num2];
};

// Obtém dois números aleatórios diferentes
const [num1, num2] = getTwoDifferentRandomNumbers();

// Configuração da requisição fetch
const fetchConfig = { method: "GET" };

// Requisição para obter os dados dos lobos
fetch("http://localhost:8080/data/lobinhos.json", fetchConfig)
    .then(res => res.json())
    .then(data => {
        // Obtém os dados dos lobos usando os números aleatórios
        const lobo1 = data[num1];
        const lobo2 = data[num2];

        // Atualiza os elementos da página com os dados dos lobos
        document.getElementById("imagem1").src = lobo1.imagem;
        document.getElementById("nome1").innerHTML = lobo1.nome;
        document.getElementById("idade1").innerHTML = lobo1.idade;
        document.getElementById("desc1").innerHTML = lobo1.descricao;

        document.getElementById("imagem2").src = lobo2.imagem;
        document.getElementById("nome2").innerHTML = lobo2.nome;
        document.getElementById("idade2").innerHTML = lobo2.idade;
        document.getElementById("desc2").innerHTML = lobo2.descricao;

        // Exibe os dados dos lobos no console
        console.log(`Lobo 1 nome: ${lobo1.nome}, idade: ${lobo1.idade}, descrição: ${lobo1.descricao}`);
        console.log(`Lobo 2 nome: ${lobo2.nome}, idade: ${lobo2.idade}, descrição: ${lobo2.descricao}`);
    })
    .catch(error => {
        console.log("Erro ao buscar dados:", error);
    });