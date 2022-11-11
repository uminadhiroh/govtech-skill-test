import React from "react";

const Types = ({ types, typesParam, onFilter }) => (
  <div className="md:py-8 py-4">
    <div className="md:px-0 px-6 pb-3">
      <h3 className="font-semibold">Types</h3>
    </div>
    <div className="overflow-auto h-40 md:px-0 px-6">
      {types?.results?.map((type, index) => (
        <div className="flex-center p-1" key={index}>
          <input
            type="checkbox"
            id={type.name}
            name={type.name}
            value={type.name}
            defaultChecked={!!typesParam?.includes(type.name)}
            className="rounded text-red-500 focus:ring-red-500 mr-2"
            onChange={(e) => onFilter(e.target.value, "types")}
          />
          <label htmlFor={type.name} className="capitalize text-sm">
            {type.name}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default Types;
