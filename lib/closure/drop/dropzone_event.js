goog.provide('dragjs.drop.DropZoneEvent');

goog.require('dragjs.datatransfer.DataTransfer');

dragjs.drop.DropZoneEvent = goog.defineClass(null, {

  /** @lends {dragjs.drop.DropZoneEvent} */
  statics : {
    /** @final */
    EVENT : {
      DRAGOVER : 'dropzone-dragover',
      DRAGEND  : 'dropzone-dragend',
      DROP     : 'dropzone-drop',
    }
  },

  /**
   * @param {!dragjs.drop.DropZone} dropzone
   */
  constructor(dropzone) {
    /** @const {!dragjs.drop.DropZone} */
    this.dropzone = dropzone;
  },

  /**
   * @public
   */
  registerEventListeners() {
    $(this.dropzone.elem)
      .on('drag dragstart dragend dragover dragenter dragleave drop',
        this.preventDefaultAndStopPropagation_.bind(this)
      )
      .on('dragover dragenter',
        this.onDragOver_.bind(this)
      )
      .on('dragleave dragend drop',
        this.onDragEnd_.bind(this)
      )
      .on('drop',
        this.onDrag_.bind(this)
      );
  },

  /**
   * @param {!jQuery.Event} e
   * @private
   */
  preventDefaultAndStopPropagation_(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  /**
   * @param {!jQuery.Event} e
   * @private
   */
  onDragOver_(e) {
    $(e.currentTarget)
      .addClass(this.dropzone.class['dragover'])
      .trigger(dragjs.drop.DropZoneEvent.EVENT.DRAGOVER);
  },

  /**
   * @param {!jQuery.Event} e
   * @private
   */
  onDragEnd_(e) {
    $(e.currentTarget)
      .removeClass(this.dropzone.class['dragover'])
      .trigger(dragjs.drop.DropZoneEvent.EVENT.DRAGEND);
  },

  /**
   * @param {!jQuery.Event} e
   * @private
   */
  onDrag_(e) {

    /** @type {!dragjs.datatransfer.DataTransfer} */
    var dataTransfer = dragjs.datatransfer.DataTransfer.forge(e);

    dataTransfer.getFiles().then((/** @type {!Array.<!File>} */files) => {
      if (files.length) {
        $(e.currentTarget).trigger(dragjs.drop.DropZoneEvent.EVENT.DROP, [files]);
      }
    });
  }
});