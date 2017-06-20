goog.provide('dragjs');

/**
 * @param  {!File}  file
 * @return {!string}
 * @export
 */
dragjs.relativePath = (file) => {
  return file['xRelativePath'] || file.webkitRelativePath || file.name;
};

/**
 * @param  {!FileList|!Array.<!File>|!File}  files
 * @param  {!string=}  fieldName
 * @return {!FormData}
 * @export
 */
dragjs.toFormData = (files, fieldName = 'files[]') => {
  /**
   * @type {!FormData}
   */
  var formData = new FormData();

  if (files instanceof File) {
    formData.append(fieldName, files, dragjs.relativePath(file));
  } else {
    for (var i = 0, len = files.length; i < len; i++) {
      /** @type {!File} */
      var file = files[i];
      formData.append(fieldName, file, dragjs.relativePath(file));
    }
  }

  return formData;
};

/**
 * @return {boolean}
 * @export
 */
dragjs.basicBrowserSupport = () => {
  return typeof FileList !== 'undefined';
};
