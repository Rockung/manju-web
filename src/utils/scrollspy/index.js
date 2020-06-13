/* eslint-disable no-undef */

import {
  activate,
  deactivate,
  getActive,
  sortContents,
  extend,
} from './utils';

const defaults = {

  // Active classes
  navClass: 'active',
  contentClass: 'active',

  // Nested navigation
  nested: false,
  nestedClass: 'active',

  // Offset & reflow
  offset: 250,
  reflow: false,

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
  }

  /**
   * Detect which content is currently active
   */
  _detect = () => {
    // Get the active content
    let active = getActive(this.contents, this.settings);

    // if there's no active content, deactivate and bail
    if (!active) {
      if (this.current) {
        deactivate(this.current, this.settings);
        this.current = null;
      }
      return;
    }

    // If the active content is the one currently active, do nothing
    if (this.current && active.content === this.current.content) return;

    // Deactivate the current content and activate the new content
    deactivate(this.current, this.settings);
    activate(active, this.settings);

    // Update the currently active content
    this.current = active;
  };

  /**
   * Detect the active content on scroll
   * Debounced for performance
   */
  _scrollHandler = () => {
    // If there's a timer, cancel it
    if (this.timeout) {
      window.cancelAnimationFrame(this.timeout);
    }

    // Setup debounce callback
    this.timeout = window.requestAnimationFrame(this._detect);
  };

  /**
   * Update content sorting on resize
   * Debounced for performance
   */
  _resizeHandler = () => {
    // If there's a timer, cancel it
    if (this.timeout) {
      window.cancelAnimationFrame(this.timeout);
    }

    // Setup debounce callback
    let self = this; // save `this` for callback
    this.timeout = window.requestAnimationFrame(function () {
      sortContents(self.contents);
      self._detect();
    });
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
  }

  /**
   * Initialize the current instantiation
   */
  init() {

    // Merge user options into defaults
    this.settings = extend(defaults, this.options || {});

    // Setup variables based on the current DOM
    this._setup();

    // Find the currently active content
    this._detect();

    // Setup event listeners
    window.addEventListener('scroll', this._scrollHandler, false);
    if (this.settings.reflow) {
      window.addEventListener('resize', this._resizeHandler, false);
    }
  }

}

