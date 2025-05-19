import "./formulario.css"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

  const schema = yup.object().shape({
    email: yup.string().email("El correo electrónico no es válido").required("El correo electrónico es requerido"), 
    password: yup.string().required("La contraseña es requerida").min(8, "La contraseña debe tener al menos 8 caracteres")
  })

export const Login = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmitForm = (data) => {
    console.log(data);
  }

  return (
    <div className="contenedor">
        <form className="formulario" onSubmit={handleSubmit(onSubmitForm)}>
          <h1>Iniciar Sesión</h1>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" 
          id="email"
          placeholder="Correo electrónico" 
          {...register("email")}/>
          <p>{errors.email && errors.email.message}</p>

          <label htmlFor="password">Correo Electrónico</label>
          <input type="password" 
          id="password"
          placeholder="Ingresa tu contraseña" 
          {...register("password")}/>
          <p>{errors.password && errors.password.message}</p>
          
        <button type="submit">Iniciar Sesión</button>
        </form>
    </div>
  )
}
