function getRandomNumber(max) {
   return Math.floor(Math.random() * max);
 }
 
 function getTwoDifferentRandomNumbers() {
   let num1 = getRandomNumber(1001);
   let num2 = getRandomNumber(1001);
 
   // Garantir que os dois números sejam diferentes
   while (num1 === num2) {
     num2 = getRandomNumber(1001);
   }
 
   return [num1, num2];
 }
 
 const [num1, num2] = getTwoDifferentRandomNumbers();


const fetchConfig = {
   "method": "GET"
}

fetch("http://localhost:8080/data/lobinhos.json", fetchConfig)
   .then((resposta)=>{
       resposta.json()
           .then((resposta)=>{
            let lobo1 = resposta[num1].nome;
            let desc1 = resposta[num1].descricao;
            let idade1 = resposta[num1].idade;
            let imagem1 = resposta[num1].imagem;

            let lobo2 = resposta[num2].nome;
            let desc2 = resposta[num2].descricao;
            let idade2 = resposta[num2].idade;
            let imagem2 = resposta[num2].imagem;

            console.log(`Lobo 1 nome: ${lobo1}, idade: ${idade1}, descricao: ${desc1}`)
            console.log(`Lobo 2 nome: ${lobo2}, idade: ${idade2}, descricao: ${desc2}`)
            document.getElementById("imagem1").src = imagem1;
            document.getElementById("nome1").innerHTML = lobo1;
            document.getElementById("idade1").innerHTML = idade1;
            document.getElementById("desc1").innerHTML = desc1;
            document.getElementById("imagem2").src = imagem2;
            document.getElementById("nome2").innerHTML = lobo2;
            document.getElementById("idade2").innerHTML = idade2;
            document.getElementById("desc2").innerHTML = desc2;
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