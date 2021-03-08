import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import File from '../interfaces/file';
import styles from '../styles/Home.module.css';
import Table from '../components/Table';
import Button from '../components/Button';
import DragAndDropFile from '../components/DragAndDropFile';
import { filesLoaded, fileAdded, fileRemoved } from '../store/fileHistory';
import StoreContext from '../contexts/storeContext';

export default function Home() {
  const fileHistory = useContext(StoreContext);
  const [files, setFiles] = useState<File[] | []>([]);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    fileHistory.dispatch(filesLoaded());
    setFiles(fileHistory.getState().fileHistory);
  }, []);

  const onChangeInputFile = (e: any) => {
    setDroppedFile(e.target.files[0]);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    if (e.target?.files?.[0]) {
      setDroppedFile(e.target.files[0]);
    }
  };

  const handleSaveFile = () => {
    const t: any = {
      id: Date.now(),
      name: droppedFile?.name,
      lastModified: droppedFile?.lastModified,
      size: droppedFile?.size,
      type: droppedFile?.type,
    };
    let previousFiles: any = [];
    if (localStorage.getItem(`file-history`)) {
      previousFiles = previousFiles.concat(
        localStorage.getItem(`file-history`),
      );
    }

    const updateFileHistory = previousFiles.concat(JSON.stringify(t));

    localStorage.setItem(`file-history`, updateFileHistory);
    fileHistory.dispatch(fileAdded(t));
    setFiles(fileHistory.getState().fileHistory);
    setIsDisabled(true);
  };

  const handleResetFile = () => {
    setDroppedFile(null);
    setIsDisabled(false);
  };

  const handleClickButton = (id: number) => {
    let f: any = `[${localStorage.getItem(`file-history`)}]`;
    f = JSON.parse(f);
    if (Array.isArray(f)) {
      f = f.filter((file: any) => file.id !== id);
      let fileHistorytmp = JSON.stringify(f);
      fileHistorytmp = fileHistorytmp.substring(1, fileHistorytmp.length - 1);
      localStorage.setItem(`file-history`, fileHistorytmp);
      fileHistory.dispatch(fileRemoved({ id }));
      setFiles(fileHistory.getState().fileHistory);
    }
  };

  return (
    <div>
      <Head>
        <title>Magicul Coding Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p className={styles.defaultText}>Drop Zone</p>
        <div style={{ width: `40%` }}>
          <DragAndDropFile
            droppedFile={droppedFile}
            onDragEnter={handleDragEnter}
            onChangeInputFile={onChangeInputFile}
          />
          {droppedFile && (
            <div className={styles.buttonsWrapper}>
              <Button text="Reset File" onClick={handleResetFile} />
              {droppedFile?.name.substr(
                droppedFile?.name.lastIndexOf(`.`) + 1,
              ) === (`pdf` || `doc` || `docx`) ? (
                <Button
                  text="Save File"
                  onClick={handleSaveFile}
                  disabled={isDisabled}
                />
              ) : null}
            </div>
          )}
        </div>
        <p className={styles.defaultText}>File History</p>
        <Table files={files} handleClickButton={handleClickButton} />
      </main>
    </div>
  );
}
