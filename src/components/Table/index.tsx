import React from 'react';
import styles from './Table.module.css';
import formatBytes from '../../utils/formatBytes';
import File from '../../interfaces/file';
import Button from '../Button';

interface Props {
  files: Array<File>;
  handleClickButton: (id: number) => void;
}

const Table: React.FC<Props> = ({ files, handleClickButton }) => (
  <table className={styles.table}>
    <tbody>
      <tr className={[styles.defaultText, styles.tableHeader].join(` `)}>
        <th>Filename</th>
        <th>File Size</th>
        <th>Last Modified</th>
        <th>File Format</th>
        <th> </th>
      </tr>
      {files &&
        files?.map((data: File) => (
          <tr
            key={data.id}
            className={[styles.defaultText, styles.tableRow].join(` `)}
          >
            <td>{data.name}</td>
            <td>{formatBytes(data.size)}</td>
            <td>{new Date(data.lastModified).toUTCString()}</td>
            <td>{data.type}</td>
            <td>
              <Button
                text="X"
                onClick={() => handleClickButton(data.id)}
                className={styles.deleteButton}
              />
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default Table;
