goog.provide('dragjs.drop.DropZone');

goog.require('dragjs.drop.DropZoneEvent');

/**
 * @export
 */
dragjs.drop.DropZone = goog.defineClass(null, {

  /**
   * @param  {!HTMLElement}  elem
   * @param  {!Object=}      options
   * @return {!dragjs.drop.DropZone}
   */
  constructor(elem, options = {}) {

    var dropzone = $(elem).data('dropzone');
    if (dropzone instanceof dragjs.drop.DropZone) {
      return dropzone;
    }

    /**
     * @const {!HTMLElement}
     */
    this.elem = elem;

    /** @type {!dragjs.drop.DropZoneEvent} */
    this.event = new dragjs.drop.DropZoneEvent(this);

    /** @type {!Object} */
    this.class = {};

    /** @type {!string} */
    this.class['dragover'] = this.getClassName_(options, 'dragover', 'is-dragover');

    this.init_();

    goog.exportProperty(this, 'elem', this.elem);
    goog.exportProperty(this, 'class', this.class);
  },

  /**
   * @param  {!Object}   options
   * @param  {!string}   key
   * @param  {!string=}  defaults
   * @return {!string}
   * @private
   */
  getClassName_(options, key, defaults = "") {
    if (options['class'] && options['class'][key]) {
      return options['class'][key];
    }
    return defaults;
  },

  /**
   * @private
   */
  init_() {
    $(this.elem).data('dropzone', this);
    this.event.registerEventListeners();
  },

  /**
   * @param  {!Function}  listener
   * @export
   */
  drop(listener) {
    $(this.elem).on(dragjs.drop.DropZoneEvent.EVENT.DROP, listener);
  }
});
