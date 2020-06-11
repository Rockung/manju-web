// https://github.com/markedjs/marked/blob/master/src/Slugger.js
// Maybe replace it with hexo-util

export function slugize(value) {
  return value
    .toLowerCase()
    .trim()
    // remove html tags
    .replace(/<[!/a-z].*?>/ig, '')
    // remove unwanted chars
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s/g, '-');
}
