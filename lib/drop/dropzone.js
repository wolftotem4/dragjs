/*jshint esversion: 6 */

goog.provide('dragjs.drop.DropZone');

goog.require('dragjs.drop.DropZoneEvent');

/**
 * @export
 */
dragjs.drop.DropZone = goog.defineClass(null, {
  /**
   * @param {!HTMLElement} elem
   */
  constructor(elem) {

    /** @const {!HTMLElement} */
    this.elem = elem;

    /** @private {!dragjs.drop.DropZoneEvent} */
    this.event = new dragjs.drop.DropZoneEvent(this);

    this.init();
  },

  /**
   * @return {!HTMLElement}
   * @export
   */
  getElem() {
    return this.elem;
  },

  /**
   * @private
   */
  init() {
    this.event.registerEventListeners();
  }
});
