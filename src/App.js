import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoginForm from './LoginForm';
import WelcomePage from './WelcomePage';
import { ThemeProvider } from './ThemeContext'; // Path to your ThemeContext


function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Router>
          <ThemeProvider>

      <Routes>
        <Route path="/" element={<LoginForm user={user} setUser={setUser} />} />
        <Route path="/welcome" element={<WelcomePage user={user} setUser={setUser} />} />
      </Routes>
      </ThemeProvider>

    </Router>
  );
}

export default App;
