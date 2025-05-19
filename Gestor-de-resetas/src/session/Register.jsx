import "./formulario.css"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase/config"; 

const schema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es requerido"),
  email: yup.string().email("El correo electrónico no es válido").required("El correo electrónico es requerido"),
  password: yup.string().required("La contrseña es requerida").min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmpassword: yup.string().oneOf([yup.ref('password'), null], "Las contraseñas no coinciden").required("La confirmación de contraseña es requerida")
})

export const Register = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmitForm = (data) => {
  console.log(data);

  
createUserWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

  return (
    <div className="contenedor">
      <form className="formulario" onSubmit={handleSubmit(onSubmitForm)}>
        <h1>Registro</h1>
          <label htmlFor="username">Nombre del usuario</label>
          <input type="text" 
          id="username" 
          placeholder="Ingresa tu nombre de usuario"
          {...register ("username")}/>
          <p>{errors.username && errors.username.message}</p>

          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" 
          id="email" 
          placeholder="Ingresa tu correo electrónico" 
          {...register ("email")}/>
          <p>{errors.email && errors.email.message}</p>

          <label htmlFor="password">Contraseña</label>
          <input type="password" 
          id="password" 
          placeholder="Ingresa tu contraseña"
          {...register ("password")}/>
          <p>{errors.password && errors.password.message}</p>

          <label htmlFor="confirmpassword">Confirmar Contraseña</label>
          <input type="password" 
          id="confirmpassword" 
          placeholder="Confirma tu contraseña"
          {...register ("confirmpassword")}/>
          <p>{errors.confirmpassword && errors.confirmpassword.message}</p>

          <button type="submit">Registrar</button>

        <div className="link">
        <Link to="/login">¿Ya tienes una cuenta? Inicia Sesión</Link>
        </div>

      </form>
    </div>
    );
}
