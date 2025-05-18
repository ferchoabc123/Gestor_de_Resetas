import Navbar from "./componentes/Navbar"
import Recetas from "./componentes/Recetas"
const Home = () => {
     
  return (
    <div className="bg-dark text-white min-vh-100">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center" >
          <h1>Invitado</h1>
        </div>
        <Recetas />
    </div>
   
  )
}

export default Home