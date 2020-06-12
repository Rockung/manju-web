/* eslint-disable no-undef */

import App from './App';
import registerExtensions from './extentions';

import { ManjuWeb } from './version';
window.ManjuWeb = ManjuWeb;

// FIXME: Extensions may be loaded when they are needed.
registerExtensions();

const app = new App({
  target: document.body,
});

export default app;
