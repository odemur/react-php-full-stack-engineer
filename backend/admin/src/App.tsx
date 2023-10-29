import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import UserForm from "./UserLogin";
import Login from "./Login";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<UserForm />} />
        </Routes>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/cadastro">Cadastro</Link>
            </li>
          </ul>
        </nav>
      </BrowserRouter>
    </div>
  );
};

export default App;
