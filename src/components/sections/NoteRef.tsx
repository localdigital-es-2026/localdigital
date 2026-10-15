/** Llamada a nota al pie numerada, como en apple.com/services (RF-41). */
export function NoteRef({ id }: { id: 1 | 2 }) {
  return (
    <sup className="ml-0.5">
      <a href={`#nota-${id}`} aria-label={`Nota ${id}`} className="inline-flex min-h-6 min-w-6 items-center justify-center underline">
        {id}
      </a>
    </sup>
  );
}
