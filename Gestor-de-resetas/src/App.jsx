import {BrowserRouter , Routes, Route} from 'react-router'
import { Register } from './session/Register'
import { Login } from './session/Login'
import { Session } from './session/Session'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/session" element={<Session/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
