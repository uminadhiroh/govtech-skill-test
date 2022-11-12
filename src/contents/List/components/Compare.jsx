import React from "react";
import Image from "next/image";

const Compare = ({ selectedCompare, onCompare }) => (
  <div className="lg:w-1/2 w-full fixed lg:inset-x-1/4 inset-x-0 bottom-0 z-10">
    <div className="rounded-t-lg bg-sky-600 text-white shadow-xl md:px-8 px-6 py-3">
      <div className="flex items-center justify-between md:gap-8 gap-6">
        <div className="flex flex-1 items-center justify-center md:gap-8 gap-6">
          <div className="text-center">
            <div className="relative w-fit bg-gray-200 rounded-full p-2">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedCompare[0].id}.png`}
                alt={selectedCompare[0].name}
                width={50}
                height={50}
                priority
                className="m-auto"
              />
            </div>
            <p className="font-semibold capitalize">
              {selectedCompare[0].name}
            </p>
          </div>
          {selectedCompare[1] && (
            <>
              <strong>vs</strong>
              <div className="text-center">
                <div className="relative w-fit bg-gray-200 rounded-full p-2">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedCompare[1].id}.png`}
                    alt={selectedCompare[1].name}
                    width={50}
                    height={50}
                    priority
                    className="m-auto"
                  />
                </div>
                <p className="font-semibold capitalize">
                  {selectedCompare[1].name}
                </p>
              </div>
            </>
          )}
        </div>
        {selectedCompare[1] && (
          <button
            type="button"
            className="flex items-center rounded-3xl bg-white text-sky-900 p-0.25"
            onClick={() =>
              onCompare({
                pathname: "/compare",
                query: {
                  name: `${selectedCompare[0].name},${selectedCompare[1].name}`,
                },
              })
            }
          >
            <p className="font-semibold pl-8 pr-4 md:block hidden">Compare</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Compare;
