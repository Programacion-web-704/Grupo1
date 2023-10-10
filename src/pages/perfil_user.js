import Layout from "../components/Layout_user";
import { useState } from "react";

const Formulario = () => {
    const [state, setState] = useState({
        DatosPersonales: {
            Nombre: "",
            TipoDoc: "",
            NroDoc: "",
            ImagenPerfil: "",
        },
        Cuenta: {
            Correo: "",
            Contraseña: "",
        },
    });

    const [seccionActual, setSeccionActual] = useState("DatosPersonales");
    const [savedImage, setSavedImage] = useState("");

    function mngmtChange(e) {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [seccionActual]: {
                ...prevState[seccionActual],
                [name]: value,
            },
        }));
    }

    function mngmtSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        for (let [key, value] of Object.entries(state[seccionActual])) {
            formData.append(key, value);
        }

        console.log(formData);
        // Una vez que se ha cargado el FormData
        // se envía el formulario normalmente
        // usando fetch ... (T.B.D.)
    }

    const mostrarSeccion = (seccion) => {
        setSeccionActual(seccion);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setState((prevState) => ({
                ...prevState,
                DatosPersonales: {
                    ...prevState.DatosPersonales,
                    ImagenPerfil: imageUrl,
                },
            }));
        }
    };

    const doEscribir = async () => {
        const jsonObject = {
            DatosPersonales: state.DatosPersonales,
            Cuenta: state.Cuenta,
        };

        try {
            const req = await fetch(`/api/contactoAPIArchivo`, {
                method: "POST",
                body: JSON.stringify({ jsonObject }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await req.json();
            console.log(data);

            // Guarda la imagen de perfil en el estado savedImage
            setSavedImage(state.DatosPersonales.ImagenPerfil);

            // Limpia el formulario
            setState({
                DatosPersonales: {
                    Nombre: "",
                    Apellidos: "",
                    TipoDoc: "",
                    NroDoc: "",
                    ImagenPerfil: savedImage, // Restaura la imagen
                },
                Cuenta: {
                    CuentaUsuario: "",
                    Password: "",
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    // Agrega una clase CSS para controlar el tamaño de la imagen
    const imageStyle = {
        maxWidth: "200px", // Ajusta el ancho máximo según tus preferencias
        maxHeight: "200px", // Ajusta el alto máximo según tus preferencias
    };

    return (
        <>
            {/* Botones para cambiar la sección */}
            <p>
                <button
                    type="button"
                    onClick={() => mostrarSeccion("DatosPersonales")}
                >
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
                        <p>
                            Nombre :
                            <input
                                name="Nombre"
                                type="text"
                                placeholder="Ingresa tu nombre"
                                onChange={mngmtChange}
                                value={state.DatosPersonales.Nombre}
                                required
                            />
                        </p>
                        <p>
                            Apellido:
                            <input
                                name="Apellidos"
                                type="text"
                                placeholder="Ingresa tus apellidos"
                                onChange={mngmtChange}
                                value={state.DatosPersonales.Apellidos}
                                required
                            />
                        </p>
                        <p>
                            Tipo de documento:
                            <select
                                name="TipoDoc"
                                onChange={mngmtChange}
                                value={state.DatosPersonales.TipoDoc}
                            >
                                <option value="DNI">DNI</option>
                                <option value="Carnet_Pasaporte">Carnet de Pasaporte</option>
                            </select>
                        </p>
                        <p>
                            Nro. de documento:
                            <input
                                name="NroDoc"
                                placeholder="Ingresa tu numero de documento"
                                onChange={mngmtChange}
                                value={state.DatosPersonales.NroDoc}
                            ></input>
                        </p>
                        <p>
                            Imagen de perfil:
                            <input
                                type="file"
                                name="ImagenPerfil"
                                onChange={handleImageUpload}
                                accept="image/*"
                            />
                        </p>
                        <img
                            src={savedImage || state.DatosPersonales.ImagenPerfil}
                            alt="Imagen de perfil"
                            style={imageStyle} // Aplica el estilo
                        />
                    </>
                )}
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

                <button onClick={doEscribir}>Guardar</button>
            </form>
        </>
    );
};

const Contacto = () => {
    return (
        <Layout
            content={
                <>
                    <div>
                        <h1>...::: Configuración de Perfil :::...</h1>
                        <Formulario />
                    </div>
                </>
            }
        ></Layout>
    );
};

export default Contacto;
