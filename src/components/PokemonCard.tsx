import React from 'react';
import { motion } from 'motion/react';
import { Pokemon } from '../assets/models';

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fighting: 'bg-red-700',
  flying: 'bg-indigo-400',
  poison: 'bg-purple-600',
  ground: 'bg-yellow-600',
  rock: 'bg-yellow-800',
  bug: 'bg-lime-600',
  ghost: 'bg-purple-800',
  steel: 'bg-gray-500',
  fire: 'bg-orange-600',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-600',
  ice: 'bg-cyan-400',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  fairy: 'bg-pink-400'
};

interface PokemonCardProps {
  pokemon: Pokemon;
}

const TypeChip: React.FC<{ type: string }> = ({ type }) => (
  <div
    className={`flex items-center rounded-full px-3 py-1 ${
      typeColors[type] || 'bg-gray-400'
    } mr-2 text-white`}
  >
    <img src={`/icon/${type}.svg`} alt={type} className="mr-1 h-4 w-4" />
    <span className="text-sm font-medium capitalize">{type}</span>
  </div>
);

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <motion.div
      className="flex h-full cursor-pointer flex-col rounded-3xl bg-white p-3 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative mb-2 h-80 w-full"
        style={{
          backgroundImage: `url(${pokemon.image})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        }}
      />

      <div className="p-4">
        <h2 className="mb-3 text-2xl font-bold capitalize">{pokemon.name}</h2>

        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type, idx) => (
            <TypeChip
              key={`${pokemon.id}-${type.type.name}-${idx}`}
              type={type.type.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
