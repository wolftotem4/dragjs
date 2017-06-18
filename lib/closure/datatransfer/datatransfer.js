goog.provide('dragjs.datatransfer.DataTransfer');

goog.require('dragjs.datatransfer.EntryTraveler');

dragjs.datatransfer.DataTransfer = goog.defineClass(null, {

  /**
   * @param {DataTransfer=} dataTransfer
   */
  constructor(dataTransfer) {

    /** @type {?DataTransfer} */
    this.originalDataTransfer = dataTransfer || null;
  },

  /**
   * @return {!Promise.<!Array.<!File>>|!Promise.<!FileList>}
   */
  getFiles() {

    if (! this.originalDataTransfer) {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    }

    /** @type {!DataTransfer} */
    var dataTransfer = this.originalDataTransfer;

    if (dataTransfer.items) {

      /** @type {!DataTransferItemList} */
      var items = dataTransfer.items;

      return dragjs.datatransfer.EntryTraveler.fromItemList(items);

    } else {

      /** @type {!FileList} */
      var files = dataTransfer.files;

      return new Promise((resolve, reject) => {
        resolve(files);
      });
    }
  }
});

/**
 * @param  {jQuery.Event|Event}  e
 * @return {!dragjs.datatransfer.DataTransfer}
 */
dragjs.datatransfer.DataTransfer.forge = (e) => {
  /** @type {Event} */
  var event = (e instanceof jQuery.Event) ? e.originalEvent : e;

  if (! (event instanceof DragEvent)) {
    return new dragjs.datatransfer.DataTransfer();
  }

  /** @type {!DragEvent} */
  var dragEvent = event;

  /** @type {DataTransfer|undefined} */
  var dataTransfer = dragEvent.dataTransfer;

  if (dataTransfer instanceof DataTransfer) {
    return new dragjs.datatransfer.DataTransfer(dataTransfer);
  } else {
    return new dragjs.datatransfer.DataTransfer();
  }
};
