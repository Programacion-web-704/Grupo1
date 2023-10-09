import Link from "next/link"
import Head from 'next/head'
import Layout from '../components/Layout_user.js'
import Image from "next/image.js"

const Index2 = () => <Layout content={

    <>
        <div>
            <h1>Bienvenido usuario</h1>
            <h4><p>Ultimas reservas</p></h4>
            <Image src="/img3.jpg" width={200} height={300}></Image>
        </div>

    </>
} />

export default Index2


