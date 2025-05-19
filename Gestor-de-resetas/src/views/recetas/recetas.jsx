import React, { useEffect, useState } from "react";
import {useForm} from 'react-hook-form';
import { collection, getDocs, addDoc } from "firebase/firestore";
import {db} from '../../Services/firebase/config'
import { doc, updateDoc, deleteDoc } from "firebase/firestore"; // importo dod , updateDoc y deleteDoc de la documentacion


export const Recetas = () => {
    const [recetas, setRecetas] = useState([]);
    // importamos el metodo watch y reset de react hook form
    const {register, handleSubmit, watch, reset} = useForm (); // reset sirve para limpiar mi form una vez enviado los datos
    const [editarReceta, setEditarReceta] = useState(null);
    const getRecetas = async () => {
        
//mostramos la informacion en consola ---- esto viene de la documentacion
const querySnapshot = await getDocs(collection(db, "recetas"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

// obtenemos los productos en una constante data
const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
}))

setRecetas(data);
    }

 const addRecetas = async (data) => {
    console.log(data);
    
    
    
// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "recetas"), {
  name: data.name,
  ingredients: data.ingredients,
  steps: data.steps,
  imgUrl: data.imgUrl,
  autor: data.autor
});
console.log("Document written with ID: ", docRef.id);

getRecetas();
reset(); 
 }


    useEffect ( () => {
        getRecetas();
    }
     ,[]);

     //mostrar vista previa en el formulario
 const imgUrl = watch("imgUrl");


 // editar mis recetas haciendo uso de la documentacion de firestore

const updateReceta =async (idReceta, recetaActualizada) =>{  // Creo una nueva constante que abarque todo el codigo de firestore

    const recetaRef = doc(db, "recetas", idReceta);
    await updateDoc(recetaRef, recetaActualizada);
    
};

 
  const onSubmit = async (data) => {
    if (editarReceta) {
      // modo edición
      await updateReceta(editarReceta, data);
      setEditarReceta(null);
    } else {
      // modo creación
      await addRecetas(data);
    }
    reset();
    getRecetas();
  };


  // funcion borrar recetas

  const deleteReceta = async (idReceta) => {
  const recetaRef = doc(db, "recetas", idReceta);
  await deleteDoc(recetaRef);
  getRecetas(); // Recargar lista luego de borrar
};


    return (
        <div className="container" style={{marginTop: "10rem"}}>
            <h2 className="mb-4">{editarReceta ? "Edit Recipe" : "Add Recipe"}</h2> {/* un ternario para al h2 */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4"> {/* remplazo el addRecetas por un onSubmit */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Recipe name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        {...register("name")}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">
                        Ingredients
                    </label>
                    <textarea
                        rows="3"
                        type="text"
                        className="form-control"
                        id="ingredients"
                        name="ingredients"
                        {...register("ingredients")}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="steps" className="form-label">
                        Steps
                    </label>
                    <textarea
                        rows="6"
                        type="text"
                        className="form-control"
                        id="steps"
                        name="steps"
                        {...register("steps")}
                        required
                    style={{ maxHeight:"10rem"}}/>
                </div>

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Img Url
                    </label>
                    <textarea
                        rows="2"
                        type="text"
                        className="form-control"
                        id="imgUrl"
                        name="imgUrl"
                        {...register("imgUrl")}
                        required
                    />
                </div>

                 {imgUrl && (
                <div className="mb-3">
                    <label className="form-label">Vista previa:</label>
                    <img
                        src={imgUrl}
                        alt="Vista previa"
                        style={{ maxWidth: "200px", display: "block", marginTop: "10px" }}
                    />
                </div>
            )}

                <div className="mb-3">
                    <label htmlFor="autor" className="form-label">
                        Autor
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="autor"
                        name="autor"
                        {...register("autor")}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary"> 
                    {editarReceta ? "Guardar cambios" : "Add Recipe"} {/* un ternario para el nombre del boton */}
                </button>

            </form>

            <h3>Recipe List</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Recipe name</th>
                        <th>Ingredients</th>
                        <th>Steps</th>
                        <th>Img Url</th>
                        <th>autor</th>
                    </tr>
                </thead>
                <tbody>
                {recetas.map((receta, index) => (
                        <tr key={index}>
                            <td style={{wordWrap:"break-word" , maxWidth:"7rem"}}>{receta.name}</td>
                            <td style={{wordWrap:"break-word" , maxWidth:"8rem"}}>{receta.ingredients}</td>
                            <td style={{wordWrap:"break-word" , maxWidth:"10rem"}}>{receta.steps}</td>
                            <td style={{wordWrap:"break-word" , maxWidth:"14rem", whiteSpace:"normal"}}>{receta.imgUrl}</td>
                            <td style={{wordWrap:"break-word" , maxWidth:"7rem"}}>{receta.autor}</td>
                            <td style={{wordWrap:"break-word" , maxWidth:"3rem"}}>
                                <button className="btn btn-sm btn-warning" onClick={() =>{
                                setEditarReceta(receta.id);
                                reset({
                                name: receta.name,
                                ingredients: receta.ingredients,
                                steps: receta.steps,
                                imgUrl: receta.imgUrl,
                                autor: receta.autor
                                });
                                }}
                                > Editar</button>
                            </td>

                            <td style={{wordWrap:"break-word" , maxWidth:"3rem"}}>
                            <button className="btn btn-sm btn-danger" onClick={() => deleteReceta(receta.id)}> Borrar </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

