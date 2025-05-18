import React from 'react';
import { Link } from 'react-router';

const recetas = [
  { id: 1, nombre: 'Tortilla de Patatas', imagen: '', calificacion: 4.5 },
  { id: 2, nombre: 'Paella Valenciana', imagen: '', calificacion: 5 },
  { id: 3, nombre: 'Gazpacho Andaluz', imagen: '', calificacion: 4 },
];

const imagenDefault = "https://via.placeholder.com/80x80?text=Receta";

function Recetas() {
  return (
    <div className="container mt-4">
      <ul className="list-group d-flex justify-content-center text-center bg-dark text-white border border-secondary">
        {recetas.map(receta => (
          <li key={receta.id} className="list-group-item bg-dark text-white border-secondary">
            <div className="d-flex flex-column align-items-center">
              <img
                src={receta.imagen || imagenDefault}
                alt={receta.nombre}
                className="rounded mb-2"
                style={{ width: 80, height: 80, objectFit: 'cover' }}
              />
              <Link to={`/receta/${receta.id}`} className="text-decoration-none text-white fw-bold fs-5 mb-2">
                {receta.nombre}
              </Link>
              <span className="badge bg-warning text-dark">
                ⭐ {receta.calificacion}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recetas;