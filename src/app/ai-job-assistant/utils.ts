import type { AIModelOption } from '@/components/ai-job-assistant';

export const RESUME_CACHE_KEY = 'ai-job-assistant-resume-uploaded';
export const COPY_RESET_TIMEOUT_MS = 1600;

export function getCachedResumeUploaded(): boolean {
  return window.localStorage.getItem(RESUME_CACHE_KEY) === 'true';
}

export function setCachedResumeUploaded(value: boolean): void {
  if (value) {
    window.localStorage.setItem(RESUME_CACHE_KEY, 'true');
    return;
  }

  window.localStorage.removeItem(RESUME_CACHE_KEY);
}

export function getDefaultModelId(models: AIModelOption[]): string {
  return models.find((model) => model.isDefault)?.id || models[0]?.id || '';
}

export function toErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function isSessionExpiredError(message: string): boolean {
  return message.toLowerCase().includes('session expired');
}
