'use client';

import type { ActionType } from './types';
import styles from './ActionSelector.module.scss';

interface ActionSelectorProps {
  value: ActionType;
  onChange: (value: ActionType) => void;
}

const ACTION_OPTIONS: Array<{ value: ActionType; label: string }> = [
  { value: 'ask-referral', label: 'Ask Referral' },
  { value: 'hr-message', label: 'HR Message' },
  { value: 'cold-message', label: 'Cold Message' },
  { value: 'cold-email', label: 'Cold Email' },
];

export default function ActionSelector({ value, onChange }: ActionSelectorProps) {
  return (
    <div className={styles.group}>
      <label htmlFor="actionType" className={styles.srOnly}>
        Action Type
      </label>
      <select
        id="actionType"
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as ActionType)}
      >
        {ACTION_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
