function mudarDados(imagem, nome, descricao) {
  const imagemL = document.querySelector(".lobo");
  const nomeL = document.querySelector(".roboto-h1");
  const descricaoL = document.querySelector(".resumo-lobo");

  imagemL.src = imagem;
  nomeL.innerText = nome;
  descricaoL.innerText = descricao;
}

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
              mudarDados(lobo.imagem, lobo.nome, lobo.descricao);
              
              /* Botão de adoção*/
              document.getElementById('adotar-button').addEventListener('click', () => {
                  window.location.href = `adocao.html?id=${id}`;
              });

              /* Botão de exclusão*/
              document.getElementById('excluir-button').addEventListener('click', () => {
                  if (confirm('Tem certeza de que deseja excluir este lobo?')) {
                      fetch(`http://127.0.0.1:5500/api/lobinhos/${id}`, {
                          method: 'DELETE',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ id: id })
                      })
                      .then(response => {
                          if (response.ok) {
                              alert('Lobo excluído com sucesso.');
                              window.location.href = 'lista.html';
                          } else {
                              alert('Erro ao excluir o lobo.');
                          }
                      })
                      .catch(error => {
                          console.log('Erro:', error);
                          alert('Erro ao excluir o lobo.');
                      });
                  }
              });

          } else {
              alert('Lobo não encontrado.');
          }
      })
      .catch((error) => {
          console.log(error);
      });
}

pegarDados();





