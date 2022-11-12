import React from "react";
import Image from "next/image";
import Link from "next/link";
import { displayNumber, displayType } from "/src/helpers/format";

const Detail = ({ pokemon, species }) => (
  <div className="container m-auto md:px-8 px-4">
    <div className="md:text-4xl text-3xl font-semibold">
      <div className="border-b lg:py-16 py-12 flex gap-2">
        <Link href="/">
          <h1>Pokédex</h1>
        </Link>
        <h1>/</h1>
        <h1 className="capitalize" style={{ color: species.color.name }}>
          {pokemon.name}
        </h1>
      </div>
    </div>
    <div className="lg:my-16 my-8 md:flex gap-8">
      <div className="md:w-2/5 relative mb-8">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={350}
          height={350}
          priority
        />
      </div>
      <div className="md:w-3/5">
        <p>{displayNumber(pokemon.id)}</p>
        <h3 className="lg:text-5xl text-4xl font-bold capitalize mb-2">
          {pokemon.name}
        </h3>
        <div className="flex gap-2 py-2">
          {pokemon.types.map((type, index) => (
            <div
              key={index}
              className={`rounded px-2 py-0.5 ${displayType(type.type.name)}`}
            >
              <p className="capitalize text-sm">{type.type.name}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center md:mt-16 mt-8 mb-3">
          <p className="w-40">Height</p>
          <p>{pokemon.height / 10} m</p>
        </div>
        <div className="flex items-center mb-3">
          <p className="w-40">Weight</p>
          <p>{pokemon.weight / 10} kg</p>
        </div>
        <div className="flex items-center mb-3">
          <p className="w-40">Abilities</p>
          <p className="capitalize">
            {pokemon.abilities.map((abilities, index) => (
              <span key={index}>
                {index + 1 === pokemon.abilities.length
                  ? abilities.ability.name
                  : `${abilities.ability.name}, `}
              </span>
            ))}
          </p>
        </div>
        <div className="flex items-center mb-3">
          <p className="w-40">Habitat</p>
          <p className="capitalize">{species.habitat.name}</p>
        </div>
        <p className="font-semibold text-lg pt-8 pb-4">Stats</p>
        {pokemon.stats.map((stat, index) => (
          <div className="flex items-center mb-3" key={index}>
            <p key={index} className="w-40 capitalize">
              {stat.stat.name === "hp"
                ? "HP"
                : stat.stat.name.replace("-", " ")}
            </p>
            {Array(Math.floor(stat.base_stat / 10))
              .fill(null)
              .map((_, i) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#fde047"
                  className="w-6 h-6 inline-flex"
                  key={i}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Detail;
