import { get_json } from '../utils/network'
import registerMathJax from './mathjax'
import Mermaid from './mermaid'

async function get_packages() {
  let config = await get_json('systemjs.json')
  return config['imports']
}

export default async function registerExtensions() {
  let config = await get_packages()

  if (config && config['MathJax']) {
    registerMathJax(config['MathJax']).then((script) => {})
  }  else {
    registerMathJax('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js').then((script) => {})
  }

  if (config && config['Mermaid']) {
    Mermaid.register(config['Mermaid'])  
  } else {
    Mermaid.register('https://cdn.bootcdn.net/ajax/libs/mermaid/8.5.1/mermaid.min.js')
  }
}

