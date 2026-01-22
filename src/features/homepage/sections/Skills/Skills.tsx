import Container from '@/components/ui/Container/Container';
import styles from './Skills.module.scss';
import { PERSONAL_DETAILS } from '@/config/PERSONAL_DETAILS_CONFIG';
import { Section } from '@/components/ui';

export default async function Skills() {
  const skills = PERSONAL_DETAILS.skills;

  return (
    <Section
      id="skills"
      className={styles.skills}
      title="Tech Stack"
      subtitle="Technologies and tools I use to bring ideas to life"
    >
      <Container>
        <div className={styles.skillsGrid}>
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className={styles.skillCard}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{skillGroup.icon}</span>
                <h3 className={styles.category}>{skillGroup.category}</h3>
              </div>
              <ul className={styles.skillList}>
                {skillGroup.items.map((skill) => (
                  <li key={skill} className={styles.skillItem}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
