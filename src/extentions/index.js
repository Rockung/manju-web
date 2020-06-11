/* eslint-disable no-unused-vars */

// FIXME: Extensions may be loaded when they are needed.

import { get_json } from '../utils/network';
import registerMathJax from './mathjax';
import Mermaid from './mermaid';
import Vega from './vega';

async function get_packages() {
  let config = await get_json('manju-web-js.json');
  return config['imports'];
}

function get_url(config, key, defaultUrl) {
  if (config && config[key]) {
    return config[key];
  } else {
    return defaultUrl;
  }
}

export default async function registerExtensions() {
  let config = await get_packages();

  // Mathjax
  registerMathJax(get_url(config, 'mathjax', 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'))
    .then((script) => { });

  // Mermaid
  Mermaid.register(get_url(config, 'mermaid', 'https://cdn.bootcdn.net/ajax/libs/mermaid/8.5.1/mermaid.min.js'));

  // Vega
  Vega.register(get_url(config, 'vega', 'https://cdn.jsdelivr.net/npm/vega@5'));

}

export { triggerMathJax } from './mathjax';
export { triggerMermaid } from './mermaid';
export { triggerVega } from './vega';
