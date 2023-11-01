import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Navbar: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <nav className="navbar navbar-expand-lg g-2">
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Cadastre-se</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <div>
          <button onClick={handleLogout} className="btn btn-danger float-end">
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
