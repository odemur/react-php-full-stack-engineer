import React, { useState, FormEvent, useContext } from "react";
import { AuthContext } from "./AuthContext";
import Tabs from "./Tabs";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [error, setError] = useState<string>("");

  // Login, enviando email e senha para o back-end
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setError("Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h3>Login</h3>
          <form onSubmit={handleLogin} noValidate>
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                autoComplete="email"
                placeholder="Informe seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Informe seu e-mail:</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                autoComplete="current-password"
                placeholder="Informe uma senha"
                id="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingInput">Informe uma senha:</label>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
          </form>
        </div>
      ) : (
        <Tabs />
      )}
    </div>
  );
};

export default Login;
