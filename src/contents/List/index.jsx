import React, { useState } from "react";
import Card from "./Card";
import Generations from "./Generations";
import Types from "./Types";

const List = ({ types, generations, species, list }) => {
  const [offset, setOffset] = useState(21);

  const hasMore = species.count - offset > 21;

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }
    for (let i = offset; i < offset + 21; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
      const data = await res.json();
      list[i] = {
        id: data.id,
        name: data.species.name,
        types: data.types.map((type) => type.type.name),
        image: data.sprites.other["official-artwork"].front_default,
      };
      setOffset(i + 1);
    }
  };

  return (
    <div className="container m-auto">
      <div className="border-b py-16">
        <h1 className="text-5xl font-semibold">Pokédex</h1>
      </div>
      <div className="flex gap-16 py-8">
        <div className="w-1/4 sticky top-0 h-fit">
          <form className="grid grid-cols-1 divide-y">
            <Types types={types} />
            <Generations generations={generations} />
          </form>
        </div>
        <div className="w-3/4 py-8">
          <Card list={list} loadMore={loadMore} hasMore={hasMore} />
        </div>
      </div>
    </div>
  );
};

export default List;
