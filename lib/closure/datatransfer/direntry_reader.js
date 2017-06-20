goog.provide('dragjs.datatransfer.DirEntryReader');

/**
 * @param  {!Entry}  dirEntry
 * @return {!Promise.<!Array.<!Entry>>}
 */
dragjs.datatransfer.DirEntryReader = (dirEntry) => {
  /** @type {!DirectoryReader} */
  var dirReader = dirEntry.createReader();

  return dragjs.datatransfer.DirEntryReader.read(dirReader);
};

/**
 * @param  {!DirectoryReader}  reader
 * @return {!Promise.<!Array.<!Entry>>}
 */
dragjs.datatransfer.DirEntryReader.read = (reader) => {
  var resolvePromise, rejectPromise;

  /** @type {!Promise.<!Array.<!Entry>>} */
  var dfd = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  reader.readEntries(function (entries) {

    if (entries.length) {
      dragjs.datatransfer.DirEntryReader.read(reader).then((sub) => {
        resolvePromise(entries.concat(sub));
      }, rejectPromise);
    } else {
      resolvePromise([]);
    }
    
  }, rejectPromise);

  return dfd;
};
