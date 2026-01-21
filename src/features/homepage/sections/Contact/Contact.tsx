'use client';

import Container from '@/components/ui/Container/Container';
import styles from './Contact.module.scss';
import { Section } from '@/components/ui';
import { PERSONAL_DETAILS } from '@/config/PERSONAL_DETAILS_CONFIG';

export default function Contact() {
  const { contact } = PERSONAL_DETAILS;

  return (
    <Section
      id="contact"
      className={styles.contact}
      title="Get In Touch"
      subtitle="Want to work together? Let's connect!"
    >
      <Container>
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            {contact.map((info) => (
              <div key={info.type} className={styles.infoCard}>
                <div className={styles.infoIcon}>{info.icon}</div>
                <div className={styles.infoContent}>
                  <h3>{info.type}</h3>
                  {info.links.map((link) =>
                    link.url ? (
                      <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <span key={link.label}>{link.label}</span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
