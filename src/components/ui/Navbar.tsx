import Image from 'next/image';
import NextLink from 'next/link';


import { Link, Row, Spacer, Text, useTheme } from '@nextui-org/react';


export const Navbar = () => {

    /**
     * ? Este Hook viene de NextUI el cual nos trae la información del tema
     * TODO: Estos son los valores que podemos extraer o desestructurar del hook useTheme()
     * @theme La información del tema
     * @isDark Un booleano que indica si el tema es dark
     * @type indica el tipo del tema
     */
    const { theme, isDark, type } = useTheme();
    // console.log({theme, isDark, type})


    return (
        <header style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0 20px',
            backgroundColor: theme?.colors.gray50.value
        }}>
            <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                alt="Icono de la app"
                width={60}
                height={60}
            />
            <NextLink href='/' passHref>
                <Row css={{ display: 'flex', alignItems: 'center' }}>
                    <Text color='white' h2>P</Text>
                    <Text color='white' h3>okémon</Text>
                </Row>
            </NextLink>

            <Spacer css={{ flex: 1 }} />

            <NextLink href='/favorites' passHref>
                <Text color='white'>Favoritos</Text>
            </NextLink>
        </header>
    )
}
