import { Pokemon } from "../assets/models";
import Matches from "./Matches";

export default function Messaging({ pokemonData }: { pokemonData: Pokemon[] }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#e66465] to-[#9198e5] px-4 py-6 flex items-center">
        <img
          alt="Pokemon Tinder"
          src="/icon/Pokeball_white.svg"
          className="w-8 h-8"
        />
        <span className="text-white font-semibold ml-3">Pokemon Tinder</span>
      </div>

      {/* Content */}
      <div className="flex-grow relative">
        <Matches pokemonData={pokemonData} />
      </div>
    </div>
  );
}
