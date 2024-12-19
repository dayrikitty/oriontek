import React, { useEffect, useState } from "react";
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
const ClientManager = ({ token }) => {
  const [clients, setClients] = useState([]);

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

  return (
    <div>
      <ClientForm token={token} onClientAdded={fetchClients} />
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
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  {client.addresses.map((address, index) => (
                    <div key={index}>
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.postal_code}
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

export default ClientManager;
