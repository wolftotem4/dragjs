goog.provide('dragjs.ajax.Upload');

dragjs.ajax.Upload = goog.defineClass(null, {

  /**
   * @param {!string} url
   * @param {!Object=} options
   */
  constructor(url, options = {}) {

    /** @type {number} */
    this.loaded = 0;

    /** @type {number} */
    this.total  = 0;

    /**
     * @type {!Array.<!Function>}
     */
    this.listeners = [];

    /**
     * @type {!XMLHttpRequest}
     */
    this.xhr = $.ajaxSettings.xhr();

    this.xhr.upload.addEventListener('progress', (e) => {
      this.loaded = e.loaded;
      this.total  = e.total;
      this.triggerProgress(e);
    });

    /**
     * @type {!jQuery.jqXHR}
     */
    this.jqxhr = $.ajax(Object.assign({
      type: 'post',
      url: url,
      processData: false,
      contentType: false,
      xhr: () => this.xhr,
      dataType: 'json'
    }, options));
  },

  /**
   * @param {!Event} e
   */
  triggerProgress(e)  {
    for (var i = 0, len = this.listeners.length; i < len; i++) {
      var listener = this.listeners[i];
      listener(e, this);
    }
  },

  /**
   * @param {!Function} callback
   */
  addProgressEventListener(callback) {
    this.listeners.push(callback);
  }
});