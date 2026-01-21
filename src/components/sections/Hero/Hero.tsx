'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.scss';

export default function Hero() {
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

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Senior Frontend Engineer</span>

          <h1 className={styles.title}>
            <span className={styles.white}>Building scalable</span>
            <br />
            <span className={styles.white}>web experiences</span>
            <br />
            <span className={styles.blue}>with precision.</span>
          </h1>

          <p className={styles.description}>
            I specialize in React architecture, performance optimization, and robust design systems
            for enterprise applications.
          </p>

          <div className={styles.actions}>
            <button
              onClick={() => scrollToSection('work')}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Contact Me
            </button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.illustration}>
            <Image
              src="/images/tech_background.jpg"
              alt="3D Crystal Technology Illustration"
              width={500}
              height={500}
              priority
            />
          </div>

          <div className={styles.codeSnippet}>
            <Image
              src="/images/sample_code.png"
              alt="Code Snippet"
              width={350}
              height={200}
              className={styles.codeImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
