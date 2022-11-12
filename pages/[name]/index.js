import React from "react";
import Head from "next/head";
import Detail from "/src/contents/Detail";

const DetailPage = (props) => (
  <>
    <Head>
      <title>Pokédex | Detail</title>
    </Head>
    <main>
      <Detail {...props} />
    </main>
  </>
);

export async function getServerSideProps(context) {
  const { name } = context.query;
  const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  );
  return {
    props: {
      pokemon: await pokemonRes.json(),
      species: await speciesRes.json(),
    },
  };
}

export default DetailPage;
