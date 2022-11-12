import React from "react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroller";
import { displayNumber, displayType } from "/src/helpers/format";

const Card = ({
  data,
  loadMore,
  hasMore,
  activeCompare,
  selectedCompare,
  onSelectCard,
}) => {
  const fullySelected = selectedCompare.length === 2;
  //   let className = "bg-black text-white";
  //   switch (type) {
  //     case "normal":
  //       className = "bg-yellow-600 text-white";
  //       break;
  //     case "fighting":
  //       className = "bg-red-900 text-white";
  //       break;
  //     case "flying":
  //       className = "bg-sky-300 text-black";
  //       break;
  //     case "poison":
  //       className = "bg-purple-400 text-white";
  //       break;
  //     case "ground":
  //       className = "bg-amber-600 text-white";
  //       break;
  //     case "rock":
  //       className = "bg-stone-500 text-white";
  //       break;
  //     case "bug":
  //       className = "bg-green-700 text-white";
  //       break;
  //     case "ghost":
  //       className = "bg-violet-800 text-white";
  //       break;
  //     case "steel":
  //       className = "bg-indigo-400 text-white";
  //       break;
  //     case "fire":
  //       className = "bg-orange-500 text-white";
  //       break;
  //     case "water":
  //       className = "bg-sky-500 text-white";
  //       break;
  //     case "grass":
  //       className = "bg-lime-600 text-white";
  //       break;
  //     case "electric":
  //       className = "bg-yellow-300 text-black";
  //       break;
  //     case "psychic":
  //       className = "bg-fuchsia-400	text-white";
  //       break;
  //     case "ice":
  //       className = "bg-blue-400 text-white";
  //       break;
  //     case "dragon":
  //       className = "bg-indigo-900 text-white";
  //       break;
  //     case "dark":
  //       className = "bg-yellow-900 text-white";
  //       break;
  //     case "fairy":
  //       className = "bg-pink-400 text-white";
  //       break;
  //     case "unknown":
  //       className = "bg-black text-white";
  //       break;
  //     case "shadow":
  //       className = "bg-zinc-400 text-white";
  //       break;
  //   }
  //   return className;
  // };

  const cardComponent = (val) => (
    <div className="border rounded">
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
        <div className="flex flex-wrap gap-2 mb-2">
          {val.pokemons[0].types.map((type, index) => (
            <div
              key={index}
              className={`rounded px-2 py-0.5 ${displayType(type.type.name)}`}
            >
              <p className="capitalize text-sm">{type.type.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
        {data.map((val, index) =>
          activeCompare ? (
            <button
              type="button"
              className="relative text-left md:w-full w-3/4 m-auto"
              onClick={() => onSelectCard(val)}
              key={index}
            >
              <div className="absolute top-1 right-1 z-10">
                {selectedCompare.includes(val) ? (
                  <div className="text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    className={`w-7 h-7 rounded-full border-2 ${
                      fullySelected
                        ? "bg-slate-400 border-slate-400"
                        : "border-black"
                    }`}
                  />
                )}
              </div>
              {cardComponent(val)}
            </button>
          ) : (
            <Link href={`/${val.name}`} key={index}>
              <div className="md:w-full w-3/4 m-auto">{cardComponent(val)}</div>
            </Link>
          )
        )}
      </div>
    </InfiniteScroll>
  );
};

export default Card;
