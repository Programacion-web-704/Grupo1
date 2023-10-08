
import Layout from "@/components/Layout_prestamo"
import { useState } from "react"

const FormularioBiblio=() => {
    const[keyword,setKeyword] = useState("")
    const[resultados,setResultados] = useState("")

    const[tipoRecurso,setTipoRecurso] = useState("")
    const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
    
    

    const handleCambioNombreLibro = (event)=> {
        setKeyword(event.target.value)
    }

    const handleCambioResulRecurso = (event)=> {
        setTipoRecurso(event.target.value)
    }
    
    const handleBusquedaEnviar = (event) =>{
        event.preventDefault()
        setResultados('Elementos encontrados para: ${keyword}')
    }

    const handleLimpiar =() =>{
       
        setKeyword("")
        setTipoRecurso("")
        setOpcionesSeleccionadas("")
    }

    const handleFiltros = (event) => {
        const opcion = event.target.value;
        if (opcionesSeleccionadas.includes(opcion)) {
          // Si la opción ya está seleccionada, quítala de las opciones seleccionadas
          const nuevasOpciones = opcionesSeleccionadas.filter((item) => item !== opcion);
          setOpcionesSeleccionadas(nuevasOpciones);
        } else {
          // Si la opción no está seleccionada, agrégala a las opciones seleccionadas
          setOpcionesSeleccionadas([...opcionesSeleccionadas, opcion]);
        }
      };
    return (
        <div>
            
            <form onSubmit={handleBusquedaEnviar}>
            <h3>Ingrese palabra clave </h3>
                <input 
                type="text"
                value={keyword}
                onChange={handleCambioNombreLibro}
                />
            <h4>Ingrese tipo de recurso</h4>
            <input
                type="text"
                value={tipoRecurso}
                onChange={handleCambioResulRecurso}
                />
            
            <div>
                <h4>Incluir busqueda en : </h4>
           
                <label> 
                <input
                type="checkbox"
                value="filtro1"
                checked={opcionesSeleccionadas.includes("filtro1")}
                onChange={handleFiltros}
                />
                Título
                </label>
                <br/>

                <label>
                <input
                type="checkbox"
                value="filtro2"
                checked={opcionesSeleccionadas.includes("filtro2")}
                onChange={handleFiltros}
                />
                Autor
                </label>
                <br/>
                <label>
                <input
                type="checkbox"
                value="filtro3"
                checked={opcionesSeleccionadas.includes("filtro3")}
                onChange={handleFiltros}
                />
                Serie
                </label>
                <br/>

                <label>
                <input
                type="checkbox"
                value="filtro4"
                checked={opcionesSeleccionadas.includes("filtro4")}
                onChange={handleFiltros}
                />
                ISBN
                </label>



          
            </div>
            </form>
            <button type="submit">Buscar</button>    
            <button type="button" onClick={handleLimpiar}>Limpiar</button>

            {resultados && <p>{resultados}</p>}
        </div>
    )
}



const Prestamo = ()=> {
    return( <Layout content={
        <>
            <div>
                <FormularioBiblio/>
            </div>
        </>
         }
    ></Layout>
        
    )
}
export default Prestamo