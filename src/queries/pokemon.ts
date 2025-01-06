import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Pokemon, Payload } from '../assets/models';

// Utility function to get stored offset
const getStoredOffset = () => {
  const offset = localStorage.getItem('offset');
  return offset ? parseInt(offset) : 0;
};

// API functions
const fetchPokemonList = async (offset: number) => {
  const response = await axios.get<Payload<Pokemon[]>>(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
  );
  return response.data.results;
};

const fetchPokemonForm = async (id: number) => {
  const response = await axios.get<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon-form/${id}`
  );
  return response.data;
};

const fetchPokemonById = async (id: string) => {
  const response = await axios.get<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  return response.data;
};

// Custom hooks
export function useSuggestedPokemon() {
  const offset = getStoredOffset();

  return useQuery({
    queryKey: ['suggestedPokemon', offset],
    queryFn: async () => {
      const results = await fetchPokemonList(offset);

      const pokemonData: Pokemon[] = await Promise.all(
        results.map(async (result: Pokemon, idx: number) => {
          const id = offset + idx + 1;
          const imgIndex = ('00' + id).slice(-3);
          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgIndex}.png`;

          const responseData = await fetchPokemonForm(id);

          return {
            ...result,
            id,
            image,
            types: responseData.types
          };
        })
      );

      return pokemonData.reverse();
    }
  });
}

export function useMatches() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const storageMatches = localStorage.getItem('matches');
      if (!storageMatches) return [];

      const matchIDs = storageMatches.split(',');

      const pokemonData: Pokemon[] = await Promise.all(
        matchIDs.map(async (id) => {
          const results = await fetchPokemonById(id);
          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id.padStart(3, '0')}.png`;

          return {
            id: +id,
            name: results.name,
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
            image,
            types: results.types
          };
        })
      );

      return pokemonData;
    }
  });
}

export function useVoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      pokemon,
      vote
    }: {
      pokemon: Pokemon;
      vote: boolean;
    }) => {
      if (vote) {
        // Add to match list
        const storedMatches = localStorage.getItem('matches') || '';
        const matches = storedMatches ? storedMatches.split(',') : [];
        matches.push(pokemon.id.toString());

        localStorage.setItem('matches', matches.join(','));
      }

      // Update offset in localStorage
      localStorage.setItem('offset', pokemon.id.toString());

      return { pokemon, vote };
    },
    onSuccess: () => {
      // Invalidate queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['suggestedPokemon'] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    }
  });
}
