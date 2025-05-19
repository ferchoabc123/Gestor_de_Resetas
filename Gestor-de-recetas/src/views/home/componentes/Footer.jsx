import React from "react";

const Footer = () => (
  <footer className="bg-dark text-white border-top border-secondary py-3 mt-auto">
    <div className="container text-center">
      <span>&copy; {new Date().getFullYear()} Gestor de Resetas. Todos los derechos reservados.</span>
    </div>
  </footer>
);

export default Footer;
