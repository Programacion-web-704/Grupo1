
import Layout from "../components/Layout_prestamo";
import { useState } from "react";
import librosjson from "@/components/libros.json";

const FormularioBiblio = () => {
  const [keyword, setKeyword] = useState("");
  const [resultados, setResultados] = useState("");
  const [editorial, setEditorial] = useState("");
  const [isbn, setIsbn] = useState("");  // Nueva opción para el ISBN
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
  const [fechaReserva, setFechaReserva] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const handleCambioNombreLibro = (event) => {
    setKeyword(event.target.value);
  };

  const handleCambioEditorial = (event) => {
    setEditorial(event.target.value);
  };

  const handleCambioIsbn = (event) => {
    setIsbn(event.target.value);
  };

  const handleBusquedaEnviar = (event) => {
    event.preventDefault();

    // Realizar la búsqueda en el archivo JSON
    const resultadosBusqueda = buscarEnJSON(librosjson, {
      keyword,
      editorial,
      isbn,  // Agregar ISBN a los filtros
      opcionesSeleccionadas,
    });

    // Actualizar el estado con los resultados
    setResultados(resultadosBusqueda);
  };

  const handleLimpiar = () => {
    setKeyword("");
    setEditorial("");
    setOpcionesSeleccionadas([]);
    setResultados("");
  };

  const handleFiltros = (event) => {
    const opcion = event.target.value;
    if (opcionesSeleccionadas.includes(opcion)) {
      const nuevasOpciones = opcionesSeleccionadas.filter(
        (item) => item !== opcion
      );
      setOpcionesSeleccionadas(nuevasOpciones);
    } else {
      setOpcionesSeleccionadas([...opcionesSeleccionadas, opcion]);
    }
  };
  const handleSeleccionarFecha = (fecha) => {
    // Selecciona la fecha y cierra el calendario
    setFechaReserva(fecha);
    setMostrarCalendario(false);
  };
  
  const mostrarAlerta = (mensaje) => {
    alert(mensaje);
  };
  
  const handleReserva = (libro) => {
    // Abre el calendario al hacer clic en Reservar
    setMostrarCalendario(true);
  };
    

  // Función para buscar en el archivo JSON
 // Función para buscar en el archivo JSON
 const buscarEnJSON = (json, filtros) => {
  const resultados = json.filter((libro) => {
    const cumpleFiltros =
      (!filtros.keyword ||
        (libro.titulo && libro.titulo.toLowerCase().includes(filtros.keyword.toLowerCase()))) &&
      (!filtros.editorial ||
        (libro.editorial && libro.editorial.toLowerCase().includes(filtros.editorial.toLowerCase()))) &&
      (!filtros.isbn ||
        (libro.ISBN && libro.ISBN.toLowerCase().includes(filtros.isbn.toLowerCase()))) &&  // Agregar búsqueda por ISBN
      (filtros.opcionesSeleccionadas.length === 0 ||
        filtros.opcionesSeleccionadas.some(
          (filtro) =>
            (libro.autor && libro.autor.toLowerCase().includes(filtro.toLowerCase())) ||
            (libro.titulo && libro.titulo.toLowerCase().includes(filtro.toLowerCase()))
        ));

    return cumpleFiltros;
  });

  return resultados;
};



return (
  <div>
    <form onSubmit={handleBusquedaEnviar}>
      <h3>Ingrese palabra clave</h3>
      <input
        type="text"
        value={keyword}
        onChange={handleCambioNombreLibro}
      />
      <h4>Ingrese editorial</h4>
      <input
        type="text"
        value={editorial}
        onChange={handleCambioEditorial}
      />
      <h4>Ingrese ISBN</h4>
      <input
        type="text"
        value={isbn}
        onChange={handleCambioIsbn}
      />

        <div>
          
          

          <button type="submit">Buscar</button>
          <button type="button" onClick={handleLimpiar}>
            Limpiar
          </button>
        </div>
        

      </form>
      

      {resultados && (
  <ul>
     {resultados.map((libro) => (
            <li key={libro.id}>
              {libro.titulo} - {libro.autor}
              <button onClick={() => handleReserva(libro)}>Reservar</button>
            </li>
          ))}
        </ul>
      )}

      {/* Selector de fechas */}
      {mostrarCalendario && (
        <div>
          <p>Selecciona la fecha de reserva:</p>
          <input
            type="date"
            onChange={(e) => handleSeleccionarFecha(new Date(e.target.value))}
          />
        </div>
      )}

      {fechaReserva && (
        <div>
          <p>Fecha seleccionada: {fechaReserva.toDateString()}</p>
          {/* Aquí puedes mostrar más detalles o enviar la fecha al backend para la reserva */}
          <button onClick={() => mostrarAlerta("Reserva completada para el " + fechaReserva)}>
            Confirmar Reserva
          </button>
        </div>
      )}
    </div>
  );
};

const funcion = () =>{
  return (<Layout content={
    <>
    <h1>Bievenido a la sección de prestamos</h1>
    <FormularioBiblio></FormularioBiblio>
    </>
  }></Layout>
  )
}



export default funcion

