import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

import { Layout } from '@/components/layouts';
import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces';

interface Props {
	pokemon: Pokemon;
}


const PokemonPage: NextPage<Props> = ({ pokemon }) => {

	return (
		<Layout>
			<h1>{ pokemon.name }</h1>
		</Layout>
	)
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
/**
 * ? dynamic routes es el path o es lo que estamos usando al usar el router fileSystem con el archivo con un nombre [param].tsx o [param].jsx
 */
export const getStaticPaths: GetStaticPaths = async (ctx) => {

	const pokemons151 = [...Array(151)].map((value, index) => `${ index + 1 }`)
	// console.log({pokemons151})
	/**
	 * ? Estos paths son los que vamos a permitir o a generar en el Build Time. Le decimos a Next cuantos argumentos podra recibir en ese punto.
	 * * La cantidad de paths es la cantidad de paginas que se van a pre generar de forma dinamica en el Build Time de la aplicacion
	 */

	return {
		// paths: [
		// 	{
		// 		params: { id: '1' },
		// 	},
		// 	{
		// 		params: { id: '2' },
		// 	},
		// 	{
		// 		params: { id: '3' },
		// 	}
		// ],
		paths: pokemons151.map(id => ({
			params: { id }
		})),
		fallback: false
	}

	/**
	 * ! fallback: "blocking"
	 * ? Este argumento permite que controlemos dentro de la funcion de la pagina cuando se recibe un paramtro que no esta registrado en los paths
	 * * Es decir el "blocking" deja pasar la peticion
	 * * Si cambiamos el valor a false, no dejara pasar la peticion. Si el path no existe en los definidos manda un 404
	 */
}

/**
 * ! Luego de ejecutarse los paths recibimos esos argumentos que enviamos en los parametros [params]
 * * Para utilizar los parametros se leen desde el contexto (ctx)
 * * Y asi con esta data buscar la informcion correspondiente como lo habiamos hecho con getStaticProps en index
 */

export const getStaticProps: GetStaticProps = async ({ params }) => {

	const { id } = params as { id: string};

	const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

	return {
		props: {
			pokemon: data
		}
	}
}

export default PokemonPage;