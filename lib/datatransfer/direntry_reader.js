goog.provide('dragjs.datatransfer.DirEntryReader');

/**
 * @param  {!Entry}  dirEntry
 * @return {!Promise.<!Array.<!Entry>>}
 */
dragjs.datatransfer.DirEntryReader = (dirEntry) => {
  var resolvePromise;

  /** @type {!Promise.<!Array.<!Entry>>} */
  var dfd = new Promise((resolve, rejct) => {
    resolvePromise = resolve;
  });

  /** @type {!DirectoryReader} */
  var dirReader = dirEntry.createReader();

  dirReader.readEntries((/** @type {!Array.<!Entry>} */ entries) => {
    resolvePromise(entries);
  });

  return dfd;
};
