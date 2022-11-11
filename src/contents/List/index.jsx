import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "./Card";
import Generations from "./Generations";
import Types from "./Types";

const List = ({ types, generations, species, list }) => {
  const router = useRouter();
  const { types: typesParam, generations: generationsParam } = router.query;
  const [offset, setOffset] = useState(21);
  const [data, setData] = useState(list);

  const hasMore = species.count - offset > 21;
  let bodyQuery = {};
  if (typesParam) {
    bodyQuery = {
      pokemon_v2_pokemons: {
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _in: typesParam.split(",") } },
        },
      },
    };
  }
  if (generationsParam) {
    bodyQuery = {
      pokemon_v2_generation: { name: { _in: generationsParam.split(",") } },
    };
  }

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }
    let queryString = "";
    if (Object.keys(bodyQuery).length > 0) {
      queryString = `where: ${JSON.stringify(bodyQuery).replace(
        /"([^"]+)":/g,
        "$1:"
      )}`;
    }
    const listRes = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "post",
      body: JSON.stringify({
        query: `query getPokemons{species: pokemon_v2_pokemonspecies(limit: ${
          offset + 21
        }, offset: 0, order_by: {id: asc}, ${queryString}) {
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
    setData(await listRes.json());
    setOffset(offset + 21);
  };

  const setRouterQuery = (newValues, type) => {
    let query = {};
    if (typesParam) {
      query = { ...query, types: typesParam };
    }
    if (generationsParam) {
      query = { ...query, generations: generationsParam };
    }

    if (type === "types") {
      if (newValues.length > 0) {
        query = { ...query, types: newValues.toString() };
      } else {
        delete query.types;
      }
    }

    if (type === "generations") {
      if (newValues.length > 0) {
        query = { ...query, generations: newValues.toString() };
      } else {
        delete query.generations;
      }
    }

    router.push({ pathname: "/", query }, undefined, {
      scroll: false,
      shallow: false,
    });
  };

  const fetchList = async (newValues, type) => {
    if (type === "types" && newValues.length > 0) {
      bodyQuery = {
        ...bodyQuery,
        pokemon_v2_pokemons: {
          pokemon_v2_pokemontypes: {
            pokemon_v2_type: { name: { _in: newValues } },
          },
        },
      };
    } else {
      delete bodyQuery.pokemon_v2_pokemons;
    }

    if (type === "generations" && newValues.length > 0) {
      bodyQuery = {
        ...bodyQuery,
        pokemon_v2_generation: { name: { _in: newValues } },
      };
    } else {
      delete bodyQuery.pokemon_v2_generation;
    }

    let queryString = "";
    if (Object.keys(bodyQuery).length > 0) {
      queryString = `where: ${JSON.stringify(bodyQuery).replace(
        /"([^"]+)":/g,
        "$1:"
      )}`;
    }

    const listRes = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "post",
      body: JSON.stringify({
        query: `query getPokemons{species: pokemon_v2_pokemonspecies(limit: 21, offset: 0, order_by: {id: asc}, ${queryString} ) {
        id
        name
        pokemons: pokemon_v2_pokemons {
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              name
            }
          }
        }
      }}`,
      }),
    });
    setData(await listRes.json());
    setOffset(21);
  };

  const onFilter = async (value, type) => {
    let newValues =
      type === "generations"
        ? generationsParam?.split(",") || []
        : typesParam?.split(",") || [];

    if (newValues.includes(value)) {
      newValues = newValues.filter((type) => type !== value);
    } else {
      newValues.push(value);
    }

    setRouterQuery(newValues, type);
    fetchList(newValues, type);
  };

  return (
    <div className="container m-auto">
      <div className="border-b py-16">
        <h1 className="text-5xl font-semibold">Pokédex</h1>
      </div>
      <div className="flex gap-16 py-8">
        <div className="w-1/4 sticky top-0 h-fit">
          <form className="grid grid-cols-1 divide-y">
            <Types
              types={types}
              typesParam={typesParam?.split(",")}
              onFilter={onFilter}
            />
            <Generations
              generations={generations}
              generationsParam={generationsParam?.split(",")}
              onFilter={onFilter}
            />
          </form>
        </div>
        <div className="w-3/4 py-8">
          <Card
            data={data.data.species}
            loadMore={loadMore}
            hasMore={hasMore}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
