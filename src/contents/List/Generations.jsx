import React from "react";

const Generations = ({ generations }) => (
  <div className="py-8">
    <h3 className="font-semibold pb-3">Generations</h3>
    <div className="overflow-auto h-40">
      {generations?.results?.map((gen, index) => (
        <div className="flex-center p-1" key={index}>
          <input
            type="checkbox"
            id={gen.name}
            name={gen.name}
            value={gen.name}
            className="rounded text-red-500 focus:ring-red-500 mr-2"
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
