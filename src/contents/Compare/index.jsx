import React from "react";
import Image from "next/image";
import Link from "next/link";
import { displayNumber, displayType } from "/src/helpers/format";

const Compare = ({
  firstPokemon,
  firstSpecies,
  secondPokemon,
  secondSpecies,
}) => (
  <div className="container m-auto md:px-8 px-4">
    <div className="md:text-4xl text-3xl font-semibold">
      <div className="border-b lg:py-16 py-12 flex flex-wrap gap-2">
        <Link href="/">
          <h1>Pokédex</h1>
        </Link>
        <h1>/</h1>
        <h1 className="capitalize" style={{ color: firstSpecies.color.name }}>
          {firstPokemon.name}
        </h1>
        <h1>vs</h1>
        <h1 className="capitalize" style={{ color: secondSpecies.color.name }}>
          {secondPokemon.name}
        </h1>
      </div>
    </div>
    <div className="flex gap-8 py-16">
      <div className="w-2/5 dark:bg-gray-200 bg-gray-800 dark:text-black text-white rounded-xl">
        <div className="relative my-4">
          <Image
            src={firstPokemon.sprites.other["official-artwork"].front_default}
            alt={firstPokemon.name}
            width={250}
            height={250}
            priority
            className="m-auto"
          />
        </div>
        <div className="grid grid-cols-1 text-center divide-y divide-gray-400 lg:px-8 px-4">
          <div>
            <p>{displayNumber(firstPokemon.id)}</p>
            <h3 className="lg:text-4xl text-3xl font-bold capitalize mb-4">
              {firstPokemon.name}
            </h3>
          </div>
          <div className="flex justify-center gap-2 py-6">
            {firstPokemon.types.map((type, index) => (
              <div
                key={index}
                className={`rounded px-2 py-0.5 ${displayType(type.type.name)}`}
              >
                <p className="capitalize text-sm">{type.type.name}</p>
              </div>
            ))}
          </div>
          <div className="py-6">{firstPokemon.height / 10} m</div>
          <div className="py-6">{firstPokemon.weight / 10} kg</div>
          <div className="capitalize py-6">
            {firstPokemon.abilities.map((abilities, index) => (
              <span key={index}>
                {index + 1 === firstPokemon.abilities.length
                  ? abilities.ability.name
                  : `${abilities.ability.name}, `}
              </span>
            ))}
          </div>
          <div className="capitalize py-6">{firstSpecies.habitat.name}</div>
          {firstPokemon.stats.map((stat, index) => (
            <div className="py-6" key={index}>
              {Array(Math.floor(stat.base_stat / 10))
                .fill(null)
                .map((_, i) => (
                  <div className="text-yellow-500 inline-flex" key={i}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/5 text-center">
        <div
          className="font-bold lg:text-5xl text-4xl my-4"
          style={{ height: 250 }}
        >
          <div className="flex items-center justify-center h-full">
            <span>VS</span>
          </div>
        </div>
        <p className="lg:text-lg font-semibold pt-8 pb-4">Species</p>
        <p className="lg:text-lg font-semibold py-6">Types</p>
        <p className="lg:text-lg font-semibold py-6">Height</p>
        <p className="lg:text-lg font-semibold py-6">Weight</p>
        <p className="lg:text-lg font-semibold py-6">Abilities</p>
        <p className="lg:text-lg font-semibold py-6">Habitat</p>
        <p className="lg:text-lg font-semibold py-6">HP</p>
        <p className="lg:text-lg font-semibold py-6">Attack</p>
        <p className="lg:text-lg font-semibold py-6">Defense</p>
        <p className="lg:text-lg font-semibold py-6">Special Attack</p>
        <p className="lg:text-lg font-semibold py-6">Special Defense</p>
        <p className="lg:text-lg font-semibold py-6">Speed</p>
      </div>
      <div className="w-2/5 dark:bg-gray-200 bg-gray-800 dark:text-black text-white rounded-xl">
        <div className="relative my-4">
          <Image
            src={secondPokemon.sprites.other["official-artwork"].front_default}
            alt={secondPokemon.name}
            width={250}
            height={250}
            priority
            className="m-auto"
          />
        </div>
        <div className="grid grid-cols-1 text-center divide-y divide-gray-400 lg:px-8 px-4">
          <div>
            <p>{displayNumber(secondPokemon.id)}</p>
            <h3 className="lg:text-4xl text-3xl font-bold capitalize mb-4">
              {secondPokemon.name}
            </h3>
          </div>
          <div className="flex justify-center gap-2 py-6">
            {secondPokemon.types.map((type, index) => (
              <div
                key={index}
                className={`rounded px-2 py-0.5 ${displayType(type.type.name)}`}
              >
                <p className="capitalize text-sm">{type.type.name}</p>
              </div>
            ))}
          </div>
          <div className="py-6">{secondPokemon.height / 10} m</div>
          <div className="py-6">{secondPokemon.weight / 10} kg</div>
          <div className="capitalize py-6">
            {secondPokemon.abilities.map((abilities, index) => (
              <span key={index}>
                {index + 1 === secondPokemon.abilities.length
                  ? abilities.ability.name
                  : `${abilities.ability.name}, `}
              </span>
            ))}
          </div>
          <div className="capitalize py-6">{secondSpecies.habitat.name}</div>
          {secondPokemon.stats.map((stat, index) => (
            <div className="py-6" key={index}>
              {Array(Math.floor(stat.base_stat / 10))
                .fill(null)
                .map((_, i) => (
                  <div className="text-yellow-500 inline-flex" key={i}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Compare;
