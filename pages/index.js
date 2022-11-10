import Head from "next/head";
import List from "../src/contents/List";

const Home = (props) => (
  <>
    <Head>
      <title>Pokédex</title>
      <meta name="description" content="Pokédex by Umi Nadhiroh" />
      <link rel="icon" href="/pokemon-icon.png" />
    </Head>
    <main>
      <List {...props} />
    </main>
  </>
);

export async function getServerSideProps() {
  const typeRes = await fetch("https://pokeapi.co/api/v2/type");
  const generationRes = await fetch("https://pokeapi.co/api/v2/generation");
  const props = {
    types: await typeRes.json(),
    generations: await generationRes.json(),
  };
  return { props };
}

export default Home;
