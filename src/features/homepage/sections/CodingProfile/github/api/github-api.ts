'use server';

import { GitHubContribution, GitHubRepo, GitHubStats, GitHubUserData } from '../github.types';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Add this to your .env.local

export async function fetchGitHubUser(username: string) {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return (await response.json()) as GitHubUserData;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

export async function fetchGitHubRepos(username: string) {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return (await response.json()) as GitHubRepo[];
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

// Detect framework/runtime from package.json
async function detectFrameworks(username: string, repoName: string): Promise<string[]> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3.raw',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API_URL}/repos/${username}/${repoName}/contents/package.json`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!response.ok) return [];

    const packageJson = await response.json();
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    const frameworks: string[] = [];

    // Framework detection map
    const frameworkMap: Record<string, string> = {
      next: 'Next.js',
      react: 'React',
      vue: 'Vue.js',
      angular: 'Angular',
      '@angular/core': 'Angular',
      svelte: 'Svelte',
      express: 'Express',
      nestjs: 'NestJS',
      '@nestjs/core': 'NestJS',
      fastify: 'Fastify',
      gatsby: 'Gatsby',
      nuxt: 'Nuxt.js',
      remix: 'Remix',
      astro: 'Astro',
      'solid-js': 'Solid.js',
      preact: 'Preact',
      electron: 'Electron',
      'react-native': 'React Native',
      tailwindcss: 'Tailwind',
      'styled-components': 'Styled Components',
      sass: 'Sass',
      prisma: 'Prisma',
      mongoose: 'MongoDB',
      graphql: 'GraphQL',
      apollo: 'Apollo',
      '@apollo/client': 'Apollo',
    };

    // Check for Node.js (if it's a JS/TS backend project)
    if (dependencies['express'] || dependencies['fastify'] || dependencies['@nestjs/core']) {
      frameworks.push('Node.js');
    }

    // Detect frameworks from dependencies
    for (const [dep, framework] of Object.entries(frameworkMap)) {
      if (dependencies[dep] && !frameworks.includes(framework)) {
        frameworks.push(framework);
      }
    }

    return frameworks;
  } catch (error) {
    return [];
  }
}

export async function fetchGitHubStats(username: string) {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    // Fetch user data, repos, and contributions in parallel
    const [userData, repos, contributions] = await Promise.all([
      fetchGitHubUser(username),
      fetchGitHubRepos(username),
      fetchGitHubContributions(username),
    ]);

    if (!userData || !repos) {
      return null;
    }

    // Calculate total stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // Detect frameworks and technologies from repositories
    const frameworkStats: Record<string, number> = {};

    // Fetch frameworks for top repositories (limit to 20 to avoid rate limits)
    const topRepos = repos.slice(0, 20);
    await Promise.all(
      topRepos.map(async (repo) => {
        const frameworks = await detectFrameworks(username, repo.name);
        frameworks.forEach((framework) => {
          frameworkStats[framework] = (frameworkStats[framework] || 0) + 1;
        });
      })
    );

    // Get top 4 frameworks/technologies with colors
    const techColors: Record<string, string> = {
      'Next.js': '#000000',
      React: '#61dafb',
      'Vue.js': '#42b883',
      Angular: '#dd0031',
      'Node.js': '#339933',
      Express: '#000000',
      NestJS: '#e0234e',
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      Tailwind: '#06b6d4',
      Sass: '#cc6699',
      MongoDB: '#47a248',
      Prisma: '#2d3748',
      GraphQL: '#e10098',
      Apollo: '#311c87',
      'React Native': '#61dafb',
      Electron: '#47848f',
      Gatsby: '#663399',
      Svelte: '#ff3e00',
      'Nuxt.js': '#00dc82',
      Remix: '#121212',
      Astro: '#ff5d01',
      Java: '#b07219',
      Go: '#00ADD8',
      Rust: '#dea584',
      Ruby: '#701516',
      PHP: '#4F5D95',
      'C++': '#f34b7d',
      Swift: '#ffac45',
      Kotlin: '#A97BFF',
    };

    const totalTechs = Object.values(frameworkStats).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(frameworkStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalTechs) * 100),
        color: techColors[name] || '#8b5cf6',
      }));

    // Get recent repos (top 3 by stars)
    const recentRepos = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .map((repo) => ({
        name: repo.name,
        description: repo.description || 'No description available',
        stars: repo.stargazers_count,
        language: repo.language || 'Unknown',
        url: repo.html_url,
      }));

    // Calculate total commits from contributions
    const totalCommits = contributions.reduce((sum, day) => sum + day.contributionCount, 0);

    console.log(userData);

    return {
      username: userData.login,
      totalRepos: userData.public_repos,
      totalStars,
      totalCommits,
      followers: userData.followers,
      topLanguages,
      recentRepos,
      contributions,
    } as GitHubStats;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

// Fetch real contribution data using GitHub GraphQL API
export async function fetchGitHubContributions(username: string): Promise<GitHubContribution[]> {
  try {
    if (!GITHUB_TOKEN) {
      console.warn('GITHUB_TOKEN not found, returning empty contributions');
      return [];
    }

    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

    // Fetch contributions for the last 5 years
    const allContributions: GitHubContribution[] = [];

    for (const year of years) {
      const fromDate = `${year}-01-01T00:00:00Z`;
      const toDate = `${year}-12-31T23:59:59Z`;

      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection(from: "${fromDate}", to: "${toDate}") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        console.error(`GitHub GraphQL API error for year ${year}: ${response.status}`);
        continue;
      }

      const data = await response.json();

      if (data.errors) {
        console.error('GraphQL errors:', data.errors);
        continue;
      }

      const contributionDays =
        data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
          (week: any) => week.contributionDays
        );

      const yearContributions = contributionDays.map((day: any) => ({
        date: day.date,
        contributionCount: day.contributionCount,
        color: getContributionColor(day.contributionCount),
      }));

      allContributions.push(...yearContributions);
    }

    return allContributions;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return [];
  }
}

function getContributionColor(count: number): string {
  if (count === 0) return '#161b22';
  if (count <= 2) return '#0e4429';
  if (count <= 4) return '#006d32';
  if (count <= 6) return '#26a641';
  return '#39d353';
}
