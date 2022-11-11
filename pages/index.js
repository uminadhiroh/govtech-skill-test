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
  const speciesRes = await fetch("https://pokeapi.co/api/v2/pokemon-species");
  const list = [];
  for (let i = 0; i < 21; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
    const data = await res.json();
    list[i] = {
      id: data.id,
      name: data.species.name,
      types: data.types.map((type) => type.type.name),
      image: data.sprites.other["official-artwork"].front_default,
    };
  }
  const props = {
    types: await typeRes.json(),
    generations: await generationRes.json(),
    species: await speciesRes.json(),
    list,
  };
  return { props };
}

export default Home;
