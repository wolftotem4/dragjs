/*jshint esversion: 6 */

goog.provide('dragjs.drop.DropZoneEvent');

dragjs.drop.DropZoneEvent = goog.defineClass(null, {
  /**
   * @param {!dragjs.drop.DropZone} dropzone
   */
  constructor(dropzone)
  {
    /** @const {!dragjs.drop.DropZone} */
    this.dropzone = dropzone;
  },

  /**
   * @public
   */
  registerEventListeners()
  {
    $(this.dropzone.elem).on(
      'drag dragstart dragend dragover dragenter dragleave drop',
      /**
       * @param {!DragEvent} e
       */
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    );
  }
});
