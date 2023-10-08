export default function otroEjemplito(req, res) {

    if ( req.method !== 'POST') {
        res.status(405).send( { message : "Solo funciona con POST !!"})

    } else if ( req.method == 'POST') {
        // Leer los valores recibidos
        console.log("BODY : " , req.body)
        const body = JSON.stringify(req.body).
                                    replace("'",'"')
        const params = JSON.parse(body)

        res.status(200).json(
            {
            DatosPersonales:{
               nombre : `${params['jsonObject'].Nombre}`,
               apellidos : `${params['jsonObject'].Apellidos}`,
               tipoDoc : `${params['jsonObject'].tipoDoc}`,
               nroDoc : `${params['jsonObject'].nroDoc}`,
            },
            Cuenta:{
                correo:`${params['jsonObject'].CuentaUsuario}`,
                contraseña:`${params['jsonObject'].Password}`,
            },
            Preferencias:{
                idioma:`${params['jsonObject'].Idioma}`,
                prefijo:`${params['jsonObject'].Prefijo}`,
                color:`${params['jsonObject']}`
            },
        }
        )
    }

}
