/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-bash';

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
