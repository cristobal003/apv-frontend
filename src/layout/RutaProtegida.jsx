import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return "Cargando...";
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
      <Header />
      {auth?._id ? <Outlet /> : <Navigate to="/" />}
      <Footer />
      </div>
    </>
  );
};

export default RutaProtegida;
