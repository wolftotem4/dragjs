# drag.js

**This project is still under development.**

## Introduction

A jQuery plugin for File Drag-and-Drop.

**WARNING!** The project is still under development.

## Features

* A pure library.
* Lightweight (~6.19 KiB)

**You need to deal with AJAX and the rest.**

## Basic Usage

```html
<script src="dragjs.jquery.min.js">
<script>
(function($) {
  $("#droparea").dragjs(function(e, files) {

    /* 'files[]' is the HTTP POST field name you like. */
    var formData = dragjs.toFormData(files, 'files[]');

    /* Or you like to deal the job by yourself. */
    // var formData = new FormData();
    // for (var i = 0; i < files.length; i++) {
    //   var file = files[i];
    //   var relativePath = file.xRelativePath || file.webkitRelativePath || file.name;
    //   formData.append('files[]', file, relativePath);
    // }

    // Some HTTP POST data.
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
    formData.append('field1', 'Hello World!');
    formData.append('action', 'upload');

    $.ajax({
      type: 'post',
      url: 'upload.php',
      data: formData
    });
  });
}) (jQuery);
</script>
```

## CSS classes for dragover

### Usage
```html
<style>
#droparea {
  /* default style */
  background: #dedede;
}

#droparea.is-dragover {
  /* dragover triggered! */
  background: #ccc;
}
</style>

<div id="droparea" style="width: 300px; height: 300px;">
  /* Drag files to here. */
</div>
```

### Customize class name

```js
$('#droparea').dragjs(callback, {
  "class": {
    dragover: "my-dragover-class"
  }
});
```

## &lt;input type="file"&gt; ?

```js
function upload(files) {
  $.ajax({
    type: 'pot',
    url: 'upload.php',
    data: dragjs.toFormData(files, 'files[]')
  })
}

// for users who uses <input type="file"> for update.
$('#file_input').change(function(e) {
  // or $('#form').submit. you know what that means.

  upload(this.files);
});

// for users who uses drag-and-drop file upload.
$('#droparea').dragjs(upload);
```

## Browser Support

* Internet Explorer 10+
* Google Chrome
* Mozilla Firefox

## Internet Explorer 9 and older

Since Internet Explorer 9 and older don't support file drag-and-drop functions, you need to find other library with Flash, Java or others plugin.

This library is fully focus on JavaScript support.
