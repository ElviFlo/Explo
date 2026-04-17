import CharacterCard from "./CharacterCard";

export default function CharacterGrid({ characters, onAskRemove }) {
  return (
    <section
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Lista de personajes"
    >
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onAskRemove={onAskRemove}
        />
      ))}
    </section>
  );
}