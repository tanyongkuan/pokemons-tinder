import { memo, useState } from "react";
import { NAVIGATION_ITEMS, LEFT_PANEL_WIDTH } from "../lib/constants";
import { useResponsive } from "../hooks/useResponsive";
import { usePokemonData } from "../hooks/usePokemonData";
import Layout from "./Layout";
import Messaging from "./Messaging";
import LoadingScreen from "./LoadingScreen";
import Suggested from "./Suggested";
import Matches from "./Matches";
import type { Pokemon } from "../assets/models";

const Header = memo(() => (
  <div className="md:hidden bg-gradient-to-b from-[#e66465] to-[#9198e5] p-2">
    <div className="flex items-center">
      <img
        src="/icon/Pokeball_white.svg"
        alt="Pokemon Tinder"
        className="w-8 h-8"
      />
      <h1 className="text-white font-semibold ml-3 text-xl">Pokemon Tinder</h1>
    </div>
  </div>
));

const NavigationButton = memo(
  ({
    item,
    isActive,
    onClick,
  }: {
    item: (typeof NAVIGATION_ITEMS)[0];
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center transition-colors duration-200
      ${isActive ? "text-blue-500" : "text-gray-500 hover:text-gray-700"}`}
    >
      {item.icon}
      <span className="text-xs mt-1">{item.label}</span>
    </button>
  )
);

const Navigation = memo(
  ({
    activeNav,
    onNavChange,
  }: {
    activeNav: number;
    onNavChange: (value: number) => void;
  }) => (
    <div className="md:hidden flex justify-around p-4 bg-white border-t border-gray-200">
      {NAVIGATION_ITEMS.map((item) => (
        <NavigationButton
          key={item.id}
          item={item}
          isActive={activeNav === item.id}
          onClick={() => onNavChange(item.id)}
        />
      ))}
    </div>
  )
);

interface ContentProps {
  navValue: number;
  isMobile: boolean;
  suggestedPokemon: Pokemon[];
  matchPokemon: Pokemon[];
  onVote: (pokemon: Pokemon, vote: boolean) => void;
}

const Content = memo(
  ({ navValue, isMobile, suggestedPokemon, matchPokemon }: ContentProps) => {
    if (navValue === 0 && isMobile) {
      return <Matches pokemonData={matchPokemon} />;
    }
    return <Suggested suggestedPokemon={suggestedPokemon} />;
  }
);

export default function Home() {
  const [navValue, setNavValue] = useState(1);
  const { isMobile } = useResponsive();
  const { suggestedPokemon, matches, isLoading, voteMutation } =
    usePokemonData();

  const handleVote = (pokemon: Pokemon, vote: boolean) => {
    voteMutation.mutate({ pokemon, vote });
  };

  if (isLoading) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-screen flex">
        {/* Left Side - Messaging */}
        <div className={`hidden md:block w-2/5 ${LEFT_PANEL_WIDTH} h-full`}>
          <Messaging pokemonData={matches} />
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col bg-gray-200">
          <Header />

          <main className="relative flex-1">
            <Content
              navValue={navValue}
              isMobile={isMobile}
              suggestedPokemon={suggestedPokemon}
              matchPokemon={matches}
              onVote={handleVote}
            />
          </main>

          <Navigation activeNav={navValue} onNavChange={setNavValue} />
        </div>
      </div>
    </Layout>
  );
}
