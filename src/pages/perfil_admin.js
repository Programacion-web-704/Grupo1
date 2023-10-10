import Layout from "../components/Layout_admin";
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
    Preferencias: {
      Idioma: "",
      Prefijo: "",
      Color: "",
    },
  });

  const [seccionActual, setSeccionActual] = useState("DatosPersonales");
  const [image, setImage] = useState(null);
  const [savedImage, setSavedImage] = useState(null);

  const mngmtChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [seccionActual]: {
        ...prevState[seccionActual],
        [name]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
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
      Preferencias: state.Preferencias,
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
          TipoDoc: "",
          NroDoc: "",
          ImagenPerfil: savedImage, // Restaura la imagen
        },
        Cuenta: {
          Correo: "",
          Contraseña: "",
        },
        Preferencias: {
          Idioma: "",
          Prefijo: "",
          Color: "",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const mostrarSeccion = (seccion) => {
    setSeccionActual(seccion);
  };

  return (
    <>
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
        <button type="button" onClick={() => mostrarSeccion("Preferencias")}>
          Preferencias
        </button>
      </p>
      <form onSubmit={doEscribir}>
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
        <button type="submit">Guardar</button>
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
