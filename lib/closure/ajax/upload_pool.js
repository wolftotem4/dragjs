goog.provide('dragjs.ajax.UploadPool');

goog.require('dragjs.ajax.Upload');

dragjs.ajax.UploadPool = goog.defineClass(null, {

  /**
   * @param {!string} url
   * @param {!FileList|!Array.<!File>} files
   * @param {number=} limit
   */
  constructor(url, files, limit = 3) {

    /** @private {boolean} */
    this.begin = false;

    /** @type {!string} */
    this.url = url;

    /** @type {number} */
    this.index = -1;

    /** @type {!FileList|!Array.<!File>} */
    this.files = files;

    /** @type {number} */
    this.limit = limit;

    /** @type {!Array.<dragjs.ajax.Upload>} */
    this.uploads = [];

    /** @type {!Array.<!Function>} */
    this.postCreateListeners = [];

    /** @type {!Array.<!Function>} */
    this.ajaxCreatedListeners = [];
  },

  /**
   * @public
   */
  run() {

    if (this.begin) return;
    this.begin = true;

    /** @type {number} */
    var left = this.limit;
    while (left) {

      /** @type {?dragjs.ajax.Upload} */
      var upload = this.upload_();
      if (! upload) return;
    }
  },

  /**
   * @return {?dragjs.ajax.Upload}
   * @private
   */
  upload_() {

    if (++this.index >= this.files.length) {
      return null;
    }

    /** @type {!File} */
    var file = this.files[this.index];

    this.triggerPostCreate_(file);

    /** @type {!string} */
    var filename = file['xRelativePath'] || file.webkitRelativePath || file.name;

    /** @type {!FormData} */
    var formdata = new FormData();

    formdata.append('file[]', file, filename);

    /** @type {!dragjs.ajax.Upload} */
    var ajaxUpload = new dragjs.ajax.Upload(this.url, {
      data : formdata
    });

    ajaxUpload.jqxhr
      .done(this.onDone_.bind(this))
      .fail(this.onFail_.bind(this));

    this.uploads.push(ajaxUpload);

    this.triggerAjaxCreated(ajaxUpload, file);

    return ajaxUpload;
  },

  /**
   * @param {!Function} callback
   */
  postCreate(callback) {
    this.postCreateListeners.push(callback);
  },

  /**
   * 
   * @param {!Function} callback
   */
  ajaxCreated(callback) {
    this.ajaxCreatedListeners.push(callback);
  },

  /**
   * @param {!File} file
   * @private
   */
  triggerPostCreate_(file) {
    for (var i = 0, len = this.postCreateListeners.length; i < len; i++) {
      var callback = this.postCreateListeners[i];
      callback(file);
    }
  },

  /**
   * @param {!dragjs.ajax.Upload} ajaxUpload
   * @param {!File} file
   * @private
   */
  triggerAjaxCreated(ajaxUpload, file) {
    for (var i=0, len = this.ajaxCreatedListeners.length; i < len; i++) {
      var callback = this.ajaxCreatedListeners[i];
      callback(ajaxUpload, file);
    }
  },

  /**
   * @param  {*}              data
   * @param  {!string}        textStatus
   * @param  {!jQuery.jqXHR}  jqXHR
   * @private
   */
  onDone_(data, textStatus, jqXHR) {
    this.onAlways_(jqXHR);
  },

  /**
   * @param {!jQuery.jqXHR} jqXHR 
   * @param {!string}       textStatus
   * @param {*}             errorThrown
   */
  onFail_(jqXHR, textStatus, errorThrown) {
    this.onAlways_(jqXHR);
  },

  /**
   * @param {!jQuery.jqXHR} jqXHR 
   */
  onAlways_(jqXHR) {
    this.upload_();
    for (var i = 0, len = this.uploads.length; i < len; i++) {
      if (this.uploads[i].jqxhr === jqXHR) {
        this.uploads.splice(i, 1);
      }
    }
  }
});
