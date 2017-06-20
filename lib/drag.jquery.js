(function ($) {
  /**
   * @param {!Function=} callback
   * @param {!Object=} options
   */
  $.fn.dragjs = function (callback, options) {
    return this.each(function () {
      var dropzone = new dragjs.drop.DropZone(this, options);
      if ($.isFunction(callback)) {
        dropzone.drop(callback);
      }
    });
  };
})(jQuery);