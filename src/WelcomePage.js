import React, { useEffect } from "react";
import { Button, Card, CardContent, Typography, CardActionArea, CardActions } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to get passed state

function WelcomePage({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get location to retrieve passed state
  const themeColor = location.state?.themeColor || "#1976d2"; // Default to blue if not provided

  useEffect(() => {
    if (!user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/"); 
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          padding: 3,
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", marginBottom: 2 }}>
              Welcome, {user.displayName}!
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
              Email: {user.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleLogout}
            sx={{ backgroundColor: themeColor }} // Apply themeColor here
          >
            Logout
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default WelcomePage;
