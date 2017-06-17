goog.provide('dragjs.datatransfer.FileEntryReader');

/**
 * @param  {!Entry}  fileEntry
 * @return {!Promise.<!File>}
 */
dragjs.datatransfer.FileEntryReader = (fileEntry) => {
  var resolvePromise;

  /** @type {!Promise.<!File>} */
  var dfd = new Promise((resolve, reject) => {
    resolvePromise = resolve;
  });

  fileEntry.file((/** @type {!File} */ file) => {
    resolvePromise(file);
  });

  return dfd;
};