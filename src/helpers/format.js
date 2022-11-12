export const displayNumber = (id) => {
  if (id < 10) {
    return `#00${id}`;
  }
  if (id < 100) {
    return `#0${id}`;
  }
  return `#${id}`;
};

export const displayType = (type) => {
  let className = "bg-black text-white";
  switch (type) {
    case "normal":
      className = "bg-yellow-600 text-white";
      break;
    case "fighting":
      className = "bg-red-900 text-white";
      break;
    case "flying":
      className = "bg-sky-300 text-black";
      break;
    case "poison":
      className = "bg-purple-400 text-white";
      break;
    case "ground":
      className = "bg-amber-600 text-white";
      break;
    case "rock":
      className = "bg-stone-500 text-white";
      break;
    case "bug":
      className = "bg-green-700 text-white";
      break;
    case "ghost":
      className = "bg-violet-800 text-white";
      break;
    case "steel":
      className = "bg-indigo-400 text-white";
      break;
    case "fire":
      className = "bg-orange-500 text-white";
      break;
    case "water":
      className = "bg-sky-500 text-white";
      break;
    case "grass":
      className = "bg-lime-600 text-white";
      break;
    case "electric":
      className = "bg-yellow-300 text-black";
      break;
    case "psychic":
      className = "bg-fuchsia-400	text-white";
      break;
    case "ice":
      className = "bg-blue-400 text-white";
      break;
    case "dragon":
      className = "bg-indigo-900 text-white";
      break;
    case "dark":
      className = "bg-yellow-900 text-white";
      break;
    case "fairy":
      className = "bg-pink-400 text-white";
      break;
    case "unknown":
      className = "bg-black text-white";
      break;
    case "shadow":
      className = "bg-zinc-400 text-white";
      break;
  }
  return className;
};
