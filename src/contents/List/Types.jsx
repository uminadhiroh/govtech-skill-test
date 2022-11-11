import React from "react";

const Types = ({ types }) => (
  <div className="py-8">
    <h3 className="font-semibold pb-3">Types</h3>
    <div className="overflow-auto h-40">
      {types?.results?.map((type, index) => (
        <div className="flex-center p-1" key={index}>
          <input
            type="checkbox"
            id={type.name}
            name={type.name}
            value={type.name}
            className="rounded text-red-500 focus:ring-red-500 mr-2"
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
