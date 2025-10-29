import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./component/UserContext";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import CreateUser from "./pages/CreateUser";
import Navbar from "./component/Navbar";

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/create" element={<CreateUser />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
