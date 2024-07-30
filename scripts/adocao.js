function mudarDados(imagem, nome, id) {
    document.querySelector(".lobo").src = imagem; 
    document.querySelector(".h1").innerText = nome; 
    document.querySelector(".h6").innerText = id; 
}


function publicar() {
    let nomeDono = document.querySelector(".input-nome").value;
    let idadeDono = document.querySelector(".input-idade").value;
    let emailDono = document.querySelector(".input-email").value;


    let corpo = {
        "nomeDono": nomeDono,
        "idadeDono": parseInt(idadeDono, 10),
        "emailDono": emailDono
    }

 
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(corpo),
        headers: {
            "Content-Type": "application/json"
        }
    }


    fetch("http://localhost:5500//api/lobinhos", fetchConfig) 
        .then(resposta => resposta.json()) 
        .then(dados => {
            console.log(dados);
            alert('Lobo adicionado à adoção com sucesso!'); 
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao adicionar lobo à adoção.'); 
        });
}


function pegarDados() {
    const urlParams = new URLSearchParams(window.location.search); 
    const id = urlParams.get('id'); 
    
    if (!id) {
        alert('Nenhum ID de lobo foi fornecido na URL.'); 
        return;
    }

    
    fetch("http://localhost:5500/data/lobinhos.json")
        .then(resposta => resposta.json()) 
        .then(lobinhos => {
            const lobo = lobinhos.find(l => l.id == id); 
            if (lobo) {
                mudarDados(lobo.imagem, lobo.nome, lobo.id); 

                document.getElementById('adotar').addEventListener('click', () => {
                    
                    const nome = document.getElementById('input-nome').value;
                    const idade = document.getElementById('input-idade').value;
                    const email = document.getElementById('input-email').value;

                    if (nome && idade && email) {
                        publicar(); 
                    } else {
                        alert("Preencha todos os campos antes de adotar o lobinho."); 
                    }
                });

            } else {
                alert('Lobo não encontrado.'); 
            }
        })
        .catch(error => {
            console.log(error);
        });
}

pegarDados();