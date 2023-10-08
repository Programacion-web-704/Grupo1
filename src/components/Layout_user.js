import Link from 'next/link'
import Head from 'next/head'

export default props1 => (
    <>
        <header>
        </header>
        <nav>
            <ul>
                <li><Link href="/user">Inicio</Link></li>
                <li><Link href="/perfil_user">Perfil</Link></li>
                <li><Link href="/prestamos">Prestamos</Link></li>
            </ul>
        </nav>



        <main>
            {props1.content}
        </main>
        <footer>
            <p>Ingenieria de Sistemas &copy; 2023-2 - Programacion Web 704-Grupo 1</p>
        </footer>

    </>
)
