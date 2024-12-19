import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

// eslint-disable-next-line react/prop-types
const ClientForm = ({ token, onClientAdded }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [addresses, setAddresses] = useState([{ street: "", city: "", state: "", postal_code: "" }]);

  const handleAddAddress = () => {
    setAddresses([...addresses, { street: "", city: "", state: "", postal_code: "" }]);
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/clients/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: clientName,
        email: clientEmail,
        addresses: addresses.filter(address => address.street), // Only send filled addresses
      }),
    });

    if (response.ok) {
      onClientAdded();
      setClientName("");
      setClientEmail("");
      setAddresses([{ street: "", city: "", state: "", postal_code: "" }]);
    } else {
      console.error("Failed to add client");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add New Client
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: "1rem" }}>
          <TextField
            label="Client Name"
            variant="outlined"
            fullWidth
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: "1rem" }}>
          <TextField
            label="Client Email"
            variant="outlined"
            fullWidth
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          Addresses
        </Typography>
        {addresses.map((address, index) => (
          <Box key={index} sx={{ marginBottom: "1rem" }}>
            <TextField
              label="Street"
              variant="outlined"
              fullWidth
              value={address.street}
              onChange={(e) => handleAddressChange(index, "street", e.target.value)}
              sx={{ marginBottom: "0.5rem" }}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={address.city}
              onChange={(e) => handleAddressChange(index, "city", e.target.value)}
              sx={{ marginBottom: "0.5rem" }}
            />
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              value={address.state}
              onChange={(e) => handleAddressChange(index, "state", e.target.value)}
              sx={{ marginBottom: "0.5rem" }}
            />
            <TextField
              label="Postal Code"
              variant="outlined"
              fullWidth
              value={address.postal_code}
              onChange={(e) => handleAddressChange(index, "postal_code", e.target.value)}
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={handleAddAddress} sx={{ marginBottom: "1rem" }}>
          Add Another Address
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Client
        </Button>
      </form>
    </Paper>
  );
};

export default ClientForm;