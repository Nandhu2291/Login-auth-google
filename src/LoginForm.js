import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button, Card, CardContent, Typography, CardActions, TextField, CircularProgress, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password should be at least 6 characters").required("Password is required"),
});

function LoginForm({ user, setUser }) {
  const [loading, setLoading] = useState(false); // Track loading state
  const [themeColor, setThemeColor] = useState("#1976d2"); // State to store selected theme color
  const [openMenu, setOpenMenu] = useState(false); // To manage the opening of the theme menu
  const [darkMode, setDarkMode] = useState(false); // State to toggle between light and dark mode
  const [isRegistering, setIsRegistering] = useState(false); // To toggle between Login and Register
  const navigate = useNavigate();

  // Function for Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      navigate("/welcome");
    } catch (error) {
      console.error("Error logging in with Google: ", error.message);
      setLoading(false);
    }
  };

  // Function for email/password login
  const handleEmailLogin = async (values, { setErrors }) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setUser(user);
      navigate("/welcome", { state: { themeColor } });
    } catch (error) {
      console.error("Error logging in with email: ", error.message);
      setErrors({ password: "Incorrect email or password" }); // Display error in the form
      setLoading(false);
    }
  };

  // Function for email/password registration
  const handleEmailRegister = async (values, { setErrors }) => {
    setLoading(true);
    try {
      const { email, password } = values;
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      setUser(user);
      navigate("/welcome", { state: { themeColor } });
    } catch (error) {
      console.error("Error registering with email: ", error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrors({
          email: "User already exists, try logging in", // Custom error message
        });
      } else {
        setErrors({
          email: error.message, // General error message
        });
      }
      setLoading(false);
    }
  };
  

  // Toggle between login and registration
  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: darkMode
          ? "linear-gradient(135deg, #333, #555)"
          : `linear-gradient(135deg, ${themeColor}, #fff)`,
        color: darkMode ? "#fff" : "#000",
        transition: "background 0.3s ease",
      }}
    >
      <Button
        variant="contained"
        onClick={() => setOpenMenu(!openMenu)}
        sx={{ position: "absolute", top: 20, left: 20, zIndex: 10, backgroundColor: themeColor }}
      >
        Theme
      </Button>

      <Drawer anchor="left" open={openMenu} onClose={() => setOpenMenu(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button onClick={() => setThemeColor("#1976d2")}>
            <ListItemText primary="Blue" />
            <div style={{ width: 20, height: 20, backgroundColor: "#1976d2", borderRadius: "4px" }} />
          </ListItem>
          <ListItem button onClick={() => setThemeColor("#e91e63")}>
            <ListItemText primary="Pink" />
            <div style={{ width: 20, height: 20, backgroundColor: "#e91e63", borderRadius: "4px" }} />
          </ListItem>
          <ListItem button onClick={() => setThemeColor("#4caf50")}>
            <ListItemText primary="Green" />
            <div style={{ width: 20, height: 20, backgroundColor: "#4caf50", borderRadius: "4px" }} />
          </ListItem>
          <ListItem button onClick={() => setThemeColor("#9c27b0")}>
            <ListItemText primary="Purple" />
            <div style={{ width: 20, height: 20, backgroundColor: "#9c27b0", borderRadius: "4px" }} />
          </ListItem>
          <ListItem button onClick={() => setThemeColor("#ff9800")}>
            <ListItemText primary="Orange" />
            <div style={{ width: 20, height: 20, backgroundColor: "#ff9800", borderRadius: "4px" }} />
          </ListItem>
          <ListItem button onClick={() => setThemeColor("#FF0000")}>
            <ListItemText primary="Red" />
            <div style={{ width: 20, height: 20, backgroundColor: "#FF0000", borderRadius: "4px" }} />
          </ListItem>
          <ListItem button onClick={() => setThemeColor("#FFFF00")}>
            <ListItemText primary="Yellow" />
            <div style={{ width: 20, height: 20, backgroundColor: "#FFFF00", borderRadius: "4px" }} />
          </ListItem>
          <ListItem button onClick={() => setThemeColor("#000000")}>
            <ListItemText primary="Black" />
            <div style={{ width: 20, height: 20, backgroundColor: "#000000", borderRadius: "4px" }} />
          </ListItem>
        </List>
      </Drawer>

      {!user ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={isRegistering ? handleEmailRegister : handleEmailLogin}
        >
          {({ values, handleChange, handleSubmit, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Card
                sx={{
                  maxWidth: 400,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: "white",
                  padding: 3,
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", marginBottom: 2 }}>
                    {isRegistering ? "Register" : "Login"}
                  </Typography>

                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </CardContent>

                <CardActions>
                  <Button
                    size="medium"
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ backgroundColor: themeColor }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : isRegistering ? "Register" : "Login"}
                  </Button>
                </CardActions>

                <CardActions>
                  <Button
                    variant="outlined"
                    sx={{ color: themeColor }}
                    fullWidth
                    onClick={handleGoogleLogin}
                    startIcon={<GoogleIcon />}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Login with Google"}
                  </Button>
                </CardActions>

                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="text"
                    onClick={toggleRegister}
                    sx={{ textTransform: "none", color: themeColor }}
                  >
                    {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
                  </Button>
                </CardActions>
              </Card>
            </Form>
          )}
        </Formik>
      ) : (
        <Card
          sx={{
            maxWidth: 400,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            padding: 3,
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Welcome, {user.displayName || "User"}!
            </Typography>
            <Typography variant="body2" gutterBottom>
              You are logged in.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              sx={{ backgroundColor: themeColor }}
              fullWidth
              onClick={() => {
                auth.signOut();
                setUser(null);
              }}
            >
              Logout
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}

export default LoginForm;