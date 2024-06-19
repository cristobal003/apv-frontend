import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { cerrarSesion } = useAuth();

  return (
    <header className="bg-indigo-600">
      <div className="container mx-auto px-4 py-12 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">
            Administrador de Pacientes de{" "}
            <span className="text-indigo-100 font-black">Veterinaria</span>
          </h1>
          <button
            className="block md:hidden text-white text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:flex-grow md:items-center md:justify-end mt-4 md:mt-0`}
        >
          <Link
            to="/admin"
            className="block mt-4 md:inline-block md:mt-0 text-lg text-white hover:text-indigo-300 mr-8"
          >
            Pacientes
          </Link>
          <Link
            to="/admin/perfil"
            className="block mt-4 md:inline-block md:mt-0 text-lg text-white hover:text-indigo-300 mr-8"
          >
            Perfil
          </Link>
          <button
            type="button"
            className="block mt-4 md:inline-block md:mt-0 text-lg text-white hover:text-indigo-300"
            onClick={cerrarSesion}
          >
            Salir
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
