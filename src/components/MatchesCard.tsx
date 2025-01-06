import { Pokemon } from "../assets/models";

export default function MatchesCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="relative rounded-md bg-gray-100 p-2">
      <div
        className="w-full h-28 bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${pokemon.image})` }}
      />
      <span className="absolute bottom-1.5 left-2 font-bold text-sm capitalize text-black">
        {pokemon.name}
      </span>
    </div>
  );
}
