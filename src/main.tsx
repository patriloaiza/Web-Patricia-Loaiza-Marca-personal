import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerWebMcpTools } from './utils/registerWebMcpTools.ts';

registerWebMcpTools();

createRoot(document.getElementById('root')!).render(<App />);
