(function() {
  'use strict';

  var currentScript = document.currentScript ||
                      document.scripts[document.scripts.length - 1];
  var loaderSrc = currentScript.src;
  var baseUrl = loaderSrc.split('/').slice(0, -1).join('/') + '/';

  function loadRelativeScript(src) {
    importScript(baseUrl + src);
  }

  function importScript(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.defer = true;
    // Setting async = false is important to make sure the script is imported
    // before the 'load' event fires.
    script.async = false;
    document.head.appendChild(script);
  }

  loadRelativeScript('node_modules/google-closure-library/closure/goog/base.js');
  loadRelativeScript('uncompiled.js');
})();