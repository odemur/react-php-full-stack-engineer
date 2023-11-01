import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import UserForm from "./components/Register";
import { AuthProvider } from "./components/AuthContext";


const App: React.FC = () => {
  return (
    <AuthProvider>
    <div className="App container">
      <Header />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<UserForm />} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
};

export default App;
