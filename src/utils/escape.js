const htmlEntityMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': '\'',
  '&#x2F;': '/',
};

export function unescapeHTML(str) {
  if (typeof str !== 'string') throw new TypeError('str must be a string!');

  for (let k in htmlEntityMap) {
    let reg = new RegExp(k, "g")
    str = str.replace(reg, htmlEntityMap[k])
  }

  return str;
}
