goog.provide('dragjs.upload.Uploader');

goog.require('dragjs.ajax.UploadPool');

/**
 * @export
 */
dragjs.upload.Uploader = goog.defineClass(null, {

  /**
   * @param {!FileList|!Array<!File>} files
   * @param {!string} url
   */
  constructor(files, url) {

    /** @type {!FileList|!Array<!File>} */
    this.files = files;

    /** @type {!string} */
    this.url = url;

    /** @type {?dragjs.ajax.UploadPool} */
    this.pool = null;

    goog.exportProperty(this, 'files', this.files);
    goog.exportProperty(this, 'url', this.url);
  },

  /**
   * @export
   */
  run() {

    var pool = new dragjs.ajax.UploadPool(this.url, this.files);

    pool.run();
  }
});
