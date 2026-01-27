'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Icons } from '@/components/Constant';
import styles from './TopLanguages.module.scss';

interface TopLanguagesProps {
  languages: Array<{ name: string; percentage: number; color: string }>;
}

export const TopLanguages: React.FC<TopLanguagesProps> = ({ languages }) => {
  return (
    <div className={styles.ghChartSection}>
      <h4>
        <Icons.Code /> Top Languages
      </h4>
      <div className={styles.ghChartContainer} style={{ height: '7rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={languages} layout="vertical" margin={{ left: -10, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'rgba(148, 163, 184, 0.2)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
              {languages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
