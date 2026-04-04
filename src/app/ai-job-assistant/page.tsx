'use client';

import { Container, Section, Card } from '@/components/ui';
import {
  ResumeUpload,
  JobInput,
  ActionSelector,
  ModelSelector,
  GenerateButton,
  OutputBox,
} from '@/components/ai-job-assistant';
import { useAIJobAssistant } from './useAIJobAssistant';
import styles from './page.module.scss';
import {
  DocumentIcon,
  BriefcaseIcon,
  SparklesIcon,
  CopyIcon,
  CheckIcon,
} from '@/components/icons/Icons';

export default function AIJobAssistantPage() {
  const {
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
  } = useAIJobAssistant();

  return (
    <div className={styles.page}>
      <Section className={styles.section}>
        <Container className={styles.container}>
          <div className={styles.hero}>
            <h1 className={styles.title}>
              Land your next job <span>faster.</span>
            </h1>
            <p className={styles.subtitle}>
              Generate referral messages, cold emails, and outreach in seconds.
            </p>
          </div>

          <div className={styles.layout}>
            <div className={styles.formStack}>
              {/* Resume Block */}
              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockHeaderLeft}>
                    <DocumentIcon className={styles.blockIcon} />
                    <h2>Resume</h2>
                    <span className={styles.optionalText}>optional</span>
                  </div>
                </div>
                <div className={styles.blockContent}>
                  <ResumeUpload
                    uploaded={resumeUploaded}
                    loading={uploading}
                    onUpload={handleUpload}
                  />
                </div>
              </div>

              {/* Job Description Block */}
              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockHeaderLeft}>
                    <BriefcaseIcon className={styles.blockIcon} />
                    <h2>Job Description</h2>
                  </div>
                </div>
                <div className={styles.blockContentNoPad}>
                  <JobInput value={jobDescription} onChange={setJobDescription} />
                </div>
              </div>

              {/* Selectors */}
              <div className={styles.selectGrid}>
                <div className={styles.blockInline}>
                  <span className={styles.inlineLabel}>ACTION</span>
                  <ActionSelector value={actionType} onChange={setActionType} />
                </div>
                <div className={styles.blockInline}>
                  <span className={styles.inlineLabel}>MODEL</span>
                  <ModelSelector
                    value={selectedModel}
                    models={models}
                    onChange={setSelectedModel}
                    loading={loadingModels}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <GenerateButton
                disabled={!canGenerate}
                loading={generating}
                onClick={handleGenerate}
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>

            {/* Generated Message Block Always Visible */}
            <div className={styles.outputContainer}>
              <div className={styles.blockHeaderPurple}>
                <div className={styles.blockHeaderLeft}>
                  <SparklesIcon className={styles.blockIcon} />
                  <h2>Generated Message</h2>
                </div>
                {output && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={styles.iconCopyButton}
                    title="Copy message"
                  >
                    {copied ? (
                      <CheckIcon className={styles.copyIcon} />
                    ) : (
                      <CopyIcon className={styles.copyIcon} />
                    )}
                  </button>
                )}
              </div>
              <div className={styles.blockContentFull}>
                <OutputBox output={output} />
              </div>
            </div>
          </div>

          <div className={styles.footerText}>
            JobCraft AI — Built to help you land your next role faster
          </div>
        </Container>
      </Section>
    </div>
  );
}
