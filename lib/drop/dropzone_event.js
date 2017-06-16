goog.provide('dragjs.drop.DropZoneEvent');

dragjs.drop.DropZoneEvent = goog.defineClass(null, {
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
      .trigger('dropzone-dragover');
  },

  /**
   * @param {!jQuery.Event} e
   * @private
   */
  onDragEnd_(e) {
    $(e.currentTarget)
      .removeClass(this.dropzone.class['dragover'])
      .trigger('dropzone-dragend');
  },

  /**
   * @param {!jQuery.Event} e
   * @private
   */
  onDrag_(e) {
    /**
     * @private {!FileList}
     */
    var droppedFiles = e.originalEvent.dataTransfer.files;

    $(e.currentTarget)
      .trigger('dropzone-drop', [droppedFiles]);
  }
});
