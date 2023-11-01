document
  .getElementById("newsletter")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obter dados do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    // Limpar mensagens de erro
    document.getElementById("nomeError").textContent = "";
    document.getElementById("emailError").textContent = "";

    // Validar campo Nome
    if (!nome) {
      document.getElementById("nomeError").textContent =
        "Por favor informe seu nome.";
      document.getElementById("nome").focus();
      return;
    }

    // Validar campo Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      document.getElementById("emailError").textContent =
        "Por favor informe seu email.";
      document.getElementById("email").focus();
      return;
    } else if (!email.match(emailPattern)) {
      document.getElementById("emailError").textContent = "E-mail inválido.";
      document.getElementById("email").focus();
      return;
    }

    // Criar um objeto para enviar os dados do formulário para o endpoint /api/newsletter
    const formData = {
      name: nome,
      email: email,
    };

    // Faz o envio dos dados do formulário para o endpoint /api/user (Ajax)
    fetch("http://localhost/api/subscriber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // 200 OK
          document.getElementById("sendError").textContent =
            "Cadastro realizado com sucesso!";
          document.getElementById("nome").value = "";
          document.getElementById("email").value = "";
          document.getElementById("submit").disabled = true;
        } else {
          // Erro no servidor ou outro
          document.getElementById("emailError").textContent =
            "Ocorreu um erro, tente novamente...";
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro: ", error);
      });
  });
