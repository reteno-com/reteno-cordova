"use strict";
(self.webpackChunkapp = self.webpackChunkapp || []).push([
  [2476],
  {
    2476: (E, d, a) => {
      a.r(d), a.d(d, { HomePageModule: () => M });
      var b = a(6814),
        l = a(5548),
        m = a(95),
        g = a(4482),
        h = a(5861);
      function f(n, r, s) {
        if (!r.has(n))
          throw new TypeError(
            "attempted to " + s + " private field on non-instance"
          );
        return r.get(n);
      }
      function c(n, r) {
        return (function k(n, r) {
          return r.get ? r.get.call(n) : r.value;
        })(n, f(n, r, "get"));
      }
      var t = a(6689),
        y = a(2021),
        T = a(9678);
      const Z = function () {
          return ["/userattributes"];
        },
        v = function () {
          return ["/customevents"];
        },
        N = function () {
          return ["/anonymoususerattributes"];
        },
        C = [
          {
            path: "",
            component: (() => {
              var n = new WeakMap();
              class r {
                prependLogMessage(e) {
                  c(this, n).innerHTML =
                    c(this, n).innerHTML +
                    '<span class="' +
                    (e.logLevel ? e.logLevel : "") +
                    '">' +
                    e.msg +
                    "</span>" +
                    (e.nobreak ? "<br/>" : "<br/><br/>");
                }
                log(e, i) {
                  typeof i > "u"
                    ? (i = {})
                    : "boolean" == typeof i && (i = { showAlert: i }),
                    console.log((i.logLevel || "log") + ": " + e),
                    (i.msg = e),
                    this.prependLogMessage(i),
                    i.showAlert && this.alertUser(i.logLevel, e);
                }
                logError(e, i, o) {
                  "boolean" == typeof i
                    ? (o = i)
                    : "object" == typeof i
                    ? (e += ": " + JSON.stringify(i))
                    : "string" == typeof i && (e += ": " + i),
                    this.log(e, { logLevel: "error", showAlert: o });
                }
                clearLog() {
                  c(this, n).empty();
                }
                alertUser(e, i) {
                  var o = this;
                  return (0, h.Z)(function* () {
                    yield (yield o.alertController.create({
                      header: e,
                      message: i,
                      buttons: ["OK"],
                    })).present();
                  })();
                }
                promptUserForYesNoChoice(e, i) {
                  var o = this;
                  return (0, h.Z)(function* () {
                    yield (yield o.alertController.create({
                      header: e,
                      message: i,
                      buttons: ["Yes", "No"],
                    })).present();
                  })();
                }
                constructor(e, i, o, u) {
                  (function _(n, r, s) {
                    (function p(n, r) {
                      if (r.has(n))
                        throw new TypeError(
                          "Cannot initialize the same private elements twice on an object"
                        );
                    })(n, r),
                      r.set(n, s);
                  })(this, n, { writable: !0, value: void 0 }),
                    (this.platform = e),
                    (this.alertController = i),
                    (this.retenoPlugin = o),
                    (this.firebasePlugin = u),
                    e.ready().then(() => {
                      this.retenoPlugin
                        .setApiKey("your_access_key_here")
                        .then((U) => {
                          console.log("set api key" + U);
                        }),
                        (function A(n, r, s) {
                          return (
                            (function P(n, r, s) {
                              if (r.set) r.set.call(n, s);
                              else {
                                if (!r.writable)
                                  throw new TypeError(
                                    "attempted to set read only private field"
                                  );
                                r.value = s;
                              }
                            })(n, f(n, r, "set"), s),
                            s
                          );
                        })(this, n, document.getElementById("log-output")),
                        console.log(c(this, n).toString()),
                        this.firebasePlugin
                          .onMessageReceived()
                          .subscribe(this.onMessageReceived.bind(this)),
                        this.firebasePlugin
                          .onTokenRefresh()
                          .subscribe(this.onTokenRefresh.bind(this)),
                        this.firebasePlugin.registerAuthStateChangeListener(
                          this.registerAuthStateChangeListener.bind(this)
                        ),
                        this.checkNotificationPermission(!1),
                        this.checkAutoInit(!1),
                        this.platform.is("android")
                          ? this.initAndroid()
                          : this.platform.is("ios") && this.initIos();
                    });
                }
                setApiKey() {
                  this.retenoPlugin
                    .setApiKey("your_access_key_here")
                    .then((e) => {
                      console.log("set api key" + e);
                    });
                }
                initAndroid() {
                  var e = {
                    id: "my_channel_id",
                    name: "My channel name",
                    sound: "blackberry",
                    vibration: [300, 200, 300],
                    light: !0,
                    lightColor: "0xFF0000FF",
                    importance: 4,
                    badge: !0,
                    visibility: 1,
                  };
                  this.firebasePlugin.createChannel(e).then(
                    () => {
                      this.log("Created custom channel: " + e.id, void 0),
                        this.firebasePlugin.listChannels().then(
                          (i) => {
                            if (!(typeof i > "u"))
                              for (var o = 0; o < i.length; o++)
                                this.log(
                                  "Channel id=" +
                                    i[o].id +
                                    "; name=" +
                                    i[o].name,
                                  void 0
                                );
                          },
                          (i) => {
                            this.logError("List channels error: " + i, i, !1);
                          }
                        );
                    },
                    (i) => {
                      this.logError("Create channel error", i, !1);
                    }
                  );
                }
                initIos() {
                  this.firebasePlugin.onApnsTokenReceived().subscribe(
                    (e) => {
                      this.log("APNS token received: " + e, void 0);
                    },
                    (e) => {
                      this.logError("Failed to receive APNS token", e, !1);
                    }
                  );
                }
                registerReceiver(e) {
                  this.log(e, void 0);
                }
                registerAuthStateChangeListener(e) {
                  this.log(
                    "Auth state changed: User signed " + (e ? "in" : "out"),
                    void 0
                  );
                }
                onMessageReceived(e) {
                  try {
                    console.log("onMessageReceived"),
                      console.dir(e),
                      "notification" === e.messageType
                        ? this.handleNotificationMessage(e)
                        : this.handleDataMessage(e);
                  } catch (i) {
                    this.logError(
                      "Exception in onMessageReceived callback: " + i.message,
                      void 0,
                      !1
                    );
                  }
                }
                handleNotificationMessage(e) {
                  var i, o;
                  e.title
                    ? (i = e.title)
                    : e.notification && e.notification.title
                    ? (i = e.notification.title)
                    : e.aps &&
                      e.aps.alert &&
                      e.aps.alert.title &&
                      (i = e.aps.alert.title),
                    e.body
                      ? (o = e.body)
                      : e.notification && e.notification.body
                      ? (o = e.notification.body)
                      : e.aps &&
                        e.aps.alert &&
                        e.aps.alert.body &&
                        (o = e.aps.alert.body);
                  var u = "Notification message received";
                  e.tap && (u += " (tapped in " + e.tap + ")"),
                    i && (u += "; title=" + i),
                    o && (u += "; body=" + o),
                    (u += ": " + JSON.stringify(e)),
                    this.log(u, !0);
                }
                handleDataMessage(e) {
                  this.log(
                    "Data message received: " + JSON.stringify(e),
                    void 0
                  );
                }
                onTokenRefresh(e) {
                  this.log("Token refreshed: " + e, void 0);
                }
                clearNotifications() {
                  this.firebasePlugin.clearAllNotifications().then(
                    () => {
                      this.log("Cleared all notifications", !0);
                    },
                    (e) => {
                      this.logError("Failed to clear notifications", e, !0);
                    }
                  );
                }
                getID() {
                  this.firebasePlugin.getId().then(
                    (e) => {
                      this.log("Got FCM ID: " + e, !0);
                    },
                    (e) => {
                      this.logError("Failed to get FCM ID", e, !0);
                    }
                  );
                }
                getToken() {
                  this.firebasePlugin.getToken().then(
                    (e) => {
                      this.log("Got FCM token: " + e, !0);
                    },
                    (e) => {
                      this.logError("Failed to get FCM token", e, !0);
                    }
                  );
                }
                getAPNSToken() {
                  this.firebasePlugin.getAPNSToken().then(
                    (e) => {
                      this.log("Got APNS token: " + e, !0);
                    },
                    (e) => {
                      this.logError("Failed to get APNS token", e, !0);
                    }
                  );
                }
                getBadgeNumber() {
                  this.firebasePlugin.getBadgeNumber().then(
                    (e) => {
                      this.log("Current badge number: " + e, !0);
                    },
                    (e) => {
                      this.logError("Failed to get badge number", e, !0);
                    }
                  );
                }
                incrementBadgeNumber() {
                  this.firebasePlugin.getBadgeNumber().then(
                    (e) => {
                      var i = e + 1;
                      this.firebasePlugin.setBadgeNumber(i).then(
                        () => {
                          this.log("Set badge number to: " + i, !0);
                        },
                        (o) => {
                          this.logError("Failed to set badge number", o, !0);
                        }
                      );
                    },
                    (e) => {
                      this.logError("Failed to get badge number", e, !0);
                    }
                  );
                }
                clearBadgeNumber() {
                  this.firebasePlugin.setBadgeNumber(0).then(
                    () => {
                      this.log("Cleared badge number", !0);
                    },
                    (e) => {
                      this.logError("Failed to clear badge number", e, !0);
                    }
                  );
                }
                subscribe() {
                  this.firebasePlugin.subscribe("my_topic").then(
                    () => {
                      this.log("Subscribed to topic", !0);
                    },
                    (e) => {
                      this.logError("Failed to subscribe to topic", e, !0);
                    }
                  );
                }
                unsubscribe() {
                  this.firebasePlugin.unsubscribe("my_topic").then(
                    () => {
                      this.log("Unsubscribed from topic", !0);
                    },
                    (e) => {
                      this.logError("Failed to unsubscribe from topic", e, !0);
                    }
                  );
                }
                unregister() {
                  this.firebasePlugin.unregister().then(
                    () => {
                      this.log("Unregistered from Firebase", !0);
                    },
                    (e) => {
                      this.logError(
                        "Failed to unregister from Firebase",
                        e,
                        !0
                      );
                    }
                  );
                }
                enableAutoInit() {
                  this.firebasePlugin.setAutoInitEnabled(!0).then(
                    () => {
                      this.log("Enabled auto init", !0), this.checkAutoInit(!1);
                    },
                    (e) => {
                      this.logError("Failed to enable auto init", e, !0);
                    }
                  );
                }
                disableAutoInit() {
                  this.firebasePlugin.setAutoInitEnabled(!1).then(
                    () => {
                      this.log("Disabled auto init", !0),
                        this.checkAutoInit(!1);
                    },
                    (e) => {
                      this.logError("Failed to disable auto init", e, !0);
                    }
                  );
                }
                checkNotificationPermission(e) {
                  this.firebasePlugin.hasPermission().then((i) => {
                    i
                      ? (this.log(
                          "Remote notifications permission granted",
                          void 0
                        ),
                        this.getToken())
                      : e
                      ? this.logError(
                          "Notifications won't be shown as permission is denied",
                          void 0,
                          !1
                        )
                      : (this.log(
                          "Requesting remote notifications permission",
                          void 0
                        ),
                        this.firebasePlugin
                          .grantPermission()
                          .then(
                            this.checkNotificationPermission.bind(this, !0)
                          ));
                  });
                }
                checkAutoInit(e) {
                  this.firebasePlugin.isAutoInitEnabled().then(
                    (i) => {
                      this.log(
                        "Auto init is " + (i ? "enabled" : "disabled"),
                        e
                      );
                    },
                    (i) => {
                      this.logError("Failed to check auto init", i, !0);
                    }
                  );
                }
              }
              return (
                (r.ɵfac = function (e) {
                  return new (e || r)(
                    t.Y36(l.t4),
                    t.Y36(l.Br),
                    t.Y36(y.t),
                    t.Y36(T.V)
                  );
                }),
                (r.ɵcmp = t.Xpm({
                  type: r,
                  selectors: [["app-home"]],
                  decls: 62,
                  vars: 6,
                  consts: [
                    ["color", "primary"],
                    ["size-md", "6", "offset-md", "3"],
                    [3, "routerLink"],
                    [3, "click"],
                    ["id", "ui"],
                    ["id", "device-platform"],
                    [1, "ios-only", 3, "click"],
                    ["onclick", "clearLog()"],
                    ["id", "log-output"],
                  ],
                  template: function (e, i) {
                    1 & e &&
                      (t.TgZ(0, "ion-header")(1, "ion-toolbar", 0)(
                        2,
                        "ion-title"
                      ),
                      t._uU(3, "Ionic Reteno"),
                      t.qZA()()(),
                      t.TgZ(4, "ion-content")(5, "ion-grid")(6, "ion-row")(
                        7,
                        "ion-col",
                        1
                      )(8, "ion-card")(9, "ion-card-content")(
                        10,
                        "ion-item",
                        2
                      )(11, "ion-button"),
                      t._uU(12, "Go to Attributes"),
                      t.qZA()(),
                      t.TgZ(13, "ion-item", 2)(14, "ion-button"),
                      t._uU(15, "Go to Event"),
                      t.qZA()(),
                      t.TgZ(16, "ion-item", 2)(17, "ion-button"),
                      t._uU(18, "Go to Anonymous Attributes"),
                      t.qZA()()()()()(),
                      t.TgZ(19, "ion-row")(20, "ion-col")(21, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.setApiKey();
                      }),
                      t._uU(22, "Set Api Key"),
                      t.qZA(),
                      t.TgZ(23, "h2"),
                      t._uU(24, "Firebase Test"),
                      t.qZA(),
                      t.TgZ(25, "div", 4)(26, "h3"),
                      t._uU(27, "OS"),
                      t.qZA(),
                      t.TgZ(28, "p"),
                      t._uU(29, "Platform: "),
                      t._UZ(30, "span", 5),
                      t.qZA(),
                      t.TgZ(31, "h3"),
                      t._uU(32, "Notifications"),
                      t.qZA(),
                      t.TgZ(33, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.clearNotifications();
                      }),
                      t._uU(34, "Clear notifications"),
                      t.qZA(),
                      t.TgZ(35, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.getID();
                      }),
                      t._uU(36, "Get FCM ID"),
                      t.qZA(),
                      t.TgZ(37, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.getToken();
                      }),
                      t._uU(38, "Get FCM token"),
                      t.qZA(),
                      t.TgZ(39, "ion-button", 6),
                      t.NdJ("click", function () {
                        return i.getAPNSToken();
                      }),
                      t._uU(40, "Get APNS token"),
                      t.qZA(),
                      t.TgZ(41, "ion-button", 6),
                      t.NdJ("click", function () {
                        return i.getBadgeNumber();
                      }),
                      t._uU(42, "Get badge number"),
                      t.qZA(),
                      t.TgZ(43, "ion-button", 6),
                      t.NdJ("click", function () {
                        return i.incrementBadgeNumber();
                      }),
                      t._uU(44, "Increment badge number"),
                      t.qZA(),
                      t.TgZ(45, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.clearBadgeNumber();
                      }),
                      t._uU(46, "Clear badge number"),
                      t.qZA(),
                      t.TgZ(47, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.subscribe();
                      }),
                      t._uU(48, "Subscribe"),
                      t.qZA(),
                      t.TgZ(49, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.unsubscribe();
                      }),
                      t._uU(50, "Unsubscribe"),
                      t.qZA(),
                      t.TgZ(51, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.unregister();
                      }),
                      t._uU(52, "Unregister"),
                      t.qZA(),
                      t.TgZ(53, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.enableAutoInit();
                      }),
                      t._uU(54, "Enable Auto Init"),
                      t.qZA(),
                      t.TgZ(55, "ion-button", 3),
                      t.NdJ("click", function () {
                        return i.disableAutoInit();
                      }),
                      t._uU(56, "Disable Auto Init"),
                      t.qZA()(),
                      t.TgZ(57, "h3"),
                      t._uU(58, "Activity log (latest first)"),
                      t.qZA(),
                      t.TgZ(59, "button", 7),
                      t._uU(60, "Clear activity log"),
                      t.qZA(),
                      t._UZ(61, "pre", 8),
                      t.qZA()()()()),
                      2 & e &&
                        (t.xp6(10),
                        t.Q6J("routerLink", t.DdM(3, Z)),
                        t.xp6(3),
                        t.Q6J("routerLink", t.DdM(4, v)),
                        t.xp6(3),
                        t.Q6J("routerLink", t.DdM(5, N)));
                  },
                  dependencies: [
                    l.YG,
                    l.PM,
                    l.FN,
                    l.wI,
                    l.W2,
                    l.jY,
                    l.Gu,
                    l.Ie,
                    l.Nd,
                    l.wd,
                    l.sr,
                    l.YI,
                    g.rH,
                  ],
                  styles: [
                    "#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}",
                  ],
                })),
                r
              );
            })(),
          },
        ];
      let F = (() => {
          class n {}
          return (
            (n.ɵfac = function (s) {
              return new (s || n)();
            }),
            (n.ɵmod = t.oAB({ type: n })),
            (n.ɵinj = t.cJS({ imports: [g.Bz.forChild(C), g.Bz] })),
            n
          );
        })(),
        M = (() => {
          class n {}
          return (
            (n.ɵfac = function (s) {
              return new (s || n)();
            }),
            (n.ɵmod = t.oAB({ type: n })),
            (n.ɵinj = t.cJS({ imports: [b.ez, m.u5, l.Pc, F] })),
            n
          );
        })();
    },
  },
]);
