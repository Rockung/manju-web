import {
  activate,
  deactivate,
  getActive,
  sortContents,
  extend,
} from './utils'

const defaults = {

  // Active classes
  navClass: 'active',
  contentClass: 'active',

  // Nested navigation
  nested: false,
  nestedClass: 'active',

  // Offset & reflow
  offset: 0,
  reflow: true,

  // Event support
  events: true

};


/**
 * Create the Constructor object
 * @param {String} selector The selector to use for navigation items
 * @param {Object} options  User options and settings
 */
export default class ScrollSpy {
  constructor(selector, options) {
    this.selector = selector;
    this.options = options;

    this.navItems = null;
    this.contents = null;
    this.current = null;
    this.timeout = 0;
    this.settings = null;

    this._scrollHandler = null;
    this._resizeHandler = null;
  }

  /**
   * Set variables from DOM elements
   */
  _setup() {

    // Get all nav items
    this.navItems = document.querySelectorAll(this.selector);
    // Create contents array
    this.contents = [];

    // Loop through each item, get it's matching content, and push to the array
    for (let item of this.navItems) {
      // Get the content for the nav item
      let content = document.getElementById(decodeURIComponent(item.hash.substr(1)));
      if (!content) return;

      // Push to the contents array
      this.contents.push({
        nav: item,
        content: content
      });
    }

    // Sort contents by the order they appear in the DOM
    sortContents(this.contents);
  };

  /**
   * Detect which content is currently active
   */
  _detect(thiz) {
    return function () {
      // Get the active content
      let active = getActive(thiz.contents, thiz.settings);

      // if there's no active content, deactivate and bail
      if (!active) {
        if (thiz.current) {
          deactivate(thiz.current, thiz.settings);
          thiz.current = null;
        }
        return;
      }

      // If the active content is the one currently active, do nothing
      if (thiz.current && active.content === thiz.current.content) return;

      // Deactivate the current content and activate the new content
      deactivate(thiz.current, thiz.settings);
      activate(active, thiz.settings);

      // Update the currently active content
      thiz.current = active;
    }
  };

  /**
   * Detect the active content on scroll
   * Debounced for performance
   */
  _scroll_handler(thiz) {
    return function (event) {
      // If there's a timer, cancel it
      if (thiz.timeout) {
        window.cancelAnimationFrame(thiz.timeout);
      }

      // Setup debounce callback
      thiz.timeout = window.requestAnimationFrame(thiz._detect(thiz));
    }
  };

  /**
   * Update content sorting on resize
   * Debounced for performance
   */
  _resize_handler(thiz) {
    return function (event) {
      // If there's a timer, cancel it
      if (thiz.timeout) {
        window.cancelAnimationFrame(thiz.timeout);
      }

      // Setup debounce callback
      thiz.timeout = window.requestAnimationFrame(function () {
        sortContents(thiz.contents);
        (thiz._detect(thiz))();
      });
    }
  };

  /**
   * Destroy the current instantiation
   */
  destroy() {
    // Undo DOM changes
    if (this.current) {
      deactivate(this.current, this.settings);
    }

    // Remove event listeners
    window.removeEventListener('scroll', this._scrollHandler, false);
    if (this.settings.reflow) {
      window.removeEventListener('resize', this._resizeHandler, false);
    }

    // Reset variables
    this.contents = null;
    this.navItems = null;
    this.current = null;
    this.timeout = null;
    this.settings = null;

    this._scrollHandler = null;
    this._resizeHandler = null;
  };

  /**
   * Initialize the current instantiation
   */
  init() {

    // Merge user options into defaults
    this.settings = extend(defaults, this.options || {});

    // Setup variables based on the current DOM
    this._setup();

    // Find the currently active content
    this._detect(this)();

    // Setup event listeners
    this._scrollHandler = this._scroll_handler(this);
    window.addEventListener('scroll', this._scrollHandler, false);
    if (this.settings.reflow) {
      this._resizeHandler = this._resize_handler(this)
      window.addEventListener('resize', this._resizeHandler, false);
    }
  };

};

