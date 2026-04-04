'use client';

import styles from './OutputBox.module.scss';
import { SparklesIcon } from '@/components/icons/Icons';

interface OutputBoxProps {
  output: string;
}

export default function OutputBox({ output }: OutputBoxProps) {
  return (
    <div className={styles.wrapper}>
      {output ? (
        <div className={styles.content}>
          <div className={styles.output}>{output}</div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIconWrapper}>
            <SparklesIcon className={styles.emptyIcon} />
          </div>
          <p>Your generated message will appear here</p>
        </div>
      )}
    </div>
  );
}
