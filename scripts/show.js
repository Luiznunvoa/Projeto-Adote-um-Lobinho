let lobos;

        const fetchConfig = {
            method: "GET"
        };

        fetch("http://localhost:8080/data/lobinhos.json", fetchConfig)
            .then((resposta) => resposta.json())
            .then((dados) => {
                lobos = dados;
                atualizarImagemLobinho();
            })
            .catch((error) => {
                console.log("Erro ao buscar dados:", error);
            });

        function atualizarImagemLobinho() {
            const loboId = localStorage.getItem('loboSelecionado');

            if (loboId) {
                const loboImagem = lobos[loboId - 1].imagem;
                const loboNome = lobos[loboId - 1].nome;
                const loboDesc = lobos[loboId - 1].descricao;
                console.log(loboId);
                document.getElementById("lobinho-imagem").src = loboImagem;
                document.getElementById("lobinho-nome").innerHTML = loboNome;
                document.getElementById("lobinho-descricao").innerHTML = loboDesc;
            }
        }

        document.getElementById('adotar-button').addEventListener('click', () => {
            const loboId = localStorage.getItem('loboSelecionado');
            window.location.href = `adocao.html?id=${loboId}`;
        });

        document.getElementById('excluir-button').addEventListener('click', () => {
            localStorage.removeItem('loboSelecionado');
            const loboAtualId = document.getElementById('lobinho-nome').getAttribute('data-id');
            const novosLobos = lobos.filter(lobo => lobo.id != loboAtualId);

            if (novosLobos.length > 0) {
                const novoLobo = novosLobos[Math.floor(Math.random() * novosLobos.length)];
                localStorage.setItem('loboSelecionado', novoLobo.id);
                document.getElementById("lobinho-imagem").src = novoLobo.imagem;
                document.getElementById("lobinho-nome").innerHTML = novoLobo.nome;
                document.getElementById("lobinho-nome").setAttribute('data-id', novoLobo.id);
                document.getElementById("lobinho-descricao").innerHTML = novoLobo.descricao;
            } else {
                console.log("Não há mais lobos disponíveis.");
            }
        });


