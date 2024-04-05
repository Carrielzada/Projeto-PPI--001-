function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if (username === "vitor" && password === "123") {
      // Login bem-sucedido, redirecionar para a página desejada
      window.location.href = "/evento01.html";
    } else {
      // Login falhou, exibir mensagem de erro
      alert("Usuário ou senha inválidos.");
    }
  }