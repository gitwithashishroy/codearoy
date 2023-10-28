import React from 'react';
import styles from './NameAnimation.module.scss';

const NameAnimation: React.FC = () => {
  return (
    <div className={styles.nameAnimationContainer}>
      <h1 className={styles.nameAnimation}>Ashish Kumar Roy</h1>
    </div>
  );
};

export default NameAnimation;
