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
    /**
     * @const {!HTMLElement}
     */
    this.elem = elem;

    /** @type {!dragjs.drop.DropZoneEvent} */
    this.event = new dragjs.drop.DropZoneEvent(this);

    /** @type {!Object} */
    this.class = {};
    this.class['dragover'] = 'is-dragover';

    this.init_();

    goog.exportProperty(this, 'elem', this.elem);
    goog.exportProperty(this, 'class', this.class);
  },

  /**
   * @private
   */
  init_() {
    this.event.registerEventListeners();
  }
});
