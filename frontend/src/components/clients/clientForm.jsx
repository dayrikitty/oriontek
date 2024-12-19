/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ClientForm = ({
  token,
  onClientAdded,
  selectedClient,
  setSelectedClient,
}) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [addresses, setAddresses] = useState([{ street: "", city: "", postal_code: "" }]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedClient) {
      setClientName(selectedClient.name);
      setClientEmail(selectedClient.email);
      setAddresses(selectedClient.addresses);
      setIsOpen(true);
    }
  }, [selectedClient]);

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { street: "", city: "", postal_code: "" },
    ]);
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: clientName,
      email: clientEmail,
      addresses: addresses.filter((address) => address.street), // Only send filled addresses
    };

    let response;
    if (selectedClient) {
      // Update client
      response = await fetch(
        `http://localhost:8000/api/clients/${selectedClient.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
    } else {
      // Create new client
      response = await fetch("http://localhost:8000/api/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    }

    if (response.ok) {
      onClientAdded();
      handleReset();
    } else {
      console.error("Failed to save client");
    }
  };

  const handleReset = () => {
    setClientName("");
    setClientEmail("");
    setAddresses([{ street: "", city: "", postal_code: "" }]);
    setSelectedClient(null);
    setIsOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ marginBottom: "2rem", padding: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">
          {selectedClient ? "Update Client" : "Add New Client"}
        </Typography>
        <IconButton onClick={() => setIsOpen(!isOpen)}>
          <ExpandMoreIcon
            sx={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        </IconButton>
      </Box>
      <Collapse in={isOpen}>
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
                onChange={(e) =>
                  handleAddressChange(index, "street", e.target.value)
                }
                sx={{ marginBottom: "0.5rem" }}
              />
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={address.city}
                onChange={(e) =>
                  handleAddressChange(index, "city", e.target.value)
                }
                sx={{ marginBottom: "0.5rem" }}
              />
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                value={address.postal_code}
                onChange={(e) =>
                  handleAddressChange(index, "postal_code", e.target.value)
                }
              />
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={handleAddAddress}
            sx={{ marginBottom: "1rem" }}
          >
            Add Another Address
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {selectedClient ? "Update Client" : "Add Client"}
          </Button>
          {selectedClient && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleReset}
              sx={{ marginTop: "1rem" }}
            >
              Cancel
            </Button>
          )}
        </form>
      </Collapse>
    </Paper>
  );
};

export default ClientForm;
