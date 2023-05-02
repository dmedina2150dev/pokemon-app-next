import { useEffect, useState } from "react";
import { Card, Grid } from "@nextui-org/react";

import { localFavorites } from "@/utils";
import { Layout } from "@/components/layouts";
import { NoFavorites } from "@/components/ui/NoFavorites";
import { FavoriteList } from "@/components/pokemon";



const FavoritesPage = () => {

  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons( localFavorites.pokemons );
  
  }, [])
  
  return (
    <Layout title="Pokémons - Favorites">

      {
        favoritesPokemons.length === 0
          ? ( <NoFavorites /> )
          : ( <FavoriteList pokemons={ favoritesPokemons }/> )
      }
      
    </Layout>
  )
}

export default FavoritesPage;