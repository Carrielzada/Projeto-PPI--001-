const formularioEvento = document.getElementById('formEvento');

// Cuidado para não chamar a função e sim atribuí-la ao método onsubmit
formularioEvento.onsubmit = validarFormulario;

function validarFormulario(evento) {
  if (formularioEvento.checkValidity()) {
    form.classList.remove('was-validated');
    cadastrarEvento();
  } else {
    form.classList.add('was-validated'); //diz para o bootstrap exibis as mensagens de validação
  }
evento.preventDefault(); //onsubmit deixa de ter o comportamento padrão
evento.stopPropagation(); //Outros interessados no evento de submissão não saberão q ele aconteceu

}

function cadastrarEvento() {
  // Lógica de cadastro do evento
}