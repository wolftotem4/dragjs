(function ($) {
  /**
   * @param {!Object=} options
   */
  $.fn.dragjs = function (options) {
    return this.each(function () {
      new dragjs.drop.DropZone(this, options);
    });
  };
})(jQuery);