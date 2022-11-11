import React from "react";
import Generations from "./Generations";
import Types from "./Types";

const Filter = ({
  showFilter,
  types,
  typesParam,
  generations,
  generationsParam,
  onFilter,
  setShowFilter,
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
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clip-rule="evenodd"
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
    </div>
  </div>
);

export default Filter;
