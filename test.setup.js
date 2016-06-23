const jsdom = require('jsdom');

function createBrowser() {
  global.document = jsdom.jsdom('<html><body><div id="app"></div></body></html>');
  global.window = document.defaultView;
  global.navigator = window.navigator = {};
  global.DEBUG = false;
  global.navigator.userAgent = 'NodeJs JsDom';
  global.navigator.appVersion = '';
}

createBrowser();

global.createBrowser =  createBrowser;
