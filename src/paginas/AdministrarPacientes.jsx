import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);


  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <button
          type="button"
          className="bg-indigo-600 uppercase text-white font-bold py-3 px-6 rounded-md transition-all duration-300 hover:bg-indigo-700 md:hidden"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-4">
        <div
          className={`${
            mostrarFormulario ? "block" : "hidden"
          } w-full md:w-1/2 lg:w-2/5 transition-all duration-300 md:block`}
        >
          <Formulario />
        </div>
        <div className="w-full md:w-1/2 lg:w-3/5">
          <ListadoPacientes />
        </div>
      </div>
    </div>
  );
};

export default AdministrarPacientes;
