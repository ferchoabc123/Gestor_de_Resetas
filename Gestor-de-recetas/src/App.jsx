import {BrowserRouter, Routes, Route} from 'react-router'
import Home from './views/home/Home.jsx'

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
