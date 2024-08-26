import './App.scss';
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/signin";
import Header from "./components/Header";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User Logged Out");
      })
      .catch((error) => {
        console.error("Logout error: ", error);
      });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        {user && <Header user={user} Logout={handleLogout} />}
        <div className="container mt-5">
          <Routes>
            <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/home" />} />
            <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
          </Routes>
        </div>
      </>
    </DndProvider>
  );
}

export default App;
