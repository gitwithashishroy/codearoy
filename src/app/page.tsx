import SECTIONS from '@/config/sectionsConfig';

export default function HomePage() {
  return (
    <>
      {SECTIONS.filter((s) => s.enabled !== false).map((s) => {
        const Comp = s.component;
        return <Comp key={s.id} />;
      })}
    </>
  );
}
