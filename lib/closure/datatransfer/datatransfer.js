goog.provide('dragjs.datatransfer.DataTransfer');

goog.require('dragjs.datatransfer.EntryTraveler');

dragjs.datatransfer.DataTransfer = goog.defineClass(null, {

  /**
   * @param {?DataTransfer=} dataTransfer
   */
  constructor(dataTransfer = null) {

    /** @type {?DataTransfer} */
    this.originalDataTransfer = dataTransfer;
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

  /** @type {?DataTransfer} */
  var dataTransfer = dragjs.datatransfer.DataTransfer.getNativeInstance(e);

  return new dragjs.datatransfer.DataTransfer(dataTransfer);
};

/**
 * @param  {jQuery.Event|Event}  e
 * @return {?DataTransfer}
 */
dragjs.datatransfer.DataTransfer.getNativeInstance = (e) => {
  /** @type {Event} */
  var event = (e instanceof jQuery.Event) ? e.originalEvent : e;

  if (! (event instanceof DragEvent)) {
    return null;
  }

  /** @type {!DragEvent} */
  var dragEvent = event;

  /** @type {DataTransfer|undefined} */
  var dataTransfer = dragEvent.dataTransfer;

  return (dataTransfer instanceof DataTransfer) ? dataTransfer : null;
};

/**
 * @param {!DataTransfer} dataTransfer
 * @return {boolean}
 */
dragjs.datatransfer.DataTransfer.containFiles = (dataTransfer) => {
  /** @type {!DOMStringList|!Array.<!string>|undefined} */
  var dataTransferTypes = dataTransfer.types;

  if (! dataTransferTypes) {
    // Unsupported Browser, we presume it was a file.
    return true;
  }

  return dataTransferTypes.indexOf ? dataTransferTypes.indexOf('Files') > -1 : dataTransferTypes.contains('Files');
};
