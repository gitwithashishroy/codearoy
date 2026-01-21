import Container from '@/components/ui/Container/Container';
import styles from './Experience.module.scss';
import { PERSONAL_DETAILS } from '@/config/PERSONAL_DETAILS_CONFIG';
import { Section } from '@/components/ui';

export default function Experience() {
  const items = PERSONAL_DETAILS.experience;

  return (
    <Section id="experience" title="Professional Journey" className={styles.experience}>
      <Container>
        <div className={styles.timeline}>
          <div className={styles.line} />

          {items.map((it) => (
            <div className={styles.item} key={`${it.role}-${it.date}`}>
              <div className={styles.marker} />
              <div className={styles.content}>
                <div className={styles.date}>{it.date}</div>
                <h3 className={styles.role}>{it.role}</h3>
                <div className={styles.company}>
                  {it.company} • {it.location}
                </div>
                <ul className={styles.points}>
                  {it.points.map((p: any, idx: number) => {
                    if (typeof p === 'string') {
                      return <li key={idx} dangerouslySetInnerHTML={{ __html: p }} />;
                    }

                    // structured point with title and items
                    return (
                      <li key={idx} className={styles.group}>
                        <div className={styles.pointTitle}>{p.title}</div>
                        <ul className={styles.sublist}>
                          {p.items.map((sub: string, j: number) => (
                            <li
                              key={j}
                              className={styles.subitem}
                              dangerouslySetInnerHTML={{ __html: sub }}
                            />
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
