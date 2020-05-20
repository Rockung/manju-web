// the positions in the regex
export const MENU = 1
export const CONTENTS = 2

// use () to capture the matches
const REG_EX = /(# menu)|(# contents)/i

// split the contents from `index.md`
export function split_index_file(src) {
  let capture
  let curr = 0
  let sections = {}

  while ((capture = REG_EX.exec(src)) !== null) {
    if (curr > 0) {
      sections[curr] = src.substring(0, capture.index)
    }

    if (capture[MENU]) {
      curr = MENU
    }
    else if (capture[CONTENTS]) {
      curr = CONTENTS
    } else {
      curr = 0
    }

    src = src.substring(capture.index + capture[0].length)
  }

  // the last section
  if (curr > 0 && src) {
    sections[curr] = src
  }

  return sections
}
