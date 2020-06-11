/* eslint-disable no-undef */

// https://vega.github.io/vega/usage/

import loadScript from 'load-script2';
import { unescapeHTML } from '../utils/escape';

const Vega = {
  vega: null,
  render: null,
  register: null
};

Vega.register = function (url) {
  // eslint-disable-next-line no-unused-vars
  loadScript(url).then((script) => {
    Vega.vega = window.vega;
    Vega.render = (container, spec) => {
      let view = new window.vega.View(window.vega.parse(spec), {
        renderer: 'canvas',
        container,
        hover: true,
      });

      return view.runAsync;
    };

    triggerVega();
  });
};

export function triggerVega() {
  if (Vega.render) {
    let codeList = document.querySelectorAll('code.language-vega');
    for (let ele of codeList) {
      let parent = ele.parentElement;
      parent.id = 'vega-' + parseInt(Math.random() * (10000 + 1));
      Vega.render('#' + parent.id, JSON.parse(unescapeHTML(ele.innerHTML)));
    }
  } else {
    console.log('Vega is not loaded!');
  }
}

export default Vega;

