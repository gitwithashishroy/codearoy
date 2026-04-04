'use client';

import type { AIModelOption } from './types';
import styles from './ModelSelector.module.scss';

interface ModelSelectorProps {
  value: string;
  models: AIModelOption[];
  onChange: (value: string) => void;
  loading: boolean;
}

export default function ModelSelector({ value, models, onChange, loading }: ModelSelectorProps) {
  return (
    <div className={styles.group}>
      <label htmlFor="model" className={styles.srOnly}>
        AI Model
      </label>
      <select
        id="model"
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={loading || models.length === 0}
      >
        {models.length === 0 ? (
          <option value="">No models available</option>
        ) : (
          models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
