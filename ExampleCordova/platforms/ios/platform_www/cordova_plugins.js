cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-customfcmreceiver.CustomFCMReceiverPlugin",
      "file": "plugins/cordova-plugin-customfcmreceiver/www/customfcmreceiver.js",
      "pluginId": "cordova-plugin-customfcmreceiver",
      "clobbers": [
        "cordova.plugin.customfcmreceiver"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-reteno-firebase.FirebasePlugin",
      "file": "plugins/cordova-plugin-reteno-firebase/www/firebase.js",
      "pluginId": "cordova-plugin-reteno-firebase",
      "clobbers": [
        "FirebasePlugin"
      ]
    },
    {
      "id": "cordova-plugin-reteno.cordova-plugin-reteno",
      "file": "plugins/cordova-plugin-reteno/www/cordova-plugin-reteno.js",
      "pluginId": "cordova-plugin-reteno",
      "clobbers": [
        "RetenoPlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-customfcmreceiver": "1.0.0",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-reteno-firebase": "16.1.0",
    "cordova-plugin-add-swift-support": "2.0.2",
    "cordova-plugin-reteno": "0.0.1"
  };
});