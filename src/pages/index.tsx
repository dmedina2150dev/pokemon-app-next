import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { Button } from '@nextui-org/react';


const HomePage: NextPage = () => {
  return (
    <Layout title='Listado de Pokémons'>
      <h1>Hola Mundo</h1>
      <Button color='gradient'>
        Hola Mundo
      </Button>
    </Layout>
  )
}

export default HomePage;
