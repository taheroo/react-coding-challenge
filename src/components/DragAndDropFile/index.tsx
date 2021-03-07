import React from 'react';
import Image from 'next/image';
import styles from './DragAndDropFile.module.css';
import File from '../../interfaces/file';

interface Props {
  droppedFile?: File | null;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onChangeInputFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DragAndDropFile: React.FC<Props> = ({
  droppedFile,
  onChangeInputFile,
  onDragEnter,
}) => (
  <div className={styles.dropFile} draggable="true" onDragEnter={onDragEnter}>
    <label className={styles.fileContainer} htmlFor="file-input">
      <div>
        {droppedFile ? (
          <>
            {droppedFile?.name.substr(
              droppedFile?.name.lastIndexOf(`.`) + 1,
            ) === (`pdf` || `doc` || `docx`) ? (
              <>
                <Image
                  src="/document.svg"
                  alt="An SVG of a file"
                  height={64}
                  width={64}
                />
                <p className={styles.defaultText}>{droppedFile?.name}</p>
              </>
            ) : (
              <>
                <Image
                  src="/close.svg"
                  alt="An SVG of close"
                  height={64}
                  width={64}
                />
                <p className={styles.defaultText}>Invalid File</p>
              </>
            )}
          </>
        ) : (
          <>
            <p className={[styles.defaultText, styles.centerText].join(` `)}>
              +
            </p>
            <p className={styles.defaultText}>Drop file here</p>
          </>
        )}
      </div>
      {droppedFile === null ? (
        <input
          id="file-input"
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={onChangeInputFile}
        />
      ) : null}
    </label>
  </div>
);
export default DragAndDropFile;
