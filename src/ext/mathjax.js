import loadScript from 'load-script2'

// https://docs.mathjax.org/en/latest/web/configuration.html
export default function registerMathJax() {
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    },
    svg: {
      fontCache: 'global'
    }
  };
  
  return loadScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js')
}

export function triggerMathJax() {
    // https://docs.mathjax.org/en/latest/advanced/typeset.html#
    if (MathJax && MathJax.typeset) {
      MathJax.typeset();
    }
}
