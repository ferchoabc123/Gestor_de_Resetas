import Navbar from "./componentes/Navbar"
import Recetas from "./componentes/Recetas"
import Footer from "./componentes/Footer"
const Home = () => {
  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar />
      <div className="row g-0 min-vh-100">
        {/* Columna izquierda */}
        <div className="col-1 d-none d-md-block" style={{ minWidth: "10vw", maxWidth: "10vw" }}></div>
        {/* Columna central */}
        <div className="col-12 col-md-10 border-start border-end border-secondary" style={{ minWidth: "80vw", maxWidth: "90vw" }}>
          
          <div className="d-flex justify-content-center align-items-center">
            <h1>Invitado</h1>
          </div>
          <Recetas />
        </div>
        {/* Columna derecha */}
        <div className="col-1 d-none d-md-block" style={{ minWidth: "10vw", maxWidth: "10vw" }}></div>
      </div>
      <Footer />
      {/* Espacio para el footer */}
    </div>
  )
}

export default Home