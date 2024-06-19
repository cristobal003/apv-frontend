import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.get("pacientes", config); // Asegúrate de que sea una solicitud GET
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (auth?._id) { // Verifica si auth está definido y tiene un _id
      obtenerPacientes();
    }
  }, [auth]);
  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (paciente._id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente._id}`,
          paciente,
          config
        );
        const pacientesActualizados = pacientes.map((pacienteState) =>
          pacienteState._id === data._id ? data : pacienteState
        );
        setPacientes(pacientesActualizados);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );
        //Quitar lo que no nos sirve de la respuesta
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (e) {
        console.log(e.response.data.msg);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async (_id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar el paciente?");
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = clienteAxios.delete(`/pacientes/${_id}`, config);
        const pacientesActualizado = pacientes.filter(
          (pacientesState) => pacientesState._id !== _id
        );
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
