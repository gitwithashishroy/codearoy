'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Icons } from '@/components/Constant';
import styles from './WeeklyActivity.module.scss';

const SAMPLE_COMMIT_ACTIVITY = [
  { day: 'Mon', commits: 5 },
  { day: 'Tue', commits: 12 },
  { day: 'Wed', commits: 8 },
  { day: 'Thu', commits: 15 },
  { day: 'Fri', commits: 22 },
  { day: 'Sat', commits: 7 },
  { day: 'Sun', commits: 3 },
];

export const WeeklyActivity: React.FC = () => {
  return (
    <div className={styles.ghChartSection}>
      <h4>
        <Icons.Trophy /> Weekly Commit Activity
      </h4>
      <div className={styles.ghChartContainer} style={{ height: '8rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={SAMPLE_COMMIT_ACTIVITY}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(148, 163, 184, 0.1)"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              dy={10}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <Tooltip
              cursor={{ fill: 'rgba(46, 164, 79, 0.1)' }}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: 'rgba(148, 163, 184, 0.2)',
                borderRadius: '8px',
                fontSize: '10px',
              }}
              itemStyle={{ color: '#2ea44f' }}
            />
            <Bar dataKey="commits" fill="#2ea44f" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
