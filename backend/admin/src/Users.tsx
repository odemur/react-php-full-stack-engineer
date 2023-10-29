import React, { useState, useEffect } from "react";

// Interface para objeto User (Usuário)
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  status: number;
  last_login: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  function handleEmailClick(user: User) {
    sendEmail(user.id, user.name, user.email);
  }

  // Enviar email para o back-end
  function sendEmail(id: number, name: string, email: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, email }),
    };

    fetch(process.env.REACT_APP_API_URL + "/api/sendmail", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  // Listar usuários cadastrados no back-end
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/users"
      );

      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
        setFilteredUsers(userData);
      }
    } catch (error) {
      console.error("Erro ao obter usuários cadastrados:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredUsers
          .filter(
            (user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}{" "}
              <button onClick={() => handleEmailClick(user)}>Enviar</button>
            </li>
          ))}
      </ul>
      {/* add Bootstrap  */}
    </div>
  );
}

export default Users;
