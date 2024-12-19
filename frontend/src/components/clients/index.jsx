import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Client = ({ token }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/clients/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }

        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [token]);

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Client;