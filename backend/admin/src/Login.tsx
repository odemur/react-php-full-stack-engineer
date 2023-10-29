import React, { useState, useEffect, FormEvent } from "react";
import Users from "./Users";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
          <h2>Login</h2>
          <form onSubmit={handleLogin} noValidate>
            <div>
              <label>E-mail:</label>
              <input
                type="text"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                autoComplete="current-password"
                id="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </form>
        </div>
      ) : (
        <Users />
      )}
    </div>
  );
};

export default Login;