import React from "react";
import Generations from "./Generations";
import Types from "./Types";

const Filter = ({
  showFilter,
  activeCompare,
  types,
  typesParam,
  generations,
  generationsParam,
  onFilter,
  setShowFilter,
  onClickCompare,
}) => (
  <div
    className={`md:w-1/4 md:block ${
      showFilter ? "w-full" : "hidden"
    } md:sticky fixed top-0 left-0 md:h-fit h-full z-10`}
  >
    <div className="md:relative absolute dark:bg-black bg-white w-full h-full">
      <button
        type="button"
        className="md:hidden block mt-6 mr-6 ml-auto"
        onClick={() => setShowFilter(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <form className="grid grid-cols-1">
        <Types
          types={types}
          typesParam={typesParam?.split(",")}
          onFilter={onFilter}
        />
        <div className="border-b md:mx-0 mx-6 md:my-0 my-4" />
        <Generations
          generations={generations}
          generationsParam={generationsParam?.split(",")}
          onFilter={onFilter}
        />
      </form>
      <div className="border-b md:mx-0 mx-6 md:my-0 my-4" />
      <button
        type="button"
        className={`block border-4 dark:border-white ${
          activeCompare
            ? "border-red-200 bg-red-600"
            : "border-sky-200 bg-sky-600"
        } rounded-lg mt-8 mx-auto px-12 py-3`}
        onClick={onClickCompare}
      >
        <div className="gap-2 flex items-center text-white">
          {activeCompare ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <strong>Cancel</strong>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 3A1.5 1.5 0 001 4.5v4A1.5 1.5 0 002.5 10h6A1.5 1.5 0 0010 8.5v-4A1.5 1.5 0 008.5 3h-6zm11 2A1.5 1.5 0 0012 6.5v7a1.5 1.5 0 001.5 1.5h4a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0017.5 5h-4zm-10 7A1.5 1.5 0 002 13.5v2A1.5 1.5 0 003.5 17h6a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 009.5 12h-6z"
                  clipRule="evenodd"
                />
              </svg>
              <strong>Compare</strong>
            </>
          )}
        </div>
      </button>
    </div>
  </div>
);

export default Filter;
