import React from "react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroller";
import { displayNumber, displayType } from "/src/helpers/format";

const Card = ({ data, loadMore, hasMore }) => (
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
        <Link href={`/${val.name}`} key={val.id}>
          <div className="border rounded md:w-full w-3/4 m-auto">
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
        </Link>
      ))}
    </div>
  </InfiniteScroll>
);

export default Card;
