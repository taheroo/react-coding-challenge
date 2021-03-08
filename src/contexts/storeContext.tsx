import { createContext } from 'react';

interface File {
  id: number;
  name: string;
  lastModified: Date;
  size: number;
  type: string;
}
type IFileContext = [File[], React.Dispatch<React.SetStateAction<File[]>>];

const StoreContext = createContext<IFileContext>([[], () => null]);

export default StoreContext;
