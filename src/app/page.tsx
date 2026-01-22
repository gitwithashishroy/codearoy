import SECTIONS from '@/config/sectionsConfig';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      {SECTIONS.filter((s) => s.enabled !== false).map((s) => {
        const Comp = s.component;
        return <Comp key={s.id} />;
      })}
    </div>
  );
}
