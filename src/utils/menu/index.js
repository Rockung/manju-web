/***
 * A menu is a list of clickable hyperlinks. When you click
 * one item of hyperlinks, it becomes active. Usually, a menu
 * is all the **a** tags in a **ul** or **ol**.
 */
export default class Menu {
  constructor(selector, activeClass) {
    this.selector = selector;
    this.activeClass = activeClass;
    this.current = null;
    this.menuItems = [];
  }

  init() {
    // eslint-disable-next-line no-undef
    for (let item of document.querySelectorAll(this.selector)) {
      this.menuItems.push(item);
    }

    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].addEventListener('click', this._clickHandler(i));
    }
  }

  _clickHandler =  (i) => {
    let self = this;

    return function () {
      if (self.current != null) {
        self.current.classList.remove(self.activeClass);
      }
      self.current = self.menuItems[i];
      self.current.classList.add(self.activeClass);
    };
  }
}
