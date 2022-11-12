import React from "react";
import Head from "next/head";
import Compare from "/src/contents/Compare";

const DetailPage = (props) => (
  <>
    <Head>
      <title>Pokédex | Compare</title>
    </Head>
    <main>
      <Compare {...props} />
    </main>
  </>
);

export async function getServerSideProps(context) {
  const { name } = context.query;
  const firstPokemonRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.split(",")[0]}`
  );
  const firstSpeciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name.split(",")[0]}`
  );
  const secondPokemonRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.split(",")[1]}`
  );
  const secondSpeciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name.split(",")[1]}`
  );
  return {
    props: {
      firstPokemon: await firstPokemonRes.json(),
      firstSpecies: await firstSpeciesRes.json(),
      secondPokemon: await secondPokemonRes.json(),
      secondSpecies: await secondSpeciesRes.json(),
    },
  };
}

export default DetailPage;
