import { Component } from '@angular/core';
import { AwesomeCordovaPluginReteno } from '../../../../../awesome-cordova-plugin-reteno/dist/ngx';
import {
  AwesomeCordovaPluginFirebase,
  IChannelOptions,
} from '../../../../../awesome-cordova-plugin-reteno-firebase/dist/ngx';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  #output: any;

  prependLogMessage(message: any) {
    this.#output.innerHTML =
      this.#output.innerHTML +
      '<span class="' +
      (message.logLevel ? message.logLevel : '') +
      '">' +
      message.msg +
      '</span>' +
      (message.nobreak ? '<br/>' : '<br/><br/>');
  }

  log(msg: string, opts: any) {
    if (typeof opts === 'undefined') {
      opts = {};
    } else if (typeof opts === 'boolean') {
      opts = { showAlert: opts };
    }
    let loglevel: string = opts.logLevel || ('log' as string);
    console.log(loglevel + ': ' + msg);

    opts.msg = msg;
    this.prependLogMessage(opts);
    if (opts.showAlert) {
      this.alertUser(opts.logLevel, msg);
    }
  }

  logError(msg: string, error: any, showAlert: boolean) {
    if (typeof error === 'boolean') {
      showAlert = error;
    } else if (typeof error === 'object') {
      msg += ': ' + JSON.stringify(error);
    } else if (typeof error === 'string') {
      msg += ': ' + error;
    }
    this.log(msg, {
      logLevel: 'error',
      showAlert: showAlert,
    });
  }

  clearLog() {
    this.#output.empty();
  }

  async alertUser(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async promptUserForYesNoChoice(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['Yes', 'No'],
    });

    await alert.present();
  }
  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private retenoPlugin: AwesomeCordovaPluginReteno,
    private firebasePlugin: AwesomeCordovaPluginFirebase
  ) {
    platform.ready().then(() => {
      // this.retenoPlugin.setApiKey('your_access_key_here').then((response) => {
      //   console.log('set api key' + response);
      // });

      this.#output = document.getElementById('log-output');
      console.log(this.#output.toString());

      this.firebasePlugin
        .onMessageReceived()
        .subscribe(this.onMessageReceived.bind(this));
      this.firebasePlugin
        .onTokenRefresh()
        .subscribe(this.onTokenRefresh.bind(this));
      this.firebasePlugin.registerAuthStateChangeListener(
        this.registerAuthStateChangeListener.bind(this)
      );

      this.checkNotificationPermission(false); // Check permission then get token

      this.checkAutoInit(false);

      // Platform-specific
      if (this.platform.is('android')) {
        this.initAndroid();
      } else if (this.platform.is('ios')) {
        this.initIos();
      }
    });
  }

  initAndroid() {
    // Define custom  channel - all keys are except 'id' are optional.
    var customChannel: IChannelOptions = {
      // channel ID - must be unique per app package
      id: 'my_channel_id',

      // Channel name. Default: empty string
      name: 'My channel name',

      //The sound to play once a push comes. Default value: 'default'
      //Values allowed:
      //'default' - plays the default notification sound
      //'ringtone' - plays the currently set ringtone
      //filename - the filename of the sound file located in '/res/raw' without file extension (mysound.mp3 -> mysound)
      sound: 'blackberry',

      //Vibrate on new notification. Default value: true
      //Possible values:
      //Boolean - vibrate or not
      //Array - vibration pattern - e.g. [500, 200, 500] - milliseconds vibrate, milliseconds pause, vibrate, pause, etc.
      vibration: [300, 200, 300],

      // Whether to blink the LED
      light: true,

      //LED color in ARGB format - this example BLUE color. If set to -1, light color will be default. Default value: -1.
      lightColor: '0xFF0000FF',

      //Importance - integer from 0 to 4. Default value: 3
      //0 - none - no sound, does not show in the shade
      //1 - min - no sound, only shows in the shade, below the fold
      //2 - low - no sound, shows in the shade, and potentially in the status bar
      //3 - default - shows everywhere, makes noise, but does not visually intrude
      //4 - high - shows everywhere, makes noise and peeks
      importance: 4,

      //Show badge over app icon when non handled pushes are present. Default value: true
      badge: true,

      //Show message on locked screen. Default value: 1
      //Possible values (default 1):
      //-1 - secret - Do not reveal any part of the notification on a secure lockscreen.
      //0 - private - Show the notification on all lockscreens, but conceal sensitive or private information on secure lockscreens.
      //1 - public - Show the notification in its entirety on all lockscreens.
      visibility: 1,
    };

    this.firebasePlugin.createChannel(customChannel).then(
      () => {
        this.log('Created custom channel: ' + customChannel.id, undefined);
        this.firebasePlugin.listChannels().then(
          (channels) => {
            if (typeof channels == 'undefined') return;
            for (var i = 0; i < channels.length; i++) {
              this.log(
                'Channel id=' + channels[i].id + '; name=' + channels[i].name,
                undefined
              );
            }
          },
          (error: string) => {
            this.logError('List channels error: ' + error, error, false);
          }
        );
      },
      (error: any) => {
        this.logError('Create channel error', error, false);
      }
    );
  }
  initIos() {
    this.firebasePlugin.onApnsTokenReceived().subscribe(
      (token: string) => {
        this.log('APNS token received: ' + token, undefined);
      },
      (error: any) => {
        this.logError('Failed to receive APNS token', error, false);
      }
    );
  }
  registerReceiver(message: string) {
    this.log(message, undefined);
  }

  registerAuthStateChangeListener(userSignedIn: boolean) {
    this.log(
      'Auth state changed: User signed ' + (userSignedIn ? 'in' : 'out'),
      undefined
    );
  }

  onMessageReceived(message: any) {
    try {
      console.log('onMessageReceived');
      console.dir(message);
      if (message.messageType === 'notification') {
        this.handleNotificationMessage(message);
      } else {
        this.handleDataMessage(message);
      }
    } catch (e: any) {
      this.logError(
        'Exception in onMessageReceived callback: ' + e.message,
        undefined,
        false
      );
    }
  }

  handleNotificationMessage(message: any) {
    var title;
    if (message.title) {
      title = message.title;
    } else if (message.notification && message.notification.title) {
      title = message.notification.title;
    } else if (message.aps && message.aps.alert && message.aps.alert.title) {
      title = message.aps.alert.title;
    }

    var body;
    if (message.body) {
      body = message.body;
    } else if (message.notification && message.notification.body) {
      body = message.notification.body;
    } else if (message.aps && message.aps.alert && message.aps.alert.body) {
      body = message.aps.alert.body;
    }

    var msg = 'Notification message received';
    if (message.tap) {
      msg += ' (tapped in ' + message.tap + ')';
    }
    if (title) {
      msg += '; title=' + title;
    }
    if (body) {
      msg += '; body=' + body;
    }
    msg += ': ' + JSON.stringify(message);
    this.log(msg, true);
  }

  handleDataMessage(message: any) {
    this.log('Data message received: ' + JSON.stringify(message), undefined);
  }

  onTokenRefresh(token: string) {
    this.log('Token refreshed: ' + token, undefined);
  }

  clearNotifications() {
    this.firebasePlugin.clearAllNotifications().then(
      () => {
        this.log('Cleared all notifications', true);
      },
      (error: any) => {
        this.logError('Failed to clear notifications', error, true);
      }
    );
  }

  getID() {
    this.firebasePlugin.getId().then(
      (id) => {
        this.log('Got FCM ID: ' + id, true);
      },
      (error: any) => {
        this.logError('Failed to get FCM ID', error, true);
      }
    );
  }

  getToken() {
    this.firebasePlugin.getToken().then(
      (token) => {
        this.log('Got FCM token: ' + token, true);
      },
      (error: any) => {
        this.logError('Failed to get FCM token', error, true);
      }
    );
  }

  getAPNSToken() {
    this.firebasePlugin.getAPNSToken().then(
      (token) => {
        this.log('Got APNS token: ' + token, true);
      },
      (error: any) => {
        this.logError('Failed to get APNS token', error, true);
      }
    );
  }

  getBadgeNumber() {
    this.firebasePlugin.getBadgeNumber().then(
      (current: number) => {
        this.log('Current badge number: ' + current, true);
      },
      (error: any) => {
        this.logError('Failed to get badge number', error, true);
      }
    );
  }

  incrementBadgeNumber() {
    this.firebasePlugin.getBadgeNumber().then(
      (current: number) => {
        var newValue = current + 1;
        this.firebasePlugin.setBadgeNumber(newValue).then(
          () => {
            this.log('Set badge number to: ' + newValue, true);
          },
          (error: any) => {
            this.logError('Failed to set badge number', error, true);
          }
        );
      },
      (error: any) => {
        this.logError('Failed to get badge number', error, true);
      }
    );
  }

  clearBadgeNumber() {
    this.firebasePlugin.setBadgeNumber(0).then(
      () => {
        this.log('Cleared badge number', true);
      },
      (error: any) => {
        this.logError('Failed to clear badge number', error, true);
      }
    );
  }

  subscribe() {
    this.firebasePlugin.subscribe('my_topic').then(
      () => {
        this.log('Subscribed to topic', true);
      },
      (error: any) => {
        this.logError('Failed to subscribe to topic', error, true);
      }
    );
  }

  unsubscribe() {
    this.firebasePlugin.unsubscribe('my_topic').then(
      () => {
        this.log('Unsubscribed from topic', true);
      },
      (error: any) => {
        this.logError('Failed to unsubscribe from topic', error, true);
      }
    );
  }

  unregister() {
    this.firebasePlugin.unregister().then(
      () => {
        this.log('Unregistered from Firebase', true);
      },
      (error: any) => {
        this.logError('Failed to unregister from Firebase', error, true);
      }
    );
  }

  enableAutoInit() {
    this.firebasePlugin.setAutoInitEnabled(true).then(
      () => {
        this.log('Enabled auto init', true);
        this.checkAutoInit(false);
      },
      (error: any) => {
        this.logError('Failed to enable auto init', error, true);
      }
    );
  }

  disableAutoInit() {
    this.firebasePlugin.setAutoInitEnabled(false).then(
      () => {
        this.log('Disabled auto init', true);
        this.checkAutoInit(false);
      },
      (error: any) => {
        this.logError('Failed to disable auto init', error, true);
      }
    );
  }

  private checkNotificationPermission(requested: boolean) {
    this.firebasePlugin.hasPermission().then((hasPermission: boolean) => {
      if (hasPermission) {
        this.log('Remote notifications permission granted', undefined);
        // Granted
        this.getToken();
      } else if (!requested) {
        // Request permission
        this.log('Requesting remote notifications permission', undefined);
        this.firebasePlugin
          .grantPermission()
          .then(this.checkNotificationPermission.bind(this, true));
      } else {
        // Denied
        this.logError(
          "Notifications won't be shown as permission is denied",
          undefined,
          false
        );
      }
    });
  }

  private checkAutoInit(showUser: boolean) {
    this.firebasePlugin.isAutoInitEnabled().then(
      (enabled: boolean) => {
        this.log(
          'Auto init is ' + (enabled ? 'enabled' : 'disabled'),
          showUser
        );
      },
      (error: any) => {
        this.logError('Failed to check auto init', error, true);
      }
    );
  }
}
