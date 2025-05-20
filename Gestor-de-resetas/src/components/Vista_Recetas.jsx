import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function ListaRecetas() {
  const [recetas, setRecetas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicion, setFormEdicion] = useState({
    nombre: '',
    autor: '',
    imagenURL: '',
    ingredientes: '',
    descripcion: '',
  });
  const [mostrarDescripcionId, setMostrarDescripcionId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'recetas'), (snapshot) => {
      const recetasData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecetas(recetasData);
    });

    return () => unsubscribe();
  }, []);

  const handleEliminar = async (id) => {
    if(window.confirm('¿Seguro que quieres eliminar esta receta?')) {
      await deleteDoc(doc(db, 'recetas', id));
    }
  };

  const iniciarEdicion = (receta) => {
    setEditandoId(receta.id);
    setFormEdicion({
      nombre: receta.nombre,
      autor: receta.autor,
      imagenURL: receta.imagenURL,
      ingredientes: receta.ingredientes ? receta.ingredientes.join(', ') : '',
      descripcion: receta.descripcion || '',
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormEdicion({
      nombre: '',
      autor: '',
      imagenURL: '',
      ingredientes: '',
      descripcion: '',
    });
  };

  const guardarEdicion = async (id) => {
    const ingredientesArray = formEdicion.ingredientes.split(',').map(i => i.trim());
    await updateDoc(doc(db, 'recetas', id), {
      nombre: formEdicion.nombre,
      autor: formEdicion.autor,
      imagenURL: formEdicion.imagenURL,
      ingredientes: ingredientesArray,
      descripcion: formEdicion.descripcion,
    });
    cancelarEdicion();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recetas.map(receta => (
        <div key={receta.id} className="border rounded-xl shadow p-4 bg-white relative">
          {editandoId === receta.id ? (
            <>
              <input
                type="text"
                value={formEdicion.nombre}
                onChange={e => setFormEdicion({...formEdicion, nombre: e.target.value})}
                className="form-control mb-2"
              />
              <input
                type="text"
                value={formEdicion.autor}
                onChange={e => setFormEdicion({...formEdicion, autor: e.target.value})}
                className="form-control mb-2"
              />
              <input
                type="text"
                value={formEdicion.imagenURL}
                onChange={e => setFormEdicion({...formEdicion, imagenURL: e.target.value})}
                className="form-control mb-2"
              />
              <textarea
                value={formEdicion.ingredientes}
                onChange={e => setFormEdicion({...formEdicion, ingredientes: e.target.value})}
                className="form-control mb-2"
                placeholder="Ingredientes separados por coma"
              />
              <textarea
                value={formEdicion.descripcion}
                onChange={e => setFormEdicion({...formEdicion, descripcion: e.target.value})}
                className="form-control mb-2"
                placeholder="Descripción"
              />
              <button onClick={() => guardarEdicion(receta.id)} className="btn btn-success mr-2">Guardar</button>
              <button onClick={cancelarEdicion} className="btn btn-secondary">Cancelar</button>
            </>
          ) : (
            <>
              <img src={receta.imagenURL} alt={receta.nombre} className="w-full h-48 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-semibold">{receta.nombre}</h3>
              <p className="text-sm text-gray-600">Autor: {receta.autor}</p>
              <p className="mt-2 text-sm">
                {mostrarDescripcionId === receta.id
                  ? receta.descripcion
                  : receta.ingredientes ? receta.ingredientes.slice(0, 3).join(', ') + '...' : ''}
              </p>
              <button 
                onClick={() => setMostrarDescripcionId(mostrarDescripcionId === receta.id ? null : receta.id)} 
                className="btn btn-link p-0 mt-1"
              >
                {mostrarDescripcionId === receta.id ? 'Ver menos' : 'Ver más'}
              </button>
              <div className="mt-4 flex gap-2">
                <button onClick={() => iniciarEdicion(receta)} className="btn btn-warning btn-sm">Editar</button>
                <button onClick={() => handleEliminar(receta.id)} className="btn btn-danger btn-sm">Eliminar</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListaRecetas;
