import { useEffect, useState } from "react";

import { localFavorites } from "@/utils";
import { Layout } from "@/components/layouts";
import NoFavorites from "@/components/ui/NoFavorites";


const FavoritesPage = () => {

  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons( localFavorites.pokemons );
  
  }, [])
  

  return (
    <Layout title="Pokémons - Favorites">
      <NoFavorites />
    </Layout>
  )
}

export default FavoritesPage;