import styles from './Dashboard.module.scss';
import { Solution } from './leetcode';

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <div className={styles.solutionCard}>
      <h4>{solution.problem}</h4>
      <p>
        <span>{solution.difficulty}</span> · {solution.language}
      </p>
      <p>
        TC: {solution.timeComplexity} | SC: {solution.spaceComplexity}
      </p>
      <a href={solution.leetcodeUrl} target="_blank">
        View on LeetCode
      </a>
    </div>
  );
}
