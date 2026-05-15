import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import { store } from './redux/store.js';
import { LoadingProvider } from './context/LoadingContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <LoadingProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </LoadingProvider>
    </StrictMode>,
);
