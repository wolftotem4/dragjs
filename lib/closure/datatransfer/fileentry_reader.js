goog.provide('dragjs.datatransfer.FileEntryReader');

/**
 * @param  {!Entry}  fileEntry
 * @return {!Promise.<!File>}
 */
dragjs.datatransfer.FileEntryReader = (fileEntry) => {
  var resolvePromise, rejectPromise;

  /** @type {!Promise.<!File>} */
  var dfd = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  fileEntry.file(resolvePromise, rejectPromise);

  return dfd;
};