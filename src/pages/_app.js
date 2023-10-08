import '../estilos/todo.css'
import '../estilos/header.css'
import '../estilos/nav.css'
import '../estilos/cuerpo.css'
import '../estilos/media.css'
import '../estilos/div.css'
import '../estilos/footer.css'
import '../estilos/button.css'
import '../estilos/loginstyle.css'


import { AppProps } from 'next/app'
import { DemoProvider } from './context/demo'

/*
export default function MyApp( {Component, pageProps}) {
    return <Component { ...pageProps} />
}
*/

export default function MyApp({ Component, pageProps }) {
    return (
        <DemoProvider>
            <Component {...pageProps} />
        </DemoProvider>
    )
}
