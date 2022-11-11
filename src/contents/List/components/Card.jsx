import React from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroller";

const Card = ({ data, loadMore, hasMore }) => {
  const displayNumber = (id) => {
    if (id < 10) {
      return `#00${id}`;
    }
    if (id < 100) {
      return `#0${id}`;
    }
    return `#${id}`;
  };

  const displayType = (type) => {
    let className = "bg-black text-white";
    switch (type) {
      case "normal":
        className = "bg-yellow-600 text-white";
        break;
      case "fighting":
        className = "bg-red-900 text-white";
        break;
      case "flying":
        className = "bg-sky-300 text-black";
        break;
      case "poison":
        className = "bg-purple-400 text-white";
        break;
      case "ground":
        className = "bg-amber-600 text-white";
        break;
      case "rock":
        className = "bg-stone-500 text-white";
        break;
      case "bug":
        className = "bg-green-700 text-white";
        break;
      case "ghost":
        className = "bg-violet-800 text-white";
        break;
      case "steel":
        className = "bg-indigo-400 text-white";
        break;
      case "fire":
        className = "bg-orange-500 text-white";
        break;
      case "water":
        className = "bg-sky-500 text-white";
        break;
      case "grass":
        className = "bg-lime-600 text-white";
        break;
      case "electric":
        className = "bg-yellow-300 text-black";
        break;
      case "psychic":
        className = "bg-fuchsia-400	text-white";
        break;
      case "ice":
        className = "bg-blue-400 text-white";
        break;
      case "dragon":
        className = "bg-indigo-900 text-white";
        break;
      case "dark":
        className = "bg-yellow-900 text-white";
        break;
      case "fairy":
        className = "bg-pink-400 text-white";
        break;
      case "unknown":
        className = "bg-black text-white";
        break;
      case "shadow":
        className = "bg-zinc-400 text-white";
        break;
    }
    return className;
  };

  return (
    <InfiniteScroll
      threshold={0}
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={
        <div key={0} className="flex gap-4 items-center justify-center my-8">
          <div className="animate-spin h-6 w-6 rounded-full border-4 dark:border-white border-black dark:border-t-red-500" />
          <p>Loading...</p>
        </div>
      }
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {data.map((val) => (
          <div className="border rounded md:w-full w-3/4 m-auto" key={val.id}>
            <div className="relative bg-gray-200 border-b p-6">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${val.id}.png`}
                alt={val.name}
                width={200}
                height={200}
                priority
                className="m-auto"
              />
            </div>
            <div className="p-4">
              <small>{displayNumber(val.id)}</small>
              <h3 className="text-2xl font-bold capitalize mb-2">{val.name}</h3>
              <div className="flex gap-2 mb-2">
                {val.pokemons[0].types.map((type, index) => (
                  <div
                    key={index}
                    className={`rounded px-2 py-0.5 ${displayType(
                      type.type.name
                    )}`}
                  >
                    <p className="capitalize text-sm">{type.type.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Card;
