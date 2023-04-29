import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

interface Props {
    title?: string
}

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

            <main>
                { children }
            </main>
        </>
    )
}
