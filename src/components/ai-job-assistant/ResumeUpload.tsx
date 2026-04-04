'use client';

import { useRef } from 'react';
import styles from './ResumeUpload.module.scss';

interface ResumeUploadProps {
  uploaded: boolean;
  loading: boolean;
  onUpload: (file: File) => Promise<void>;
}

export default function ResumeUpload({ uploaded, loading, onUpload }: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    await onUpload(file);
    event.target.value = '';
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = async (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const file = event.dataTransfer.files?.[0];
    if (!file) {
      return;
    }

    await onUpload(file);
  };

  return (
    <div className={styles.wrapper}>
      {!uploaded && !loading ? (
        <button
          type="button"
          className={styles.uploadBox}
          onClick={triggerFileSelect}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          disabled={loading}
        >
          <span className={styles.uploadIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </span>
          <p className={styles.uploadPrimary}>
            {loading ? (
              'Uploading resume...'
            ) : (
              <>
                <span>Click to upload</span> or drag and drop
              </>
            )}
          </p>
          <p className={styles.uploadSecondary}>PDF (max 25MB)</p>
        </button>
      ) : (
        <div className={styles.statusPanel}>
          <div className={styles.fileRow}>
            <div className={styles.fileInfo}>
              <span className={styles.fileName}>
                {uploaded ? 'Resume uploaded' : 'Resume pending'}
              </span>
              <span className={styles.fileMeta}>
                {uploaded ? 'Ready to generate message' : 'Uploading...'}
              </span>
            </div>
            <span
              className={`${styles.badge} ${uploaded ? styles.badgeSuccess : styles.badgePending}`}
            >
              {uploaded ? 'Done' : loading ? 'Uploading' : 'Waiting'}
            </span>
          </div>

          <div className={styles.progressTrack}>
            <span
              className={styles.progressFill}
              style={{ width: uploaded ? '100%' : loading ? '65%' : '15%' }}
            />
          </div>

          {!uploaded && !loading && (
            <button type="button" className={styles.retryButton} onClick={triggerFileSelect}>
              Choose resume
            </button>
          )}
          {uploaded && (
            <button type="button" className={styles.retryButton} onClick={triggerFileSelect}>
              Replace resume
            </button>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className={styles.fileInput}
      />
    </div>
  );
}
