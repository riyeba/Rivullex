import React from "react";

import { Route, Router, Routes } from "react-router";
import LoginPage from "./components/LoginPage";










function App() {
  return (
    <div>
    


      <Routes>
        <Route path="/" element={<LoginPage/>} />
         
      </Routes>
      
      
    </div>
  );
}

export default App;
