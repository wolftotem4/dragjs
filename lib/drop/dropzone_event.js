/*jshint esversion: 6 */

goog.provide('dragjs.drop.DropZoneEvent');

/**
 * @export
 */
dragjs.drop.DropZoneEvent = class DropZoneEvent
{
  /**
   * @param {!dragjs.drop.DropZone} dropzone 
   */
  constructor(dropzone)
  {
    /** @const {!dragjs.drop.DropZone} */
    this.dropzone = dropzone;
  }
};