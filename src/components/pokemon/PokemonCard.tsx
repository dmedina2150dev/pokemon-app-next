import { FC } from 'react';
import { Card, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

import { SmallPokemon } from '@/interfaces'


interface Props {
    pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

    /**
    * ? Este Hook de Next nos trae la informacion del router filesystem que estamos usando.
    */
    const router = useRouter();
    // console.log(router)

    const onClick = () => {
        router.push(`/name/${pokemon.name}`);
    }

    return (
        <Card isHoverable isPressable onClick={onClick}>
            <Card.Body css={{ p: 1 }}>
                <Card.Image src={pokemon.img} width="100%" height={140} />
            </Card.Body>
            <Card.Footer>
                <Row justify='space-between'>
                    <Text transform='capitalize'>{pokemon.name}</Text>
                    <Text>#{pokemon.id}</Text>
                </Row>
            </Card.Footer>
        </Card>
    )
}
