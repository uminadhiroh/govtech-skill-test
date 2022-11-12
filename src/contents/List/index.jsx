import React, { useState } from "react";
import { useRouter } from "next/router";
import Card from "./components/Card";
import Compare from "./components/Compare";
import Filter from "./components/Filter";
import Menu from "./components/Menu";

const List = ({ types, generations, species, list }) => {
  const router = useRouter();
  const { types: typesParam, generations: generationsParam } = router.query;
  const [offset, setOffset] = useState(21);
  const [data, setData] = useState(list);
  const [showFilter, setShowFilter] = useState(false);
  const [activeCompare, setActiveCompare] = useState(false);
  const [selectedCompare, setSelectedCompare] = useState([]);
  const [keyState, setKeyState] = useState(0);

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

  const onClickCompare = () => {
    setActiveCompare(!activeCompare);
    setSelectedCompare([]);
  };

  const onSelectCard = (name) => {
    const fullySelected = selectedCompare.length === 2;
    let newValues = selectedCompare;
    if (fullySelected && !newValues.includes(name)) {
      return;
    }
    if (newValues.includes(name)) {
      newValues = newValues.filter((val) => val !== name);
    } else {
      newValues.push(name);
    }
    setSelectedCompare(newValues);
    setKeyState(keyState + 1);
  };

  return (
    <div className="container relative m-auto md:px-8 px-4">
      <div className="border-b lg:py-16 py-12">
        <h1 className="md:text-4xl text-3xl font-semibold">Pokédex</h1>
      </div>
      <Menu
        activeCompare={activeCompare}
        setShowFilter={setShowFilter}
        onClickCompare={onClickCompare}
      />
      <div className="md:flex xl:gap-16 gap-8 lg:py-8">
        <Filter
          showFilter={showFilter}
          activeCompare={activeCompare}
          types={types}
          typesParam={typesParam}
          generations={generations}
          generationsParam={generationsParam}
          onFilter={onFilter}
          setShowFilter={setShowFilter}
          onClickCompare={onClickCompare}
        />
        <div className="md:w-3/4 w-full py-8">
          <Card
            data={data.data.species}
            loadMore={loadMore}
            hasMore={hasMore}
            activeCompare={activeCompare}
            selectedCompare={selectedCompare}
            onSelectCard={onSelectCard}
          />
        </div>
      </div>
      {selectedCompare.length > 0 && (
        <Compare
          selectedCompare={selectedCompare}
          onCompare={(url) => router.push(url)}
        />
      )}
    </div>
  );
};

export default List;
