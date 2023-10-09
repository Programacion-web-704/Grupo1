import Link from "next/link"
import Head from 'next/head'
import Layout from '../components/Layout_admin.js'
import Image from "next/image.js"

const Index = () => <Layout content={

    <>
    <div>
        <h1>Bienvenido admin</h1>
        <Image src="/img.png" width={200} height={300}></Image>


    </div>
    </>
} />

export default Index


