/* eslint-disable no-undef */

import loadScript from 'load-script2';

const MathJax = {
  mathjax: null,
  render: null,
  register: null,
};

MathJax.register = function register(url) {
  // https://docs.mathjax.org/en/latest/web/configuration.html
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    },
    svg: {
      fontCache: 'global'
    }
  };

  // eslint-disable-next-line no-unused-vars
  loadScript(url).then((script) => {
    MathJax.mathjax = window.MathJax;
    triggerMathJax();
  });
};

export function triggerMathJax() {
  // https://docs.mathjax.org/en/latest/advanced/typeset.html#
  if (MathJax.mathjax) {
    MathJax.mathjax.typeset();
  }
}

export default MathJax;
