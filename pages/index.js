import Head from "next/head";
import List from "/src/contents/List";

const HomePage = (props) => (
  <>
    <Head>
      <title>Pokédex</title>
    </Head>
    <main>
      <List {...props} />
    </main>
  </>
);

export async function getServerSideProps(context) {
  const hasContextQuery = Object.keys(context.query).length > 0;
  let query = {};
  if (context.query.types) {
    query = {
      pokemon_v2_pokemons: {
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _in: context.query.types.split(",") } },
        },
      },
    };
  }
  if (context.query.generations) {
    query = {
      pokemon_v2_generation: {
        name: { _in: context.query.generations.split(",") },
      },
    };
  }
  const typeRes = await fetch("https://pokeapi.co/api/v2/type");
  const generationRes = await fetch("https://pokeapi.co/api/v2/generation");
  const speciesRes = await fetch("https://pokeapi.co/api/v2/pokemon-species");
  const listRes = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "post",
    body: JSON.stringify({
      query: `query getPokemons{species: pokemon_v2_pokemonspecies(limit: 21, offset: 0, order_by: {id: asc}, ${
        hasContextQuery
          ? `where: ${JSON.stringify(query).replace(/"([^"]+)":/g, "$1:")}`
          : ""
      }) {
        id
        name
        pokemons: pokemon_v2_pokemons {
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              name
            }
          }
        }
        generation: pokemon_v2_generation {
          name
        }
      }}`,
    }),
  });
  const props = {
    types: await typeRes.json(),
    generations: await generationRes.json(),
    species: await speciesRes.json(),
    list: await listRes.json(),
  };
  return { props };
}

export default HomePage;
