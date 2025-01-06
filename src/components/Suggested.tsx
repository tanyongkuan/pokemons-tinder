import React, { useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';
import { usePokemonData } from '../hooks/usePokemonData';
import { Pokemon } from '../assets/models';
import PokemonCard from '../components/PokemonCard';

type StyleCardRef = {
  current: HTMLDivElement | null;
  vote: (vote: boolean) => void;
};

type CardProps = {
  children: JSX.Element;
  draggable: boolean;
  setVote: (vote: boolean) => void;
  setMotion: (motion: number) => void;
};

const StyleCard = React.forwardRef<StyleCardRef, CardProps>((props, ref) => {
  const cardElem = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState('center');
  const [velocity, setVelocity] = useState(0);

  React.useImperativeHandle(ref, () => ({
    current: cardElem.current,
    vote: (vote: boolean) => {
      setConstrained(false);
      controls.start({ x: flyAwayDistance(vote ? 'right' : 'left') });
    }
  }));

  const getDirection = () =>
    velocity >= 0.6 ? 'right' : velocity <= -0.6 ? 'left' : 'center';

  const flyAwayDistance = (direction: string) => {
    const parentWidth = (cardElem.current!
      .parentNode as HTMLDivElement)!.getBoundingClientRect().width;
    const childWidth = cardElem.current!.getBoundingClientRect().width;
    return direction === 'left'
      ? -parentWidth / 2 - childWidth / 2
      : parentWidth / 2 + childWidth / 2;
  };

  const flyAway = (min: number) => {
    if (Math.abs(velocity) > min) {
      setConstrained(false);
      controls.start({ x: flyAwayDistance(direction) });
    } else {
      props.setMotion(0);
      x.set(0);
    }
  };

  return (
    <motion.div
      ref={cardElem}
      drag={props.draggable}
      animate={controls}
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      style={{ x }}
      onDrag={() => {
        setVelocity(x.getVelocity());
        setDirection(getDirection());
        props.setMotion(x.get());
      }}
      onDragEnd={() => flyAway(500)}
      className="absolute w-full max-w-sm"
      whileTap={{ scale: 1.1 }}
    >
      <div
        className={`absolute left-3 top-10 rotate-[-20deg] transform rounded-lg border-2 border-green-500 p-2 text-green-500 ${`opacity-${Math.max(
          0,
          Math.min(1, x.get() * 0.003)
        )}`}`}
        style={{ opacity: Math.max(0, Math.min(1, x.get() * 0.003)) }}
      >
        <span>LIKE</span>
      </div>
      <div
        className={`absolute right-3 top-10 rotate-[20deg] transform rounded-lg border-2 border-red-500 p-2 text-red-500 ${`opacity-${Math.max(
          0,
          Math.min(1, x.get() * -0.003)
        )}`}`}
        style={{ opacity: Math.max(0, Math.min(1, x.get() * -0.003)) }}
      >
        <span>NOPE</span>
      </div>
      {props.children}
    </motion.div>
  );
});

export default function Suggested({
  suggestedPokemon
}: {
  suggestedPokemon: Pokemon[];
}) {
  const [motionVal, setMotionVal] = useState(0);
  const styleCardRef = useRef<StyleCardRef>(null);
  const { voteMutation } = usePokemonData();

  const handleMotion = (motion: number) => setMotionVal(motion);

  const onVote = (item: Pokemon, vote: boolean) => {
    voteMutation.mutate({ pokemon: item, vote });
  };

  return (
    <div className="absolute inset-0 mt-2">
      <div className="relative flex h-full items-center justify-center overflow-hidden">
        {suggestedPokemon.map((pokemon, idx) => (
          <StyleCard
            key={pokemon.id}
            ref={styleCardRef}
            draggable={idx === suggestedPokemon.length - 1}
            setMotion={handleMotion}
            setVote={(result) => onVote(pokemon, result)}
          >
            <PokemonCard pokemon={pokemon} />
          </StyleCard>
        ))}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center space-x-4">
          <div className="px-4 py-8 md:px-8 md:py-16">
            <motion.button
              aria-label="like"
              className="rounded-full border-2 border-green-500 bg-green-300 p-4"
              onClick={() => styleCardRef.current?.vote(true)}
              style={{
                backgroundColor: `rgba(33, 208, 124, ${Math.max(
                  0,
                  motionVal * 0.003
                )})`,
                borderColor: '#21d07c',
                color:
                  motionVal <= 0
                    ? 'rgba(33, 208, 124, 1)'
                    : 'rgba(255, 255, 255, 1)'
              }}
            >
              <svg
                className="h-10 w-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </svg>
            </motion.button>
          </div>
          <div className="px-4 py-8 md:px-8 md:py-16">
            <motion.button
              aria-label="reject"
              className="rounded-full border-2 border-red-500 bg-red-300 p-4"
              onClick={() => styleCardRef.current?.vote(false)}
              style={{
                backgroundColor: `rgba(255, 68, 88, ${Math.max(
                  0,
                  -motionVal * 0.003
                )})`,
                borderColor: '#ff4458',
                color:
                  motionVal >= 0
                    ? 'rgba(255, 68, 88, 1)'
                    : 'rgba(255, 255, 255, 1)'
              }}
            >
              <svg
                className="h-10 w-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
