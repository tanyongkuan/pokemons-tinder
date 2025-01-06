type Props = {};

export default function LoadingScreen({}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e66465] to-[#9198e5] flex items-center justify-center">
      <div
        className="w-[4.5rem] aspect-square bg-contain bg-no-repeat animate-pulse"
        style={{
          backgroundImage: "url('/icon/Pokeball_white.svg')",
        }}
      />
    </div>
  );
}
