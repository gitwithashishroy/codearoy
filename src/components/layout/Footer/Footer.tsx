import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import styles from './Footer.module.scss';
import { PERSONAL_DETAILS } from '@/config/PERSONAL_DETAILS_CONFIG';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footer = PERSONAL_DETAILS.footer;

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerBottom}>
          <p>
            &copy; {currentYear} {footer.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
