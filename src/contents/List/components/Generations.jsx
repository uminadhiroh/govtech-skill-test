import React from "react";

const Generations = ({ generations, generationsParam, onFilter }) => (
  <div className="md:py-8 py-4">
    <div className="md:px-0 px-6 pb-3">
      <h3 className="font-semibold">Generations</h3>
    </div>
    <div className="overflow-auto h-40 md:px-0 px-6">
      {generations?.results?.map((gen, index) => (
        <div className="flex-center p-1" key={index}>
          <input
            type="checkbox"
            id={gen.name}
            name={gen.name}
            value={gen.name}
            defaultChecked={!!generationsParam?.includes(gen.name)}
            className="rounded text-red-500 focus:ring-red-500 mr-2"
            onChange={(e) => onFilter(e.target.value, "generations")}
          />
          <label htmlFor={gen.name} className="uppercase text-sm">
            {gen.name.replace("generation-", "")}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default Generations;
