/*jshint esversion: 6 */

goog.provide('dragjs.drop.DropZone');

goog.require('dragjs.drop.DropZoneEvent');

/**
 * @export
 */
dragjs.drop.DropZone = class DropZone
{
  /**
   * @param {!HTMLElement} elem
   */
  constructor(elem) {

    /** @const {!HTMLElement} */
    this.elem = elem;

    // /** @private {!dragjs.drop.DropZoneEvent} */
    this.event = new dragjs.drop.DropZoneEvent(this);

    // this.initEvent();
  }

  /**
   * @return {!HTMLElement}
   * @export
   */
  getElem() {
    return this.elem;
  }

  // /**
  //  * @private
  //  */
  // initEvent() {
    
  // }
};

// goog.exportProperty(dragjs.drop.DropZone, 'elem', dragjs.drop.DropZone.property.elem);