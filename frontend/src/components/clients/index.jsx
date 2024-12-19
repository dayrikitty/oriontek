import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ClientForm from "./clientForm";

// eslint-disable-next-line react/prop-types
const Client = ({ token }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchClients = async () => {
    const response = await fetch("http://localhost:8000/api/clients/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setClients(data);
    } else {
      console.error("Error fetching clients");
    }
  };

  useEffect(() => {
    fetchClients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleRowClick = (client) => {
    setSelectedClient(client);
  };

  return (
    <div>
      <ClientForm
        token={token}
        onClientAdded={fetchClients}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Addresses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.id}
                hover
                onClick={() => handleRowClick(client)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  {client.addresses.map((address, index) => (
                    <div key={index}>
                      {address.street}, {address.city}, {address.postal_code}
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Client;
