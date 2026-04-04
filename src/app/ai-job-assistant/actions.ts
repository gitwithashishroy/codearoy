'use server';

import type { ActionType, AIModelOption } from '@/components/ai-job-assistant';

interface GeneratePayload {
  jobDescription: string;
  actionType: ActionType;
  model?: string;
}

interface BackendEnvelope<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

interface BackendModelsData {
  default?: string;
  models: string[];
}

interface BackendGenerateData {
  message: string;
}

interface BackendErrorPayload {
  success?: boolean;
  error?: string;
  message?: string;
}

const BACKEND_BASE_URL = process.env.AI_BACKEND_URL || 'http://localhost:3000';

function parseErrorMessage(data: unknown, fallback: string): string {
  if (typeof data === 'object' && data !== null && 'error' in data) {
    const error = (data as BackendErrorPayload).error;
    if (typeof error === 'string' && error.trim().length > 0) {
      return error;
    }
  }

  if (typeof data === 'object' && data !== null && 'message' in data) {
    const message = (data as BackendErrorPayload).message;
    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
  }

  return fallback;
}

function normalizeModels(data: BackendModelsData): AIModelOption[] {
  const defaultModel = data.default;

  return data.models.map((model) => ({
    id: model,
    label: model,
    isDefault: defaultModel === model,
  }));
}

function mapActionToBackend(actionType: ActionType): {
  intent: string;
  channel: 'linkedin' | 'email';
} {
  switch (actionType) {
    case 'ask-referral':
      return { intent: 'ask-referral', channel: 'linkedin' };
    case 'hr-message':
      return { intent: 'hr-message', channel: 'email' };
    case 'cold-message':
      return { intent: 'networking', channel: 'linkedin' };
    case 'cold-email':
      return { intent: 'cold-email', channel: 'email' };
    default:
      return { intent: 'ask-referral', channel: 'linkedin' };
  }
}

export async function getAIModelsAction(): Promise<AIModelOption[]> {
  const response = await fetch(`${BACKEND_BASE_URL}/api/ai/models`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = (await response.json().catch(() => ({}))) as
    | BackendEnvelope<BackendModelsData>
    | BackendErrorPayload;

  if (!response.ok) {
    throw new Error(parseErrorMessage(data, 'Unable to load models.'));
  }

  const envelope = data as BackendEnvelope<BackendModelsData>;

  if (!envelope.success || !Array.isArray(envelope.data?.models)) {
    throw new Error('Invalid models response format.');
  }

  const models = normalizeModels(envelope.data);

  if (models.length === 0) {
    throw new Error('No AI models available from backend.');
  }

  return models;
}

export async function uploadResumeAction(formData: FormData): Promise<void> {
  const file = formData.get('file');

  if (!(file instanceof File)) {
    throw new Error('Please upload a valid resume file.');
  }

  const backendFormData = new FormData();
  backendFormData.append('file', file);

  const response = await fetch(`${BACKEND_BASE_URL}/api/resume/upload`, {
    method: 'POST',
    body: backendFormData,
    cache: 'no-store',
  });

  const data = (await response.json().catch(() => ({}))) as unknown;

  if (!response.ok) {
    throw new Error(parseErrorMessage(data, 'Resume upload failed.'));
  }
}

export async function generateMessageAction(
  payload: GeneratePayload
): Promise<{ message: string }> {
  const trimmedJobDescription = payload.jobDescription.trim();

  if (!trimmedJobDescription) {
    throw new Error('Job description is required.');
  }

  const mapped = mapActionToBackend(payload.actionType);

  const response = await fetch(`${BACKEND_BASE_URL}/api/message/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      jobDescription: trimmedJobDescription,
      intent: mapped.intent,
      channel: mapped.channel,
      ...(payload.model ? { model: payload.model } : {}),
    }),
  });

  const data = (await response.json().catch(() => ({}))) as
    | BackendEnvelope<BackendGenerateData>
    | BackendErrorPayload;

  if (!response.ok) {
    throw new Error(parseErrorMessage(data, 'Unable to generate message.'));
  }

  const envelope = data as BackendEnvelope<BackendGenerateData>;

  if (!envelope.success || !envelope.data?.message) {
    throw new Error('Invalid generate response format.');
  }

  return { message: envelope.data.message };
}
