import React, { useState, useEffect } from "react";

// Interface para os usuários do sistema
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  status: number;
  created: string;
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
      <h4 className="mt-4">Usuários do Sistema</h4>
      <hr />
      <div className="w-25">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de Cadastro</th>
            <th>Status</th>
            <th className="text-end">Enviar e-mail?</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .filter(
              (user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created}</td>
                <td>{user.status ? "Ativo" : "Inativo"}</td>
                <td className="text-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEmailClick(user)}
                  >
                    Enviar!
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
