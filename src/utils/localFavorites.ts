

const toogleFavorite = ( id: number ) => {

    console.log('toogleFavorite llamado')

    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

    if( favorites.includes( id ) ) {
        favorites = favorites.filter( pokeId => pokeId !== id )
    } else {
        favorites.push( id );
    }

    localStorage.setItem('favorites', JSON.stringify( favorites ));

}

const exitInFavorites = ( id: number ): boolean => {

    if( typeof window === 'undefined' ) return false;

    const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

    return favorites.includes( id );
}

export default {
    toogleFavorite,
    exitInFavorites
}