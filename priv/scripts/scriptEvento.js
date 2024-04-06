const formularioEvento = document.getElementById('formEvento');

// Cuidado para não chamar a função e sim atribuí-la ao método onsubmit
formularioEvento.onsubmit = validarFormulario;

function validarFormulario(evento) {
  if (formularioEvento.checkValidity()) {
    formularioEvento.classList.remove('was-validated');
    const artista = document.getElementById("artista").value;
    const endereco = document.getElementById("endereco").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const preco = document.getElementById("preco").value;
    const qntdingresso = document.getElementById("qntdingresso").value;

    const evento = {artista, endereco, cidade, estado, preco, qntdingresso};
    cadastrarEvento(evento);
  } else {
    formularioEvento.classList.add('was-validated'); //diz para o bootstrap exibis as mensagens de validação
  }
evento.preventDefault(); //onsubmit deixa de ter o comportamento padrão
evento.stopPropagation(); //Outros interessados no evento de submissão não saberão q ele aconteceu

}

function cadastrarEvento(evento) {
  // Lembrando que o nosso backend responde requisições HTTP - GET/POST/PUT/PATCH/DELETE
  // FETCH API para fazer requisições em HTTP
  fetch('http://localhost:3000/evento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(evento)
  }).then((resposta) => {
    return resposta.json();
  })
  .then((dados)=> {
    if (dados.status){ //incluiu corretamente o evento no backend
        mostrarMensagem(dados.mensagem, true);
    }
    else{
        mostrarMensagem(dados.mensagem, false);
    }
  }).catch((erro)=>{
      mostrarMensagem(erro.message, false);
  });
}

function mostrarMensagem(mensagem, erro = false){
  const divMensagem = document.getElementById('mensagem');
  if (sucesso){
      divMensagem.innerHTML=`
      <div class="alert alert-sucess" role="alert">
      ${mensagem}
      </div>
      `; //String literals
  }
  else{
      divMensagem.innerHTML = `
      <div class="alert alert-danger" role="alert">
      ${mensagem}
    </div>
    `;
  }
  setTimeout(()=>{
    divMensagem.innerHTML = ''
  }, 5000);
}