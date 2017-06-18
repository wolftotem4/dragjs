goog.provide('dragjs.upload.Uploader');

goog.require('dragjs.ajax.Upload');

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

    goog.exportProperty(this, 'files', this.files);
    goog.exportProperty(this, 'url', this.url);
  },

  /**
   * @export
   */
  run() {

    for (var i = 0, len = this.files.length; i < len; i++) {

      /** @type {!File} */
      var file = this.files[i];

      /** @type {!string} */
      var filename = file['xRelativePath'] || file.webkitRelativePath || file.name;

      /** @type {!FormData} */
      var formdata = new FormData();

      formdata.append('file[]', file, filename);

      /** @type {!dragjs.ajax.Upload} */
      var ajaxUpload = new dragjs.ajax.Upload(this.url, {
        data : formdata
      });

      ajaxUpload.addProgressEventListener((e) => {
        console.dir(e);
      });

      ajaxUpload.jqxhr.done((response) => {
        // console.dir(response);
      });
    }
  }
});
