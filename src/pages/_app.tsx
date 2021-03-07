import { AppProps } from 'next/app';
import store from '../store/store';
import StoreContext from '../contexts/storeContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}
