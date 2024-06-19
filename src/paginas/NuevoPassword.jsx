import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const { token } = params;
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const response = await clienteAxios(
          `/veterinarios/olvide-password/${token}`
        );
        setAlerta({
          msg: "Coloca tu Nueva Contraseña",
          error: false,
        });
        setTokenValido(true);
      } catch (e) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
        setTokenValido(false); // Asegúrate de actualizar este estado
      }
    };

    if (token) {
      comprobarToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe de ser mínimo 6 carácteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
      setPassword("");
    } catch (error) {
      setAlerta({
        msg: "Hubo un error al cambiar la contraseña",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="my-12">
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece tu Contraseña y no Pierdas Acceso a tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="uppercase text-gray-700 block text-xl font-bold mb-2"
              >
                Nueva Contraseña
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
            <input
              type="submit"
              value="Guardar Contraseña"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition duration-300 ease-in-out transform hover:scale-105"
            />
          </form>
        )}
        {passwordModificado && (
          <nav className="mt-10 flex justify-center">
            <Link to="/" className="block text-center my-5 text-gray-500">
              Inicia Sesión
            </Link>
          </nav>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
