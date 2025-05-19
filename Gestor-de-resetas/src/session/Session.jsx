import { Register } from "./Register";
import { Login } from "./Login";
import { useState } from "react";
import "./session.css";
import { auth } from "../services/firebase/config";

export const Session = () => {
    const [typeForm, setTypeForm] = useState("");

    console.log(auth);
    return (
        <div className="contenedor-session">
            <h1>Session</h1>
            <section className="session">
                <button className="" onClick={() => {setTypeForm("register")}}>Register</button>
                <button className="" onClick={() => {setTypeForm("login")}}>Login</button>

                { typeForm === "login" ? <Login /> : <Register />}
            </section>
        </div>
    );
}
