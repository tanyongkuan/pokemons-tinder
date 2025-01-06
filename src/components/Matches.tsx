import React, { useState } from "react";
import MatchesCard from "./MatchesCard";
import { Pokemon } from "../assets/models";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel({ children, value, index, ...props }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="flex-grow overflow-auto mt-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      {...props}
    >
      {value === index && children}
    </div>
  );
}

export default function Matches({ pokemonData }: { pokemonData: Pokemon[] }) {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col p-2 pr-1 absolute inset-0">
      {/* Tabs */}
      <div className="border-b border-transparent">
        <div className="flex h-7">
          <button
            className={`
              text-black font-bold px-0 h-7 relative
              after:absolute after:bottom-0 after:left-0 after:right-0 
              after:h-0.5 after:bg-[#e66465]
            `}
          >
            Matches
          </button>
        </div>
      </div>

      {/* Content */}
      <TabPanel value={value} index={0}>
        <div className="grid grid-cols-3 gap-1">
          {pokemonData.map((pokemon, idx) => (
            <div key={idx} className="col-span-1">
              <MatchesCard pokemon={pokemon} />
            </div>
          ))}
        </div>
      </TabPanel>
    </div>
  );
}
