import {
  useSuggestedPokemon,
  useMatches,
  useVoteMutation
} from '../queries/pokemon';

export const usePokemonData = () => {
  const { data: suggestedPokemon = [], isLoading: isSuggestedLoading } =
    useSuggestedPokemon();

  const { data: matches = [], isLoading: isMatchesLoading } = useMatches();

  const voteMutation = useVoteMutation();

  return {
    suggestedPokemon,
    matches,
    isLoading: isSuggestedLoading || isMatchesLoading,
    voteMutation
  };
};
