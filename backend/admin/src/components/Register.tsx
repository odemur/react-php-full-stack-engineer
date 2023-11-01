import React, { useState, FormEvent, ChangeEvent } from "react";

const Register: React.FC = () => {
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

  const NAME_ERROR_MESSAGE = "Nome deve ser prenchido...";
  const EMAIL_REQUIRED_ERROR_MESSAGE = "E-mail não pode ser vazio...";
  const EMAIL_INVALID_ERROR_MESSAGE = "E-mail inválido...";
  const PASSWORD_REQUIRED_ERROR_MESSAGE = "Você deve informar uma senha.";

  return (
    <div>
      <h3>Adicionar Usuário</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-floating mb-4">
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Informe seu nome"
            value={name}
            onChange={handleNameChange}
          />
          <label>Informe seu nome:</label>
          {nameError && <div style={{ color: "red" }}>{nameError}</div>}
        </div>
        <div className="form-floating mb-4">
          <input
            type="email"
            autoComplete="email"
            id="email"
            className="form-control"
            placeholder="Informe seu e-mail"
            value={email}
            onChange={handleEmailChange}
          />
          <label>Informe seu e-mail:</label>
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
        </div>
        <div className="form-floating mb-4">
          <input
            type="password"
            autoComplete="new-password"
            id="password"
            className="form-control"
            placeholder="Informe uma senha"
            value={password}
            onChange={handlePasswordChange}
          />
          <label>Informe uma senha:</label>
          {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        </div>
        <div className="form-floating mb-4">
          <button type="submit" className="btn btn-primary">
            Adicionar
          </button>
          {apiResponse && <div style={{ color: "red" }}>{apiResponse}</div>}
        </div>
      </form>
    </div>
  );
};

export default Register;
