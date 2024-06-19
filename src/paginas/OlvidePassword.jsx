import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de email
    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El Email es obligatorio", error: true });
      return;
    }
  
    try {
      // Enviar la solicitud POST
      await clienteAxios.post('/veterinarios/olvide-password', { email });

      // Mensaje de éxito
      setAlerta({ msg: 'Hemos enviado un correo, revisa tu email', error: false });
    } catch (e) {
      console.error('Error en la solicitud:', e.response);
  
      // Manejo de error
      setAlerta({ msg: e.response.data.msg || 'Hubo un error', error: true });
    }
  };
  
  const { msg } = alerta;
  return (
    <>
      <div className="my-12">
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
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
          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition duration-300 ease-in-out transform hover:scale-105"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/registrar"
            className="block text-center my-5 text-gray-500"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
          <Link to="/" className="block text-center my-5 text-gray-500">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
