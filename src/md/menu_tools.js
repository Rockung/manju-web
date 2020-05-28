import marked from 'marked'

/**
 * Get menu from the text of markdown
 * 
 * The menu is a list in markdown, such as
 * 
 * - [Home](./examples/home.md)
 * - [Products](./examples/product.md)
 * - [About](./examples/about.md)
 * - Contact
 * 
 * @param {*} markdown 
 */
export function get_menu(markdown) {
  let result = []

  let tokens = marked.lexer(markdown, {})
  for (let token of tokens) {
    if (token.type === 'list') {
      for (let item of token.items) {
        if (item.tokens[0].tokens) { // non-empty list-item
          let node = item.tokens[0].tokens[0]
          if (node.type === 'link') {
            result.push({
              text: node.text,
              href: node.href,
            })
          } else {
            result.push({
              text: node.text,
              href: '',
            })
          }
        }
      }

      // only handle the first list
      break
    }
  }

  return result
}

/**
 * Get sidebar from the text of markdown
 * 
 * The sidebar is a two-level list in markdown, such as
 * 
 * - Get Started
 *   - [Installation](install.md)
 *   - Creating your site
 *   - Publishing your site
 * - Guides
 *   - Adding a Blog
 *   - Custom Pages
 * 
 * @param {*} markdown 
 */
export function get_sidebar(markdown) {
  let result = []
  let tokens = marked.lexer(markdown, {})
  for (let token of tokens) {
    // the first list
    if (token.type === 'list') {
      for (let item of token.items) {
        // level 1
        let currBar = {
          title: item.tokens[0].text,
          children: [],
        }
        result.push(currBar)

        for (let subitem of item.tokens[1].items) {
          // level 2
          let token = subitem.tokens[0].tokens[0]
          if (token.type === 'link') {
            currBar.children.push({
              text: token.text,
              href: token.href,
            })
          } else if (token.type === 'text') {
            currBar.children.push({
              text: token.text,
              href: '',
            })
          }
        }
      }

      break
    }
  }

  return result
}
