
import Layout from "../components/Layout_admin.js"
import { useState } from 'react'
import Image from "next/image.js"
const Formulario = () => {
    // acordarme del useState
    const [state, setState] = useState({
        NuevoLibro: {
            Título: "",
            Autor: "",
            ISBN: "",
            Serie:"",
        },
    }
    )
    const [seccionActual, setSeccionActual] = useState("NuevoLibro");



    function mngmtChange(e) {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [seccionActual]: {
                ...prevState[seccionActual],
                [name]: value,
            },
        }));
    };

    function mngmtSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        for (let [key, value] of Object.entries(state[seccionActual])) {
            formData.append(key, value);
        }

        console.log(formData)
        // Una ve que se ha cargado el FormData
        // se envia el formulario normalmente
        // usando fetch ... (T.B.D.)
    }


    const mostrarSeccion = (seccion) => {
        // Cambia la sección actual al hacer clic en los botones
        setSeccionActual(seccion);
    };

    const doEscribir = async () => {
        // Obtener el objeto JSON directamente del estado
        const jsonObject = {
            NuevoLibro: state.NuevoLibro,

        };
        alert('Registro Completo');
        // Invocar a la API
        try {
            const req = await fetch(
                `/api/contactoLibroAPIarchivo`,
                {
                    method: 'POST',
                    body: JSON.stringify({ jsonObject }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const data = await req.json()
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {/* Botones para cambiar la sección */}
            <p>
                <button type="button" onClick={() => mostrarSeccion("NuevoLibro")}>
                    Añadir nuevo recurso
                </button>

            </p>
            <form onSubmit={mngmtSubmit}>
                {/* Campos del formulario para "Datos Personales" */}
                {seccionActual === "NuevoLibro" && (
                    <>
                        <p>Título :
                            <input name="Título" type="text"
                                placeholder="Ingrese el título"
                                onChange={mngmtChange}
                                value={state.NuevoLibro.Título}
                                required />
                        </p>
                        <p>Autor o Autores:
                            <input name="Autor" type="text"
                                placeholder="Ingresa los autores"
                                onChange={mngmtChange}
                                value={state.NuevoLibro.Autor}
                                required />
                        </p>
                        <p>ISBN:
                        <input name="Isbn" type="text"
                                placeholder=""
                                onChange={mngmtChange}
                                value={state.NuevoLibro.Isbn}
                                required />

                        </p>
                        <p>Serie:
                            <input name="Serie"
                                placeholder="Ingrese la serie"
                                onChange={mngmtChange}
                                value={state.NuevoLibro.Serie}
                            ></input>
                        </p>
                    </>)
                }

                <button onClick={doEscribir} >Aceptar</button>

            </form>
        </>
    )
}


const Contacto = () => {
    return (<Layout content={
        <>
        <h1> ...::: Biblioteca :::... </h1>
            <div>

                <Image src="/img.png" width={200} height={300}></Image>
                <Image src="/images.jpg" width={200} height={300}></Image>
                <Formulario />
            </div>
        </>

    }
    ></Layout>
    )
}

export default Contacto
