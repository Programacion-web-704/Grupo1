import Layout from "@/components/Layout_user"
import { useState } from 'react'

const Formulario = () => {
    // acordarme del useState
    const [state, setState] = useState({
        DatosPersonales: {
            Nombre: "",

            TipoDoc: "",
            NroDoc: "",
        },
        Cuenta: {
            Correo: "",
            Contraseña: "",
        },

    }
    )
    const [seccionActual, setSeccionActual] = useState("DatosPersonales");



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

    const doGuardar = async () => {
        let formData = new FormData()
        for (let [key, value] of Object.entries(state)) {
            formData.append(key, value)
        }

        // aparenetement el formData no funciona bien
        let params = new Map([])
        formData.forEach((value, key) => {
            params.set(key, value)
        })

        // Generar un Objeto JSON
        let jsonObject = {}
        params.forEach(
            (value, key) => { jsonObject[key] = value }
        )
        console.log(JSON.stringify(jsonObject))

        // Invocar a la API
        try {
            const req = await fetch(
                `/api/contactoAPI`,
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

    const mostrarSeccion = (seccion) => {
        // Cambia la sección actual al hacer clic en los botones
        setSeccionActual(seccion);
    };

    const doEscribir = async () => {
        // Obtener el objeto JSON directamente del estado
        const jsonObject = {
            DatosPersonales: state.DatosPersonales,
            Cuenta: state.Cuenta,
            Preferencias: state.Preferencias,
        };

        // Invocar a la API
        try {
            const req = await fetch(
                `/api/contactoAPIArchivo`,
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
                <button type="button" onClick={() => mostrarSeccion("DatosPersonales")}>
                    Datos Personales
                </button>
                <button type="button" onClick={() => mostrarSeccion("Cuenta")}>
                    Cuenta
                </button>
            </p>
            <form onSubmit={mngmtSubmit}>
                {/* Campos del formulario para "Datos Personales" */}
                {seccionActual === "DatosPersonales" && (
                    <>
                        <p>Nombre :
                            <input name="Nombre" type="text"
                                placeholder="Ingresa tu nombre"
                                onChange={mngmtChange}
                                value={state.DatosPersonales.Nombre}
                                required />
                        </p>
                        <p>Apellido:
                            <input name="Apellidos" type="text"
                                placeholder="Ingresa tus apellidos"
                                onChange={mngmtChange}
                                value={state.DatosPersonales.Apellidos}
                                required />
                        </p>
                        <p>Tipo de documento:
                            <select name="TipoDoc" onChange={mngmtChange} value={state.DatosPersonales.TipoDoc}>
                                <option value="DNI" selected>DNI</option>
                                <option value="Carnet_Pasaporte">Carnet de Pasaporte</option>
                            </select>
                        </p>
                        <p>Nro. de docuemnto:
                            <input name="NroDoc"
                                placeholder="Ingresa tu numero de documento"
                                onChange={mngmtChange}
                                value={state.DatosPersonales.NroDoc}
                            ></input>
                        </p>
                    </>)
                }
                {seccionActual === "Cuenta" && (
                    <>
                        <p>
                            Cuenta de usuario:
                            <input
                                name="CuentaUsuario"
                                type="email"
                                placeholder="Ingresa tu correo"
                                onChange={mngmtChange}
                                value={state.Cuenta.CuentaUsuario}
                                required
                            />
                        </p>
                        <p>
                            Contraseña:
                            <input
                                name="Password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                onChange={mngmtChange}
                                value={state.Cuenta.Password}
                                required
                            />
                        </p>
                    </>
                )}

                <button onClick={doGuardar}>Grabar</button>
                <button onClick={doEscribir}>Aceptar</button>
            </form>
        </>
    )
}


const Contacto = () => {
    return (<Layout content={
        <>
            <div>
                <h1> ...::: Hola, pepito :::... </h1>
                <Formulario />
            </div>
        </>

    }
    ></Layout>
    )
}

export default Contacto
