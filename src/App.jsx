import React from "react";

import { Route, Router, Routes } from "react-router";
import LoginPage from "./components/LoginPage";
import SignUpForm from "./components/SignUp";
import SafetyRoutingApp from "./components/SavedAdress";










function App() {
  return (
    <div>
    


      <Routes>
        <Route path="/" element={<LoginPage/>} />
         <Route path="/signnup" element={<SignUpForm/>} />
         <Route path="/safety" element={<SafetyRoutingApp/>} />
         
      </Routes>
      
      
    </div>
  );
}

export default App;
