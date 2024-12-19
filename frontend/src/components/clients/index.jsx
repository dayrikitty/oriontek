import { useEffect, useState } from "react";
import ClientForm from "./clientForm";
// eslint-disable-next-line react/prop-types
const Client = ({ token }) => {
  const [clients, setClients] = useState([]);

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

  useEffect(() => {
    fetchClients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      <ClientForm token={token} onClientAdded={fetchClients} />
      <h1>Clients</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} ({client.email})
            <ul>
              {client.addresses.map((address, index) => (
                <li key={index}>
                  {address.street}, {address.city}, {address.state},{" "}
                  {address.postal_code}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Client;