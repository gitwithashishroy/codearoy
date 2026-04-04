'use client';

import { Button } from '@/components/ui';
import styles from './GenerateButton.module.scss';
import { SparklesIcon } from '@/components/icons/Icons';

interface GenerateButtonProps {
  disabled: boolean;
  loading: boolean;
  onClick: () => Promise<void>;
}

export default function GenerateButton({ disabled, loading, onClick }: GenerateButtonProps) {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      disabled={disabled || loading}
      className={styles.button}
    >
      <SparklesIcon className={styles.icon} />
      {loading ? 'Generating...' : 'Generate Message'}
    </Button>
  );
}
