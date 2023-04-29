import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
    title?: string
}
/**
 * ? PropsWithChildren -> Nos sirven para tipar con Typescript cuando el componente trae hijos los (children)
 * ? PropsWithChildren<Props> -> Le asignamos una interface o type que contenga el tipado de Typescript de nuestras (props)
 */
export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{ title || 'Pokemom App' }</title>
                <meta name="author" content="Dajan Medina" />
                <meta name="description" content={`Información sobre el pokémon ${ title }`} />
                <meta name="keywords" content={`${ title }, pokemon, pokedex`} />
            </Head>

            {/* Navbar */}
            <Navbar />

            <main className="main">
                { children }
            </main>
        </>
    )
}
