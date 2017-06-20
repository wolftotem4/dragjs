goog.provide('dragjs.drop.DropZoneEvent');

goog.require('dragjs');
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

    /** @type {!jQuery} */
    var $elem = $(this.dropzone.elem);

    $elem
      .on('drag dragstart dragend dragover dragenter dragleave drop',
        $.proxy(this.preventDefaultAndStopPropagation_, this)
      );

    if (dragjs.basicBrowserSupport()) {
      $elem
        .on('dragover dragenter',
          $.proxy(this.onDragOver_, this)
        )
        .on('dragleave dragend drop',
          $.proxy(this.onDragEnd_, this)
        )
        .on('drop',
          $.proxy(this.onDrag_, this)
        );
    }
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
    /** @type {?DataTransfer} */
    var dataTransfer = dragjs.datatransfer.DataTransfer.getNativeInstance(e);

    /** @type {!boolean} */
    var containFiles = dataTransfer ? dragjs.datatransfer.DataTransfer.containFiles(dataTransfer) : false;

    if (containFiles) {
      $(e.currentTarget)
        .addClass(this.dropzone.class['dragover'])
        .trigger(dragjs.drop.DropZoneEvent.EVENT.DRAGOVER);
    }
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
    }).catch(console.error);
  }
});
