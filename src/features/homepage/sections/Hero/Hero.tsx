'use client';

import Image from 'next/image';
import styles from './Hero.module.scss';
import { PERSONAL_DETAILS } from '@/config/PERSONAL_DETAILS_CONFIG';
import { Container, Section } from '@/components/ui';
import { Icons } from '@/components/Constant';
import React from 'react';
import { BiDownArrow } from 'react-icons/bi';

export default function Hero() {
  const hero = PERSONAL_DETAILS.hero;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const DownloadResume = () => {
    // Use direct download link from Google Drive
    const fileId = process.env.NEXT_PUBLIC_RESUME_FILE_ID;
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Ashish_Kumar_Roy_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Section id="home">
      <Container>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.greeting}>Hello, I'm {hero.name}</div>
            <span className={styles.badge}>{hero.badge}</span>

            <h1 className={styles.title}>
              <span className={styles.white}>{hero.titleLines[0]}</span>
              <br />
              <span className={styles.white}>{hero.titleLines[1]}</span>
              <br />
              <span className={styles.blue}>{hero.titleLines[2]}</span>
            </h1>

            <p className={styles.description}>{hero.description}</p>

            <div className={styles.actions}>
              <button
                onClick={DownloadResume}
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                {'Download CV'}
              </button>
              <button
                onClick={() => scrollToSection(hero.actions.secondary.target)}
                className={`${styles.button} ${styles.buttonSecondary}`}
              >
                {hero.actions.secondary.label}
              </button>
            </div>
          </div>
          <div className={styles.visual}>
            <div className={styles.illustration}>
              <Image
                src="/images/sphere.png"
                alt="3D Crystal Technology Illustration"
                width={500}
                height={500}
                priority
              />
            </div>
            <div className={styles.codeSnippet}>
              <Image src="/images/sample_code.png" alt="Code Snippet" width={350} height={200} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
