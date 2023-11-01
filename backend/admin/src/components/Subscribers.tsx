import React, { useState, useEffect } from "react";

// Interface para os assinantes da newsletter
interface Subscriber {
  id: number;
  name: string;
  email: string;
  created: string;
  status: number;
}

function Subscribers() {
  const [subscribers, setsubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredsubscribers, setFilteredsubscribers] = useState<Subscriber[]>(
    []
  );

  const fetchsubscribers = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/subscribers"
      );

      if (response.ok) {
        const subscriberData = await response.json();
        setsubscribers(subscriberData);
        setFilteredsubscribers(subscriberData);
      }
    } catch (error) {
      console.error("Error fetching newsletter subscribers:", error);
    }
  };

  useEffect(() => {
    fetchsubscribers();
  }, []);

  useEffect(() => {
    const filtered = subscribers.filter((subscriber) =>
      subscriber.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredsubscribers(filtered);
  }, [searchQuery, subscribers]);

  return (
    <div>
      <h4 className="mt-4">Assinantes da Newsletter</h4>
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
          {filteredsubscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td>{subscriber.id}</td>
              <td>{subscriber.name}</td>
              <td>{subscriber.email}</td>
              <td>{subscriber.created}</td>
              <td>{subscriber.status ? "Ativo" : "Inativo"}</td>
              <td className="text-end">
                <button className="btn btn-primary">Enviar!</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Subscribers;
