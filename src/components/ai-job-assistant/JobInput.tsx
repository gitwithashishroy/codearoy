'use client';

import styles from './JobInput.module.scss';

interface JobInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobInput({ value, onChange }: JobInputProps) {
  return (
    <div className={styles.group}>
      <label htmlFor="jobDescription" className={styles.srOnly}>
        Job Description or Job Link
      </label>
      <textarea
        id="jobDescription"
        className={styles.textarea}
        placeholder="Paste job description or job link..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={6}
      />
    </div>
  );
}
