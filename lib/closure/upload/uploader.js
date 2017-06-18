goog.provide('dragjs.upload.Uploader');

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

  run() {

    for (var i = 0, len = this.files.length; i < len; i++) {

      /** @type {!File} */
      var file = this.files[i];

      /** @type {!string} */
      var filename = file['xRelativePath'] || file.webkitRelativePath || file.name;

      /** @type {!FormData} */
      var formdata = new FormData();

      formdata.append('file[]', file, filename);

      console.dir(formdata);

      // $.ajax({
      //   type: 'post',
      //   url: this.url,
      //   processData: false,
      //   contentType: false,
      // });
    }
  }
});
