/* eslint-disable no-undef */

/**
 * Merge two or more objects together.
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object}            Merged values of defaults and options
 */
const extend = function () {
  let merged = {};
  Array.prototype.forEach.call(arguments, (function (obj) {
    for (let key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (!obj.hasOwnProperty(key)) return;
      merged[key] = obj[key];
    }
  }));
  return merged;
};

/**
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {Node}   elem   The element to attach the event to
 * @param  {Object} detail Any details to pass along with the event
 */
const emitEvent = function (type, elem, detail) {

  // Make sure events are enabled
  if (!detail.settings.events) return;

  // Create a new event
  let event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail: detail
  });

  // Dispatch the event
  elem.dispatchEvent(event);

};

/**
 * Get an element's distance from the top of the Document.
 * @param  {Node} elem The element
 * @return {Number}    Distance from the top in pixels
 */
const getOffsetTop = function (elem) {
  let location = 0;
  if (elem.offsetParent) {
    while (elem) {
      location += elem.offsetTop;
      elem = elem.offsetParent;
    }
  }
  return location >= 0 ? location : 0;
};

/**
 * Sort content from first to last in the DOM
 * @param  {Array} contents The content areas
 */
const sortContents = function (contents) {
  if (contents) {
    contents.sort((function (item1, item2) {
      let offset1 = getOffsetTop(item1.content);
      let offset2 = getOffsetTop(item2.content);
      if (offset1 < offset2) return -1;
      return 1;
    }));
  }
};

/**
 * Get the offset to use for calculating position
 * @param  {Object} settings The settings for this instantiation
 * @return {Float}           The number of pixels to offset the calculations
 */
const getOffset = function (settings) {

  // if the offset is a function run it
  if (typeof settings.offset === 'function') {
    return parseFloat(settings.offset());
  }

  // Otherwise, return it as-is
  return parseFloat(settings.offset);

};

/**
 * Get the document element's height
 * @private
 * @returns {Number}
 */
const getDocumentHeight = function () {
  return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
};

/**
 * Determine if an element is in view
 * @param  {Node}    elem     The element
 * @param  {Object}  settings The settings for this instantiation
 * @param  {Boolean} bottom   If true, check if element is above bottom of viewport instead
 * @return {Boolean}          Returns true if element is in the viewport
 */
const isInView = function (elem, settings, bottom) {
  let bounds = elem.getBoundingClientRect();
  let offset = getOffset(settings);
  if (bottom) {
    return parseInt(bounds.bottom, 10) < (window.innerHeight || document.documentElement.clientHeight);
  }
  return parseInt(bounds.top, 10) <= offset;
};

/**
 * Check if at the bottom of the viewport
 * @return {Boolean} If true, page is at the bottom of the viewport
 */
const isAtBottom = function () {
  if (window.innerHeight + window.pageYOffset >= getDocumentHeight()) return true;
  return false;
};

/**
 * Check if the last item should be used (even if not at the top of the page)
 * @param  {Object} item     The last item
 * @param  {Object} settings The settings for this instantiation
 * @return {Boolean}         If true, use the last item
 */
const useLastItem = function (item, settings) {
  if (!item) return false;

  if (isAtBottom() && isInView(item.content, settings, true)) return true;
  return false;
};

/**
 * Get the active content
 * @param  {Array}  contents The content areas
 * @param  {Object} settings The settings for this instantiation
 * @return {Object}          The content area and matching navigation link
 */
const getActive = function (contents, settings) {
  let last = contents[contents.length - 1];
  if (useLastItem(last, settings)) return last;
  for (let i = contents.length - 1; i >= 0; i--) {
    if (isInView(contents[i].content, settings)) return contents[i];
  }
};

/**
 * Deactivate parent navs in a nested navigation
 * @param  {Node}   nav      The starting navigation element
 * @param  {Object} settings The settings for this instantiation
 */
const deactivateNested = function (nav, settings) {

  // If nesting isn't activated, bail
  if (!settings.nested || !nav.parentNode) return;

  // Get the parent navigation
  let li = nav.parentNode.closest('li');
  if (!li) return;

  // Remove the active class
  li.classList.remove(settings.nestedClass);

  // Apply recursively to any parent navigation elements
  deactivateNested(li, settings);

};

/**
 * Deactivate a nav and content area
 * @param  {Object} items    The nav item and content to deactivate
 * @param  {Object} settings The settings for this instantiation
 */
const deactivate = function (items, settings) {

  // Make sure there are items to deactivate
  if (!items) return;

  // Get the parent list item
  let li = items.nav.closest('li');
  if (!li) return;

  // Remove the active class from the nav and content
  li.classList.remove(settings.navClass);
  items.content.classList.remove(settings.contentClass);

  // Deactivate any parent navs in a nested navigation
  deactivateNested(li, settings);

  // Emit a custom event
  emitEvent('gumshoeDeactivate', li, {
    link: items.nav,
    content: items.content,
    settings: settings
  });

};


/**
 * Activate parent navs in a nested navigation
 * @param  {Node}   nav      The starting navigation element
 * @param  {Object} settings The settings for this instantiation
 */
const activateNested = function (nav, settings) {

  // If nesting isn't activated, bail
  if (!settings.nested) return;

  // Get the parent navigation
  let li = nav.parentNode.closest('li');
  if (!li) return;

  // Add the active class
  li.classList.add(settings.nestedClass);

  // Apply recursively to any parent navigation elements
  activateNested(li, settings);

};

/**
 * Activate a nav and content area
 * @param  {Object} items    The nav item and content to activate
 * @param  {Object} settings The settings for this instantiation
 */
const activate = function (items, settings) {

  // Make sure there are items to activate
  if (!items) return;

  // Get the parent list item
  let li = items.nav.closest('li');
  if (!li) return;

  // Add the active class to the nav and content
  li.classList.add(settings.navClass);
  items.content.classList.add(settings.contentClass);

  // Activate any parent navs in a nested navigation
  activateNested(li, settings);

  // Emit a custom event
  emitEvent('gumshoeActivate', li, {
    link: items.nav,
    content: items.content,
    settings: settings
  });

};

export { extend, activate, deactivate, getActive, sortContents };
