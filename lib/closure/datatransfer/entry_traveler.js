goog.provide('dragjs.datatransfer.EntryTraveler');

goog.require('dragjs.datatransfer.DirEntryReader');
goog.require('dragjs.datatransfer.FileEntryReader');

/**
 * @param  {!Array.<!Entry>}  entries
 * @param  {!string=}         path
 * @return {!Promise.<!Array.<!File>>}
 */
dragjs.datatransfer.EntryTraveler = (entries, path = "") => {

  /** @type {!Array.<!Promise.<!Array.<!File>>>} */
  var fileDfdArr = [];

  for (var i = 0, len = entries.length; i < len; i++) {
    /** @type {!Entry} */
    var entry = entries[i];

    var dfd = (entry.isFile) ?
              dragjs.datatransfer.EntryTraveler.entryFile_(entry, path)
            : dragjs.datatransfer.EntryTraveler.entryDir_(entry, path);

    fileDfdArr.push(dfd);
  }

  return Promise.all(fileDfdArr).then((array) => {
    return Array.prototype.concat.apply([], array);
  });
};

/**
 * @param  {!Entry}   fileEntry
 * @param  {!string}  path
 * @return {!Promise.<!Array.<!File>>}
 * @private
 */
dragjs.datatransfer.EntryTraveler.entryFile_ = (fileEntry, path) => {
  /** @type {!Promise.<!File>} */
  var reader = dragjs.datatransfer.FileEntryReader(fileEntry);

  /** @type {!Promise.<!Array.<!File>>} */
  var dfd = reader.then((file) => {
    file['xRelativePath'] = path + file.name;
    return file;
  });

  return dfd;
};

/**
 * @param  {!Entry}   dirEntry
 * @param  {!string}  path
 * @return {!Promise.<!Array.<!File>>}
 * @private
 */
dragjs.datatransfer.EntryTraveler.entryDir_ = (dirEntry, path) => {
  /** @type {!Promise.<!Array.<!Entry>>} */
  var reader = dragjs.datatransfer.DirEntryReader(dirEntry);

  /** @type {!Promise.<!Array.<!File>>} */
  var dfd = reader.then((entries) => {
    return dragjs.datatransfer.EntryTraveler(entries, path + dirEntry.name + "/");
  });

  return dfd;
};

/**
 * @param  {!DataTransferItemList}  items
 * @return {!Promise.<!Array.<!File>>}
 */
dragjs.datatransfer.EntryTraveler.fromItemList = (items) => {

  /** @type {!Array.<!Entry>} entries */
  var entries = [];

  for (var i = 0, len = items.length; i < len; i++) {
    /** @type {!DataTransferItem} */
    var item = items[i];

    /** @type {?Entry} */
    var entry = item.webkitGetAsEntry();

    if (entry) {
      entries.push(entry);
    }
  }

  return dragjs.datatransfer.EntryTraveler(entries);
};