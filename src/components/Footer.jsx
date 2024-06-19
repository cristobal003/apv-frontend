const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} APV - Administrador de Pacientes de{" "}
          <span className="font-bold">Veterinaria</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

  
  
  
  