import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar'
import {Recetas} from './views/recetas/recetas'

function App() {

  return (
     <>
  
      <BrowserRouter>
        <Navbar /> {/* Navbar siempre en la parte superior */}
        <Routes>
          <Route path='/' element={<Recetas/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
