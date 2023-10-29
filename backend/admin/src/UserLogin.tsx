import React, { useState, FormEvent, ChangeEvent } from "react";

const UserLogin: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const userData = { name, email, password };

      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/api/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (response.ok) {
          setApiResponse("Usuário criado com sucesso!");
          setName("");
          setEmail("");
          setPassword("");
        } else {
          setApiResponse("Erro ao criar usuário.");
        }
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError("");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const validateForm = () => {
    if (name.length < 3) {
      setNameError(NAME_ERROR_MESSAGE);
      document.getElementById("name")?.focus();
      return false;
    }

    if (email.trim() === "" || !isValidEmail(email)) {
      setEmailError(
        email.trim() === ""
          ? EMAIL_REQUIRED_ERROR_MESSAGE
          : EMAIL_INVALID_ERROR_MESSAGE
      );
      document.getElementById("email")?.focus();
      return false;
    }

    if (password.length < 3) {
      document.getElementById("password")?.focus();
      setPasswordError(PASSWORD_REQUIRED_ERROR_MESSAGE);
      return false;
    }

    return true;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const NAME_ERROR_MESSAGE = "Informe seu nome.";
  const EMAIL_REQUIRED_ERROR_MESSAGE = "Informe seu e-mail.";
  const EMAIL_INVALID_ERROR_MESSAGE = "E-mail inválido...";
  const PASSWORD_REQUIRED_ERROR_MESSAGE = "Informe a senha.";

  return (
    <div>
      <h2>Adicionar Usuário</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
          {nameError && <div style={{ color: "red" }}>{nameError}</div>}
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            autoComplete="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            autoComplete="new-password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        </div>
        <button type="submit">Adicionar</button>
        {apiResponse && <div style={{ color: "red" }}>{apiResponse}</div>}
      </form>
    </div>
  );
};

export default UserLogin;
