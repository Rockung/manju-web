/* eslint-disable no-undef */
// https://github.com/smartdown/smartdown/blob/master/src/extensions/Mermaid.js

import loadScript from 'load-script2';
import { unescapeHTML } from '../utils/escape';

const Mermaid = {
  mermaid: null,
  render: null,
  register: null,
};

Mermaid.register = function register(url) {
  // eslint-disable-next-line no-unused-vars
  loadScript(url).then((script) => {
    Mermaid.mermaid = window.mermaid;
    Mermaid.mermaid.initialize({ startOnLoad: false, });

    Mermaid.render = (div, code) => {
      Mermaid.mermaid.render(
        div.id + '_svg',
        code,
        function (svgCode) {
          div.innerHTML = svgCode;
        },
        div
      );
    };

    triggerMermaid();
  });
};

export function triggerMermaid() {
  if (Mermaid.mermaid) {
    let codeList = document.querySelectorAll('code.language-mermaid');
    for (let ele of codeList) {
      let parent = ele.parentElement;
      parent.classList.add('mermaid');
      parent.id = 'mermaid-' + parseInt(Math.random() * (10000 + 1));
      Mermaid.render(parent, unescapeHTML(ele.innerHTML));
    }
  }
}

export default Mermaid;
