import React from "react";
import "./App.css";
import LoginForm from "./modules/auth/components/LoginForm";

const App: React.FC = () => {
  return (
    <div className="app">
      <LoginForm />
    </div>
  );
};

export default App;
