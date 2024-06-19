import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !password || !repetirPassword) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      console.log(alerta);
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      console.log(alerta);
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      console.log(alerta);
      return;
    }

    setAlerta({});

    //Crear el usuario en la API
    try {
      await clienteAxios.post(`/veterinarios`, { nombre, email, password });
      setAlerta({msg: 'Creado correctamente, revisa tu email', error: false});
    } catch (error) {
        setAlerta({msg: error.response.data.msg, error: true});
      
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="my-12">
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="nombre"
              className="uppercase text-gray-700 block text-xl font-bold mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu Nombre"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="uppercase text-gray-700 block text-xl font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Tu email"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="uppercase text-gray-700 block text-xl font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Tu Contraseña"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="repetirPassword"
              className="uppercase text-gray-700 block text-xl font-bold mb-2"
            >
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="repetirPassword"
              placeholder="Repite tu Contraseña"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition duration-300 ease-in-out transform hover:scale-105"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvide mi contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
