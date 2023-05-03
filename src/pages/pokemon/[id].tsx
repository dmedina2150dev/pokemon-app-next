import { useState } from 'react';

import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { Layout } from '@/components/layouts';
import { Pokemon } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';

interface Props {
	pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

	const [isInFavorites, setIsInFavorites] = useState( localFavorites.exitInFavorites( pokemon.id ) );

	const onToogleFavoites = () => {
		// console.log('ID:', pokemon.id);
		localFavorites.toogleFavorite( pokemon.id );
		setIsInFavorites( !isInFavorites );

		if( isInFavorites ) return;

		confetti({
			zIndex: 999,
			particleCount: 1000,
			spread: 160,
			angle: -100,
			origin: {
				x: 1,
				y: 0,
			}
		})
	}
	
	return (
		<Layout title={ pokemon.name }>
			<Grid.Container css={{marginTop: '5px' }} gap={ 2 }>
				<Grid xs={ 12 } sm={ 4 }>
					<Card isHoverable css={{ padding: '30px' }}>
						<Card.Body>
							<Card.Image 
								src={ pokemon.sprites?.other?.dream_world.front_default || '/no-image.png' }
								alt={ pokemon.name }
								width="100%"
								height={ 200 }
							/>
						</Card.Body>
					</Card>
				</Grid>

				<Grid xs={ 12 } sm={ 8 }>
					<Card>
						<Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text h1 transform='capitalize'>{ pokemon.name }</Text>

							<Button
								color='gradient'
								ghost={ !isInFavorites }
								onPress={ onToogleFavoites }
							>
								{ (isInFavorites) ? 'En Favoritos' : 'Guardar en Favoritos' }
							</Button>
						</Card.Header>

						<Card.Body>
							<Text size={ 30 }>Sprites:</Text>

							<Container display='flex' direction='row' gap={ 0 }>
								<Image 
									src={ pokemon.sprites.front_default }
									alt={ pokemon.name }
									width={ 100 }
									height={ 100 }
								/>
								<Image 
									src={ pokemon.sprites.back_default }
									alt={ pokemon.name }
									width={ 100 }
									height={ 100 }
								/>
								<Image 
									src={ pokemon.sprites.front_shiny }
									alt={ pokemon.name }
									width={ 100 }
									height={ 100 }
								/>
								<Image 
									src={ pokemon.sprites.back_shiny }
									alt={ pokemon.name }
									width={ 100 }
									height={ 100 }
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

	const pokemons151 = [...Array(151)].map((value, index) => `${ index + 1 }`);

	return {
		paths: pokemons151.map(id => ({
			params: { id }
		})),
		// fallback: false
		fallback: 'blocking' // ? Se cambia a blocking para permitir el ISG (Incremental Static Generation)
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

	const { id } = params as { id: string};

	const pokemon = await getPokemonInfo( id );

	if( !pokemon ) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {
			pokemon
		},
		// ? Con esto hacemos que la pagina se vuelva a validar o recrear en el tiempo indicado en segundo
		// * Sirve para cuando tenemos contenido en la pagina que pudo cambiar.
		revalidate: 86400, // 60 * 60 * 24
	}
}

export default PokemonPage;