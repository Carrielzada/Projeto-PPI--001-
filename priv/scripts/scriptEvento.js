const formularioEvento = document.getElementById('formEvento');

// Cuidado para não chamar a função e sim atribuí-la ao método onsubmit
formularioEvento.onsubmit = validarFormulario;

function validarFormulario(evento) {
  if (formularioEvento.checkValidity()) {
    cadastrarEvento();
  } else {
    evento.preventDefault();
  }
}

function cadastrarEvento() {
  // Lógica de cadastro do evento
}