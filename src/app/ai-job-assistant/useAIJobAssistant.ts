'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ActionType, AIModelOption } from '@/components/ai-job-assistant';
import { generateMessageAction, getAIModelsAction, uploadResumeAction } from './actions';
import {
  COPY_RESET_TIMEOUT_MS,
  getCachedResumeUploaded,
  getDefaultModelId,
  isSessionExpiredError,
  setCachedResumeUploaded,
  toErrorMessage,
} from './utils';

export function useAIJobAssistant() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [actionType, setActionType] = useState<ActionType>('ask-referral');
  const [models, setModels] = useState<AIModelOption[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [loadingModels, setLoadingModels] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setResumeUploaded(getCachedResumeUploaded());
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      setLoadingModels(true);

      try {
        const data = await getAIModelsAction();
        setModels(data);
        setSelectedModel(getDefaultModelId(data));
      } catch (modelError) {
        setError(toErrorMessage(modelError, 'Unable to load models.'));
      } finally {
        setLoadingModels(false);
      }
    };

    void loadModels();
  }, []);

  const canGenerate = useMemo(() => {
    return resumeUploaded && jobDescription.trim().length > 0 && selectedModel.length > 0;
  }, [jobDescription, resumeUploaded, selectedModel]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      await uploadResumeAction(formData);
      setResumeUploaded(true);
      setCachedResumeUploaded(true);
    } catch (uploadError) {
      setError(toErrorMessage(uploadError, 'Resume upload failed.'));
    } finally {
      setUploading(false);
    }
  };

  const handleGenerate = async () => {
    if (!canGenerate) {
      return;
    }

    setGenerating(true);
    setCopied(false);
    setError('');

    try {
      const response = await generateMessageAction({
        jobDescription: jobDescription.trim(),
        actionType,
        model: selectedModel,
      });

      setOutput(response.message);
    } catch (generateError) {
      const message = toErrorMessage(generateError, 'Unable to generate message.');

      if (isSessionExpiredError(message)) {
        setResumeUploaded(false);
        setCachedResumeUploaded(false);
      }

      setError(message);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, COPY_RESET_TIMEOUT_MS);
  };

  return {
    resumeUploaded,
    uploading,
    jobDescription,
    setJobDescription,
    actionType,
    setActionType,
    models,
    selectedModel,
    setSelectedModel,
    loadingModels,
    generating,
    output,
    copied,
    error,
    canGenerate,
    handleUpload,
    handleGenerate,
    handleCopy,
  };
}
