document.addEventListener('DOMContentLoaded', () => {
    // Função para obter os dados do lobo e preencher o formulário
    function pegarDados() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        if (!id) {
            alert('Nenhum ID de lobo foi fornecido na URL.');
            return;
        }

        fetch("http://127.0.0.1:5500/data/lobinhos.json")
            .then((resposta) => resposta.json())
            .then((lobinhos) => {
                const lobo = lobinhos.find(l => l.id == id);
                if (lobo) {
                    mudarDados(lobo.imagem, lobo.nome, lobo.id);
                } else {
                    alert('Lobo não encontrado.');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Função para atualizar os dados do lobo na página
    function mudarDados(imagem, nome, id) {
        const imagemL = document.querySelector(".lobo");
        const nomeL = document.querySelector(".h1");
        const idlob = document.querySelector(".h6");

        imagemL.src = imagem;
        nomeL.innerText = nome;
        idlob.innerText = id;
    }

    // Função para enviar os dados do formulário via requisição POST
    function enviarDados() {
        const nome = document.getElementById('input-nome').value;
        const idade = document.getElementById('input-idade').value;
        const email = document.getElementById('input-email').value;

        if (!nome || !idade || !email) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (!id) {
            alert('Nenhum ID de lobo foi fornecido na URL.');
            return;
        }

        const dados = {
            id: id, // Incluindo o ID no corpo da requisição, se necessário pela API
            nomeDono: nome,
            idadeDono: parseInt(idade, 10),
            emailDono: email
        };

        fetch('http://127.0.0.1:5500/api/lobinhos', {
            method: 'POST', // Usando POST para criar um novo recurso
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (response.ok) {
                alert('Lobo adotado com sucesso!');
                window.location.href = 'lista.html'; // Redirecionar após a adoção
            } else {
                alert('Erro ao adotar o lobo.');
            }
        })
        .catch(error => {
            console.log('Erro:', error);
            alert('Erro ao adotar o lobo.');
        });
    }

    // Adicionar o listener para o botão de adoção
    document.getElementById('adotar').addEventListener('click', enviarDados);

    // Chamar a função para preencher o formulário com dados do lobo
    pegarDados();
});
