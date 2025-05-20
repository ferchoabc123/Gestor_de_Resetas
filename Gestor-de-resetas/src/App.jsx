
import React from 'react';
import SubirReceta from './components/SubirRecetas';
import ListaRecetas from './components/Vista_Recetas';

function App() {
  return (
    <div>
      <h1>Gestor de Recetas</h1>
      <SubirReceta />
      <ListaRecetas />
    </div>
  );
}

export default App;
