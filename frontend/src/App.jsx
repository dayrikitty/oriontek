import { useState } from "react";

import { CssBaseline, Box } from "@mui/material";
import Login from "./components/login";
import Client from "./components/clients";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <>
      <CssBaseline /> {/* Ensures consistent baseline styling */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Full height
          width: "100vw", // Full width
          backgroundColor: "#f4f6f8", // Optional background color
        }}
      >
        {!token ? <Login setToken={setToken} /> : <Client token={token} />}
      </Box>
    </>
  );
};

export default App;
