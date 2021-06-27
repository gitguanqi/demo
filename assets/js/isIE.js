function checkIe () {
  var browserName = '';
  if (navigator.userAgent.indexOf('Chrome') != -1) {
    browserName = 'Chrome';
  } else if (navigator.userAgent.indexOf('Trident') != -1 || navigator.appVersion.indexOf('MSIE') != -1) {
    browserName = 'IE';
  } else if (navigator.userAgent.indexOf('Firefox') != -1) {
    browserName = 'Firefox';
  } else if (navigator.userAgent.indexOf('Opera') != -1) {
    browserName = 'Opera';
  } else if (navigator.userAgent.indexOf('Safari') != -1) {
    browserName = 'Safari';
  }
  return browserName;
}

function getIeVersion() {
  var ie = navigator.userAgent.indexOf('Trident') == -1 ? false : true;
  var version = navigator.appVersion;
  var versionName = '';
  if (ie && version) {
      if (version.indexOf('rv:11.0') != -1) {
          return versionName = 'ie11'
      } else if (version.indexOf('MSIE 10.0') != -1) {
          return versionName = 'ie10'
      } else if (version.indexOf('MSIE 9.0') != -1) {
          return versionName = 'ie9'
      } else if (version.indexOf('MSIE 8.0') != -1) {
          return versionName = 'ie8'
      } else if (version.indexOf('MSIE 7.0') != -1) {
          return versionName = 'ie7'
      }
  }
  return -1;
}

var isIe = checkIe();
var ieVersion = getIeVersion();

if (isIe == 'IE' && ieVersion !== 'ie11') {
  location.href = 'link/browser/';
}