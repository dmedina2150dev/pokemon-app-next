import { NextPage, GetStaticProps } from 'next';

import { Layout } from '@/components/layouts';
import { pokeApi } from '@/api';
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { PokemonList } from '@/components/pokemon';

interface Props {
	pokemons: SmallPokemon[];
}

/**
 * 
 * @param props reciben la informacion que enviamos desde la funcion getStaticProps
 * @returns 
 */
const HomePage: NextPage<Props> = ({ pokemons }) => {

	// console.log({ pokemons })

	return (
		<Layout title='Listado de Pokémons'>
			<PokemonList pokemons={ pokemons }/>
		</Layout>
	)
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async (ctx) => {

	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
	// console.log(data)
	// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"

	const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => {

		return {
			...pokemon,
			img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`,
			id: i + 1
		}
	});

	return {
		props: {
			pokemons
		}
	}
}


export default HomePage;
