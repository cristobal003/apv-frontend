const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "from-red-400 to-red-600"
          : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-r p-4 text-white rounded-xl text-center uppercase font-bold text-sm mb-10`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
