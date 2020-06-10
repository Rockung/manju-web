import loadScript from 'load-script2'

// https://docs.mathjax.org/en/latest/web/configuration.html
export default function registerMathJax(url) {  
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    },
    svg: {
      fontCache: 'global'
    }
  };
  
  return loadScript(url)
}

export function triggerMathJax() {
    // https://docs.mathjax.org/en/latest/advanced/typeset.html#
    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset();
    }
}
