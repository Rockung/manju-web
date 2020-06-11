/* eslint-disable no-undef */

// https://github.com/smartdown/smartdown/blob/master/src/extensions/Mermaid.js

import loadScript from 'load-script2';
import { unescapeHTML } from '../utils/escape';

const Mermaid = {
  mermaid: null,
  mermaidRender: null,
  register: null,
};

Mermaid.register = function register(url) {
  // eslint-disable-next-line no-unused-vars
  loadScript(url).then((script) => {
    initializeMermaid();
    triggerMermaid();
  });
};

function fixupMermaidSVG(svgCode) {
  svgCode = svgCode.replace(/\n/g, '');
  let beginStyleTag = '<style>';
  let endStyleTag = '</style>';

  let beginStyle = svgCode.indexOf(beginStyleTag);
  let endStyle = svgCode.indexOf(endStyleTag);
  let svgStyle = svgCode.slice(beginStyle + beginStyleTag.length, endStyle).trim();
  let svgStyleLines = svgStyle.split(/}/g);
  --svgStyleLines.length; // Assumes last element is ''
  let svgNewStyleLines = svgStyleLines.map(function (line) {
    let bracePos = line.indexOf('{');
    let selectors = line.slice(0, bracePos);
    let body = line.slice(bracePos);
    let selectorsNew = selectors.replace(/,/g, ',.mermaid ');
    selectorsNew = '.mermaid ' + selectorsNew;
    selectorsNew = selectorsNew.replace(/.mermaid .mermaid/g, '.mermaid');

    let newLine = selectorsNew + body;
    return newLine;
  });
  let svgNewStyle = beginStyleTag + svgNewStyleLines.join('}') + endStyleTag;
  svgCode = svgCode.slice(0, beginStyle) +
    svgNewStyle +
    svgCode.slice(endStyle + endStyleTag.length);
  return svgCode;
}

function doMermaiRender(div, code) {
  if (Mermaid.mermaid) {
    div.classList.add('mermaid');
    Mermaid.mermaid.render(
      div.id + '_svg',
      code,
      function (svgCode) {
        let svgCodeNew = fixupMermaidSVG(svgCode);
        div.innerHTML = svgCodeNew;
      },
      div
    );
  }
  else {
    div.innerHTML = 'mermaidjs not loaded';
  }
}

function initializeMermaid() {
  Mermaid.mermaid = window.mermaid;
  Mermaid.mermaidRender = mermaidRender;

  let config = {
    startOnLoad: false,
    cloneCssStyles: false,
    logLevel: 3,
    // theme: 'dark',
    // logLevel , decides the amount of logging to be used.
    //    * debug: 1
    //    * info: 2
    //    * warn: 3
    //    * error: 4
    //    * fatal: 5

    htmlLabels: true,
    fontSize: 16,
    flowchart: {
      htmlLabels: true,
      useMaxWidth: false,
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 20,
      actorMargin: 40,
      width: 120,
      height: 40,
      boxMargin: 20,
      boxTextMargin: 5,
      noteMargin: 5,
      messageMargin: 55,
      mirrorActors: false,
      bottomMarginAdj: 0,
      useMaxWidth: false,
    },
    ganttchart: {
      titleTopMargin: 15,
      diagramMarginX: 10,
      diagramMarginY: 10,
      barHeight: 20,
      barGap: 4,
      topPadding: 50,
      sidePadding: 75,
      gridLineStartPadding: 35,
      fontSize: 16,
      numberSectionStyles: 3,
      useMaxWidth: false,
      // axisFormatter: [
      //   // Within a day
      //   ['%I:%M', function (d) {
      //     return d.getHours();
      //   }],
      //   // Monday a week
      //   ['w. %U', function (d) {
      //     return d.getDay() === 1;
      //   }],
      //   // Day within a week (not monday)
      //   ['%a %d', function (d) {
      //     return d.getDay() && d.getDate() !== 1;
      //   }],
      //   // within a month
      //   ['%b %d', function (d) {
      //     return d.getDate() !== 1;
      //   }],
      //   // Month
      //   ['%m-%y', function (d) {
      //     return d.getMonth();
      //   }]
      // ]
    }
  };

  Mermaid.mermaid.initialize(config);
}

function mermaidRender() {
  let codeList = document.querySelectorAll('code.language-mermaid');
  for (let ele of codeList) {
    let parent = ele.parentElement;
    parent.id = 'mermaid-' + parseInt(Math.random() * (10000 + 1));
    doMermaiRender(ele.parentElement, unescapeHTML(ele.innerHTML));
  }
}

export function triggerMermaid() {
  if (Mermaid.mermaidRender) {
    Mermaid.mermaidRender();
  }
}

export default Mermaid;
