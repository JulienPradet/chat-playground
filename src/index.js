import './index.css';
import { init } from './core/index.js';
import Chat from './Chat';

init(Chat(), document.querySelector('#root'));
