
export const Register = () => {
  return (
    <div>
        <form className="form">
            <h1>Registro</h1>
            <label htmlFor="nombre">Nombre del usuario</label>
            <input type="text" 
            name="nombre" 
            placeholder="Ingresa tu nombre de usuario"/>

             <label htmlFor="email">Correo Electrónico</label>
            <input type="email" 
            name="email" 
            placeholder="Ingresa tu correo electrónico"/>

             <label htmlFor="password">Contraseña</label>
            <input type="password" 
            name="password" 
            placeholder="Ingresa tu contraseña"/>

             <label htmlFor="confirmpassword">Confirmar Contraseña</label>
            <input type="password" 
            name="password" 
            placeholder="Confirma tu contraseña"/>

        </form>
    </div>
  )
}
