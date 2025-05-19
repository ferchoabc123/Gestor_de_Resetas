import { Link } from "react-router";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark border border-secondary">
    <div className="container-fluid ">
      {/* Botón Iniciar Sesión a la izquierda */}
      <Link to="/login" className="btn btn-outline-light me-2">Iniciar sesión</Link>
      {/* Título centrado pero desplazado a la derecha */}
      <div className="flex-grow-1 d-flex justify-content-center me-4"> 
        <span className="navbar-brand mb-0 h1 ps-3">Gestor de Resetas</span>
      </div>
      {/* Botón Crear a la derecha */}
      <div className="ms-auto">
        <Link to="/crear" className="btn btn-success">+ Crear +</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
