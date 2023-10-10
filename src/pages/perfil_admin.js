import Layout from "../components/Layout_admin"
import { useState } from 'react'

const Formulario = () => {
    // acordarme del useState
    const [state, setState] = useState({
            DatosPersonales:{
                Nombre:"",

                TipoDoc:"",
                NroDoc:"",
            },
            Cuenta:{
                Correo:"",
                Contraseña:"",
            },
            Preferencias:{
                Idioma:"",
                Prefijo:"",
                Color:"",
            },
        }
    )
    const [seccionActual, setSeccionActual] = useState("DatosPersonales");
    const [imagen, setImagen] = useState(null);
    const [imagenCargada, setImagenCargada] = useState(false);





    function mngmtChange(e) {
      const { name, value, type } = e.target;

      if (type && type === 'file') {
        // Si el input es de tipo 'file', manejar la imagen
        setImagen(e.target.files[0]);
      } else {
        // Para otros campos, actualizar el estado como lo hacías antes
        setState((prevState) => ({
          ...prevState,
          [seccionActual]: {
            ...prevState[seccionActual],
            [name]: value,
          },
        }));

      }
      setImagenCargada(true);
    }


    function mngmtSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        for (let [key, value] of Object.entries(state[seccionActual])) {
          formData.append(key, value);
        }
        formData.append('imagen', imagen);


        console.log( formData )
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
                    body: JSON.stringify( {jsonObject}),
                    headers: {
                        'Content-Type':'application/json'
                    }
                }
            )
            const data = await req.json()
            console.log( data )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        {/* Botones para cambiar la sección */}
        <p>
          Foto de perfil:
          <input
          type="file"
          name="imagen"
          onChange={mngmtChange}/></p>
          {imagenCargada && (
          <div>
            <p>Imagen cargada:</p>
            <img src={URL.createObjectURL(imagen)} alt="Imagen cargada" />
            </div>)
          }
        <p>
          <button type="button" onClick={() => mostrarSeccion("DatosPersonales")}>
            Datos Personales
          </button>
          <button type="button" onClick={() => mostrarSeccion("Cuenta")}>
            Cuenta
          </button>
          <button type="button" onClick={() => mostrarSeccion("Preferencias")}>
            Preferencias
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
        {/* Campos del formulario para "Preferencias" */}
        {seccionActual === "Preferencias" && (
          <>
            <p>
              Idioma:
              <input
                name="Idioma"
                type="text"
                placeholder="Ingresa tu idioma:"
                onChange={mngmtChange}
                value={state.Preferencias.Idioma}
                required
              />
            </p>
            <p>
              Prefijo:
              <input
                name="Prefijo"
                type="text"
                placeholder="Ingresa tu prefijo:"
                onChange={mngmtChange}
                value={state.Preferencias.Prefijo}
                required
              />
            </p>
            <p>
              Color:
              <input
                name="Color"
                type="text"
                placeholder="Color:"
                onChange={mngmtChange}
                value={state.Preferencias.Color}
                required
              />
            </p>

          </>
        )}



                <button onClick={doEscribir}>Guardar</button>
            </form>
        </>
    )
}


const Contacto = () => {
    return (<Layout content={
        <>
        <div>
            <h1> ...::: Configuración de Perfil :::... </h1>
            <Formulario />
        </div>
        </>

    }
    ></Layout>
    )
}

export default Contacto