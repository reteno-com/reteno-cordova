cordova-plugin-reteno-firebase
========================

Brings push notifications, analytics, event tracking, crash reporting and more from Google Firebase to your Cordova project.

Supported platforms: Android and iOS

It is fork version of cordova-plugin-firebasex plugin [Google Firebase Plugin](https://github.com/reteno/cordova-plugin-reteno-firebase) 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Installation](#installation)
  - [Plugin variables](#plugin-variables)
    - [Android & iOS](#android--ios)
    - [Android only](#android-only)
    - [iOS only](#ios-only)
  - [Supported Cordova Versions](#supported-cordova-versions)
  - [Supported Mobile Platform Versions](#supported-mobile-platform-versions)
  - [Migrating from cordova-plugin-firebase](#migrating-from-cordova-plugin-firebase)
    - [Breaking API changes](#breaking-api-changes)
    - [Ionic 4+](#ionic-4)
    - [Ionic 3](#ionic-3)
- [Build environment notes](#build-environment-notes)
  - [Remote Cloud Build](#remote-cloud-build)
  - [Capacitor support](#capacitor-support)
  - [Android-specific](#android-specific)
    - [Specifying Android library versions](#specifying-android-library-versions)
    - [AndroidX](#androidx)
  - [Google Play Services and Firebase libraries](#google-play-services-and-firebase-libraries)
  - [iOS-specific](#ios-specific)
    - [Specifying iOS library versions](#specifying-ios-library-versions)
    - [Cocoapods](#cocoapods)
    - [Out-of-date pods](#out-of-date-pods)
    - [Strip debug symbols](#strip-debug-symbols)
    - [Cordova CLI builds](#cordova-cli-builds)
- [Firebase config setup](#firebase-config-setup)
- [Disable data collection on startup](#disable-data-collection-on-startup)
- [Cloud messaging](#cloud-messaging)
  - [Background notifications](#background-notifications)
  - [Foreground notifications](#foreground-notifications)
  - [Android notifications](#android-notifications)
    - [Android background notifications](#android-background-notifications)
    - [Android foreground notifications](#android-foreground-notifications)
    - [Android Notification Channels](#android-notification-channels)
    - [Android Notification Icons](#android-notification-icons)
    - [Android Notification Color](#android-notification-color)
    - [Android Notification Sound](#android-notification-sound)
    - [Android cloud message types](#android-cloud-message-types)
  - [iOS notifications](#ios-notifications)
    - [iOS background notifications](#ios-background-notifications)
    - [iOS notification sound](#ios-notification-sound)
    - [iOS critical notifications](#ios-critical-notifications)
    - [iOS badge number](#ios-badge-number)
    - [iOS actionable notifications](#ios-actionable-notifications)
    - [iOS notification settings button](#ios-notification-settings-button)
  - [Data messages](#data-messages)
    - [Data message notifications](#data-message-notifications)
  - [Custom FCM message handling](#custom-fcm-message-handling)
    - [Android](#android)
    - [iOS](#ios)
- [InApp Messaging](#inapp-messaging)
- [API](#api)
  - [Notifications and data messages](#notifications-and-data-messages)
    - [getToken](#gettoken)
    - [getId](#getid)
    - [onTokenRefresh](#ontokenrefresh)
    - [getAPNSToken](#getapnstoken)
    - [onApnsTokenReceived](#onapnstokenreceived)
    - [onOpenSettings](#onopensettings)
    - [onMessageReceived](#onmessagereceived)
    - [grantPermission](#grantpermission)
    - [grantCriticalPermission](#grantcriticalpermission)
    - [hasPermission](#haspermission)
    - [hasCriticalPermission](#hascriticalpermission)
    - [unregister](#unregister)
    - [isAutoInitEnabled](#isautoinitenabled)
    - [setAutoInitEnabled](#setautoinitenabled)
    - [setBadgeNumber](#setbadgenumber)
    - [getBadgeNumber](#getbadgenumber)
    - [clearAllNotifications](#clearallnotifications)
    - [subscribe](#subscribe)
    - [unsubscribe](#unsubscribe)
    - [createChannel](#createchannel)
    - [setDefaultChannel](#setdefaultchannel)
    - [Default Android Channel Properties](#default-android-channel-properties)
    - [deleteChannel](#deletechannel)
    - [listChannels](#listchannels)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation
Install the plugin by adding it to your project's config.xml:
```xml
<plugin name="cordova-plugin-reteno-firebase" spec="latest" />
```
or by running:
```
cordova plugin add cordova-plugin-reteno-firebase
```

## Plugin variables
The following Cordova plugin variables are supported by the plugin.
Note that these must be set at plugin installation time. If you wish to change plugin variables, you'll need to uninstall the plugin and reinstall it with the new variable values.

### Android & iOS
- `FIREBASE_ANALYTICS_COLLECTION_ENABLED` - whether to automatically enable Firebase Analytics data collection on app startup
- `FIREBASE_PERFORMANCE_COLLECTION_ENABLED` - whether to automatically enable Firebase Performance data collection on app startup
- `FIREBASE_CRASHLYTICS_COLLECTION_ENABLED` - whether to automatically enable Firebase Crashlytics data collection on app startup
- `FIREBASE_FCM_AUTOINIT_ENABLED` - whether to automatically enable FCM registration on app startup
See [Disable data collection on startup](#disable-data-collection-on-startup) for more info.

### Android only
The following plugin variables are used to specify the Firebase SDK versions as Gradle dependencies on Android:
- `ANDROID_PLAY_SERVICES_TAGMANAGER_VERSION`
- `ANDROID_PLAY_SERVICES_AUTH_VERSION`
- `ANDROID_FIREBASE_ANALYTICS_VERSION`
- `ANDROID_FIREBASE_MESSAGING_VERSION`
- `ANDROID_FIREBASE_CONFIG_VERSION`
- `ANDROID_FIREBASE_PERF_VERSION`
- `ANDROID_FIREBASE_AUTH_VERSION`
- `$ANDROID_FIREBASE_INAPPMESSAGING_VERSION`
- `ANDROID_FIREBASE_FIRESTORE_VERSION`
- `ANDROID_FIREBASE_FUNCTIONS_VERSION`
- `ANDROID_FIREBASE_INSTALLATIONS_VERSION`
- `ANDROID_FIREBASE_CRASHLYTICS_VERSION`
- `ANDROID_FIREBASE_CRASHLYTICS_NDK_VERSION`
- `ANDROID_GSON_VERSION`
- `ANDROID_FIREBASE_PERF_GRADLE_PLUGIN_VERSION`
- `ANDROID_FIREBASE_PERFORMANCE_MONITORING`
See [Specifying Android library versions](#specifying-android-library-versions) for more info.

- `ANDROID_ICON_ACCENT` - sets the default accent color for system notifications. See [Android Notification Color](#android-notification-color) for more info.
- `ANDROID_FIREBASE_CONFIG_FILEPATH` - sets a custom filepath to `google-services.json` file as a path relative to the project root
    - e.g. `--variable ANDROID_FIREBASE_CONFIG_FILEPATH="resources/android/google-services.json"`
- `ANDROID_FIREBASE_PERFORMANCE_MONITORING` - sets whether to add the [Firebase Performance Monitoring Gradle plugin for Android](https://firebase.google.com/docs/perf-mon/get-started-android?authuser=0#add-perfmon-plugin) to the build.
    - e.g.  `--variable ANDROID_FIREBASE_PERFORMANCE_MONITORING=true`
    - Defaults to `false` if not specified.
- `ANDROID_FIREBASE_PERF_GRADLE_PLUGIN_VERSION` - overrides the default version of the [Firebase Performance Monitoring Gradle plugin for Android](https://firebase.google.com/docs/perf-mon/get-started-android?authuser=0#add-perfmon-plugin)
- `ANDROID_GRPC_OKHTTP` - sets version of GRPC OKHTTP library.

### iOS only
- `IOS_FIREBASE_SDK_VERSION` - a specific version of the Firebase iOS SDK to set in the Podfile
  - If not specified, the default version defined in `<pod>` elements in the `plugin.xml` will be used.
- `IOS_GOOGLE_SIGIN_VERSION` - a specific version of the Google Sign In library to set in the Podfile
  - If not specified, the default version defined in the `<pod>` element in the `plugin.xml` will be used.
- `IOS_GOOGLE_TAG_MANAGER_VERSION` - a specific version of the Google Tag Manager library to set in the Podfile
  - If not specified, the default version defined in the `<pod>` element in the `plugin.xml` will be used.
- `IOS_USE_PRECOMPILED_FIRESTORE_POD` - if `true`, switches Podfile to use a [pre-compiled version of the Firestore pod](https://github.com/invertase/firestore-ios-sdk-frameworks.git) to reduce build time
- `IOS_STRIP_DEBUG` - prevents symbolification of all libraries included via Cocoapods. See [Strip debug symbols](#strip-debug-symbols) for more info.
    - e.g.  `--variable IOS_STRIP_DEBUG=true`
    - Defaults to `false` if not specified.
- `SETUP_RECAPTCHA_VERIFICATION` - automatically sets up reCAPTCHA verification for phone authentication on iOS. See [verifyPhoneNumber](#verifyphonenumber) for more info.
    - e.g.  `--variable SETUP_RECAPTCHA_VERIFICATION=true`
    - Defaults to `false` if not specified.
- `IOS_SHOULD_ESTABLISH_DIRECT_CHANNEL` - If `true` Firebase Messaging will automatically establish a socket-based, direct channel to the FCM server.
   - e.g.  `--variable IOS_SHOULD_ESTABLISH_DIRECT_CHANNEL=true`
   - Defaults to `false` if not specified.
   - See [`shouldEstablishDirectChannel`](https://firebase.google.com/docs/reference/ios/firebasemessaging/api/reference/Classes/FIRMessaging#/c:objc(cs)FIRMessaging(py)shouldEstablishDirectChannel)
   - Note: Firebase Messaging iOS SDK version 7.0 will be a breaking change where the SDK will no longer support iOS Direct Channel API.
- `IOS_FIREBASE_CONFIG_FILEPATH` - sets a custom filepath to `GoogleService-Info.plist` file as a path relative to the project root
    - e.g. `--variable IOS_FIREBASE_CONFIG_FILEPATH="resources/ios/GoogleService-Info.plist"`
- `IOS_ENABLE_APPLE_SIGNIN` - enables the Sign In with Apple capability in Xcode.
    - `--variable IOS_ENABLE_APPLE_SIGNIN=true`
    - Ensure the associated app provisioning profile also has this capability enabled.
- `IOS_ENABLE_CRITICAL_ALERTS_ENABLED` - enables the critical alerts capability
  - `--variable IOS_ENABLE_CRITICAL_ALERTS_ENABLED=true`
  - See [iOS critical notifications](#ios-critical-notifications)
  - Ensure the associated app provisioning profile also has this capability enabled.
- `IOS_FCM_ENABLED` - allows to completely disable push notifications functionality of the plugin (not just the automatic initialization that is covered by `FIREBASE_FCM_AUTOINIT_ENABLED` variable).
  - Defaults to `true`, if not specified; i.e. FCM is enabled by default.
  - This can be handy if you are using this plugin for e.g. Crashlytics and handle push notifications using another plugin. Use `--variable IOS_FCM_ENABLED=false` in this case.

## Supported Cordova Versions
- cordova: `>= 10`
- cordova-android: `>= 10`
- cordova-ios: `>= 6`

## Supported Mobile Platform Versions
The supported versions of Android and iOS depend on the version of the Firebase SDK included in the build.

See the Firebase [iOS](https://firebase.google.com/support/release-notes/ios) and [Android](https://firebase.google.com/support/release-notes/android) release notes to determine the minimum support OS versions for the SDK version included in your build.
If you didn't explicity specify a version for the Firebase SDK using plugin variables at plugin installation time, you can find the current default version in the plugin's `plugin.xml`.

## Migrating from cordova-plugin-firebase
This plugin is a fork of [cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase) which has been reworked to fix issues and add new functionality.
If you already have [cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase) installed in your Cordova project, you need to completely remove it before installing this plugin otherwise they will conflict and cause build errors in your project. The safest way of doing this is as follows:

    rm -Rf platforms/android
    cordova plugin rm cordova-plugin-firebase
    rm -Rf plugins/ node_modules/
    npm install
    cordova plugin add cordova-plugin-reteno-firebase
    cordova platform add android

### Breaking API changes
**IMPORTANT:** Recent versions of `cordova-plugin-reteno-firebase` have made breaking changes to the plugin API in order to fix bugs or add more functionality.
Therefore you can no longer directly substitute `cordova-plugin-reteno-firebase` in place of `cordova-plugin-firebase` without making code changes.

You should be aware of the following breaking changes compared with `cordova-plugin-firebase`:
* Minimum supported Cordova versions
    * `cordova@10` (CLI)
    * `cordova-android@10` (Android platform)
    * `cordova-ios@6` (iOS platform)
* Migrated to AndroidX from legacy Android Support Library
* Migrated to Cocoapods to satisfy Firebase SDK dependencies on iOS
* `onNotificationOpen()` renamed to `onMessageReceived()`
    * `tap` parameter is only set when user taps on a notification (not when a message is received from FCM)
    * `tap=foreground|background` instead of `tap=true|false`
* `hasPermission()` receives argument as a boolean (rather than an object with `isEnabled` key)
    * e.g. `FirebasePlugin.hasPermission(function(hasPermission){
               console.log("Permission is " + (hasPermission ? "granted" : "denied"));
           });`
* Adds support for foreground notifications and data notification messages

### Ionic 4+
Ionic Native provides a [FirebaseX Typescript wrapper](https://ionicframework.com/docs/native/firebase-x) for using `cordova-plugin-reten-firebase` with Ionic v4, v5 and above.
Please see their documentation for usage.

First install the package.

```
ionic cordova plugin add cordova-plugin-reteno-firebase
npm install @ionic-native/firebase-x
```

If you're using Angular, register it in your component/service's `NgModule` (for example, app.module.ts) as a provider.

```typescript
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

@NgModule({
    //declarations, imports...
    providers: [
        FirebaseX,
        //other providers...
    ]
})
```

Then you're good to go.
```typescript
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

//...

constructor(private firebase: FirebaseX)

this.firebase.getToken().then(token => console.log(`The token is ${token}`))
this.firebase.onMessageReceived().subscribe(data => console.log(`FCM message: ${data}`));
```

**NOTE:**
- This plugin provides only the Javascript API as documented below.
- The Typescript wrapper is owned and maintain by Ionic.
- Please [report any issues](https://github.com/ionic-team/ionic-native/issues) against the [Ionic Native repo](https://github.com/ionic-team/ionic-native/), not this one.
- Any issues opened against this repo which relate to the Typescript wrapper **will be closed immediately**.


### Ionic 3
The above PR does not work for Ionic 3 so you (currently) can't use the [Ionic Native Firebase](https://ionicframework.com/docs/native/firebase) Typescript wrapper with Ionic 3.
(i.e. `import { Firebase } from "@ionic-native/firebase"` will not work).

To use `cordova-plugin-reteno-firebase` with Ionic 3, you'll need to call its Javascript API directly from your Typescript app code, for example:

```typescript
(<any>window).FirebasePlugin.getToken(token => console.log(`token: ${token}`))

(<any>window).FirebasePlugin.onMessageReceived((message) => {
    if (message.tap) { console.log(`Notification was tapped in the ${message.tap}`); }
})
```

If you want to make the `onMessageReceived()` JS API behave like the Ionic Native wrapper:

```javascript
onNotificationOpen() {
      return new Observable(observer => {
            (window as any).FirebasePlugin.onMessageReceived((response) => {
                observer.next(response);
            });
       });
}
...
this.onNotificationOpen().subscribe(data => console.log(`FCM message: ${data}`));
```

See the [cordova-plugin-firebasex-ionic3-test](https://github.com/dpa99c/cordova-plugin-firebasex-ionic3-test) example project for a demonstration of how to use the plugin with Ionic 3.

# Build environment notes

## Remote Cloud Build
This plugin **will not work** with remote cloud build services that do not support Cordova hook scripts (e.g. [Ionic Appflow](https://ionic.io/appflow)).
The hook scripts used by this plugin are essential to configure the native platform projects for use with the Firebase SDK and therefore if they are not executed, the plugin will not work correctly: either the build will fail or the app containing the plugin will crash at runtime.

Even if the remote build service supports Cordova hook scripts, it is hard to diagnose the cause of build issue because the environment is not under your direct control.
Therefore a **local build environment** is highly recommended since you have full control and the ability to update/upgrade any components in the OS.
Support for using this plugin can only be offered when building projects in a local environment. (i.e. your own development machine).

However if you are unable to build locally and therefore must use a remote build environment, then [VoltBuilder](https://volt.build/) is recommended for use with this plugin as it supports Cordova hook scripts and its developers have explicitly tested building with this plugin to ensure compatibility.

## Android-specific

### Specifying Android library versions
This plugin depends on various components such as the Firebase SDK which are pulled in at build-time by Gradle on Android.
By default this plugin pins specific versions of these in [its `plugin.xml`](https://github.com/dpa99c/cordova-plugin-firebase/blob/master/plugin.xml) where you can find the currently pinned versions as `<preference>`'s, for example:

```xml
<preference name="ANDROID_FIREBASE_ANALYTICS_VERSION" default="17.0.0" />
```

The Android defaults can be overridden at plugin installation time by specifying plugin variables as command-line arguments, for example:

    cordova plugin add cordova-plugin-reteno-firebase --variable ANDROID_FIREBASE_ANALYTICS_VERSION=17.0.0

Or you can specify them as plugin variables in your `config.xml`, for example:

```xml
<plugin name="cordova-plugin-reteno-firebase" spec="latest">
    <variable name="ANDROID_FIREBASE_ANALYTICS_VERSION" value="17.0.0" />
</plugin>
```

The following plugin variables are used to specify the following Gradle dependency versions on Android:

- `ANDROID_PLAY_SERVICES_TAGMANAGER_VERSION` => `com.google.android.gms:play-services-tagmanager`
- `ANDROID_PLAY_SERVICES_AUTH_VERSION` => `com.google.android.gms:play-services-auth`
- `ANDROID_FIREBASE_ANALYTICS_VERSION` => `com.google.firebase:firebase-analytics`
- `ANDROID_FIREBASE_MESSAGING_VERSION` => `com.google.firebase:firebase-messaging`
- `ANDROID_FIREBASE_CONFIG_VERSION` => `com.google.firebase:firebase-config`
- `ANDROID_FIREBASE_PERF_VERSION` => `com.google.firebase:firebase-perf`
- `ANDROID_FIREBASE_AUTH_VERSION` => `com.google.firebase:firebase-auth`
- `ANDROID_FIREBASE_FIRESTORE_VERSION` => `com.google.firebase:firebase-firestore`
- `$ANDROID_FIREBASE_FUNCTIONS_VERSION` => `com.google.firebase:firebase-functions`
- `$ANDROID_FIREBASE_INSTALLATIONS_VERSION` => `com.google.firebase:firebase-installations`
- `$ANDROID_FIREBASE_INAPPMESSAGING_VERSION` => `com.google.firebase:firebase-inappmessaging-display`
- `ANDROID_FIREBASE_CRASHLYTICS_VERSION` => `com.google.firebase:firebase-crashlytics`
- `ANDROID_FIREBASE_CRASHLYTICS_NDK_VERSION` => `com.google.firebase:firebase-crashlytics-ndk`
- `ANDROID_GSON_VERSION` => `com.google.code.gson:gson`

For example:

    cordova plugin add cordova-plugin-reteno-firebase \
        --variable ANDROID_PLAY_SERVICES_TAGMANAGER_VERSION=17.0.0 \
        --variable ANDROID_PLAY_SERVICES_AUTH_VERSION=17.0.0 \
        --variable ANDROID_FIREBASE_ANALYTICS_VERSION=17.0.0 \
        --variable ANDROID_FIREBASE_MESSAGING_VERSION=19.0.0 \
        --variable ANDROID_FIREBASE_CONFIG_VERSION=18.0.0 \
        --variable ANDROID_FIREBASE_PERF_VERSION=18.0.0 \
        --variable ANDROID_FIREBASE_AUTH_VERSION=18.0.0 \
        --variable ANDROID_FIREBASE_CRASHLYTICS_VERSION=17.0.1 \
        --variable ANDROID_FIREBASE_CRASHLYTICS_NDK_VERSION=17.0.1 \

### AndroidX
This plugin has been migrated to use [AndroidX (Jetpack)](https://developer.android.com/jetpack/androidx/migrate) which is the successor to the [Android Support Library](https://developer.android.com/topic/libraries/support-library/index).
This is because the [major release of the Firebase and Play Services libraries on 17 June 2019](https://developers.google.com/android/guides/releases#june_17_2019) were migrated to AndroidX.

The `cordova-android@9` platform adds implicit support for AndroidX so (if you haven't already done so) you should update to this platform version:

    cordova platform rm android && cordova platform add android@latest

and enable AndroidX by setting the following preference in your `config.xml`:

    <preference name="AndroidXEnabled" value="true" />

If you are unable to update from `cordova-android@8`, you can add [cordova-plugin-androidx](https://github.com/dpa99c/cordova-plugin-androidx) to your project which enables AndroidX in the Android platform project:

    cordova plugin add cordova-plugin-androidx

If your project includes any plugins which are dependent on the legacy Android Support Library (to which AndroidX is the successor), you should add [cordova-plugin-androidx-adapter](https://github.com/dpa99c/cordova-plugin-androidx-adapter) to your project which will dynamically migrate any plugin code from the Android Support Library to AndroidX equivalents:

    cordova plugin add cordova-plugin-androidx-adapter

## Google Play Services and Firebase libraries
Your Android build may fail if you are installing multiple plugins that use the Google Play Services library.
This is caused by plugins installing different versions of the Google Play Services library.
This can be resolved by installing [cordova-android-play-services-gradle-release](https://github.com/dpa99c/cordova-android-play-services-gradle-release) which enables you to override the versions specified by other plugins in order to align them.

Similarly, if your build is failing because multiple plugins are installing different versions of the Firebase library,
you can try installing [cordova-android-firebase-gradle-release](https://github.com/dpa99c/cordova-android-firebase-gradle-release) to align these.

## iOS-specific
Please ensure you have the latest Xcode release version installed to build your app - direct download links can be [found here](https://stackoverflow.com/a/10335943/777265).

### Specifying iOS library versions
This plugin depends on various components such as the Firebase SDK which are pulled in at build-time by Cocoapods on iOS.
This plugin pins specific versions of these in [its `plugin.xml`](https://github.com/dpa99c/cordova-plugin-firebase/blob/master/plugin.xml) where you can find the currently pinned iOS versions in the  `<pod>`'s, for example:

    <pod name="Firebase/Core" spec="6.3.0"/>

Cordova does not natively support the use of plugin variables in the `<pod>`'s `spec` attribute, however this plugin uses a hook script to enable this behaviour by overriding the version specified in `plugin.xml` directly within the `Podfile`.
Therefore to override the version of the Firebase iOS SDK components set in the `plugin.xml`, you should define it using the `IOS_FIREBASE_SDK_VERSION` plugin variable when installing the plugin into your project.
For example:

    cordova plugin add cordova-plugin-reteno-firebase --variable IOS_FIREBASE_SDK_VERSION=9.1.0

### Cocoapods
This plugin relies on Cordova support for the [CocoaPods dependency manager]( https://cocoapods.org/) in order to satisfy the iOS Firebase SDK library dependencies.

Please make sure you have `cocoapods@>=1.11.2` installed in your iOS build environment - setup instructions can be found [here](https://cocoapods.org/).

If building your project in Xcode, you need to open `YourProject.xcworkspace` (not `YourProject.xcodeproj`) so both your Cordova app project and the Pods project will be loaded into Xcode.

You can list the pod dependencies in your Cordova iOS project by installing [cocoapods-dependencies](https://github.com/segiddins/cocoapods-dependencies):

    sudo gem install cocoapods-dependencies
    cd platforms/ios/
    pod dependencies

### Out-of-date pods
If you receive a build error such as this:

    None of your spec sources contain a spec satisfying the dependencies: `Firebase/Analytics (~> 6.1.0), Firebase/Analytics (= 6.1.0, ~> 6.1.0)`.

Make sure your local Cocoapods repo is up-to-date by running `pod repo update` then run `pod install` in `/your_project/platforms/ios/`.

### Strip debug symbols
If your iOS app build contains too many debug symbols (i.e. because you include lots of libraries via a Cocoapods), you might get an error (e.g. [issue #28](https://github.com/dpa99c/cordova-plugin-firebase/issues/28)) when you upload your binary to App Store Connect, e.g.:

    ITMS-90381: Too many symbol files - These symbols have no corresponding slice in any binary [16EBC8AC-DAA9-39CF-89EA-6A58EB5A5A2F.symbols, 1B105D69-2039-36A4-A04D-96C1C5BAF235.symbols, 476EACDF-583B-3B29-95B9-253CB41097C8.symbols, 9789B03B-6774-3BC9-A8F0-B9D44B08DCCB.symbols, 983BAE60-D245-3291-9F9C-D25E610846AC.symbols].

To prevent this, you can set the `IOS_STRIP_DEBUG` plugin variable which prevents symbolification of all libraries included via Cocoapods ([see here for more information](https://stackoverflow.com/a/48518656/777265)):

    cordova plugin add cordova-plugin-reteno-firebase --variable IOS_STRIP_DEBUG=true

By default this preference is set to `false`.

Note: if you enable this setting, any crashes that occur within libraries included via Cocopods will not be recorded in Crashlytics or other crash reporting services.

### Cordova CLI builds
If you are building (directly or indirectly) via the Cordova CLI and a build failures on iOS such as the one below:

    error: Resource "/Build/Products/Debug-iphonesimulator/FirebaseInAppMessaging/InAppMessagingDisplayResources.bundle" not found. Run 'pod install' to update the copy resources script.


Note that building from Xcode works fine, so if you are able then do this.

Otherwise (e.g. if building via a CI) then you'll need to switch to using the CLI of this plugin:

    cordova plugin rm cordova-plugin-reteno-firebase && cordova plugin add cordova-plugin-reteno-firebase@latest-cli

This removes the Firebase Inapp Messaging and Google Tag Manager SDK components that are causing the build issues.
The `cli_build` branch is kept in sync with `master` but without the above components.

You can validate your CLI build environment using [this publicly-available `GoogleService-Info.plist`](https://github.coventry.ac.uk/301CEM-1920OCTJAN/301CEM-6957713/raw/master/CanaryApparel/GoogleService-Info.plist):

	cordova create test com.canary.CanaryApparel && cd test
	curl https://github.coventry.ac.uk/raw/301CEM-1920OCTJAN/301CEM-6957713/master/CanaryApparel/GoogleService-Info.plist -o GoogleService-Info.plist
	cordova plugin add cordova-plugin-reteno-firebase@latest-cli
	cordova platform add ios
	cordova build ios --emulator
	#build succeeds

Following the installation steps above, modify the `package.json` file to pin the `cli` variant of this package by removing the `^` or `~` prefix from the package declaration. Failure to do this will result in build issues the next time the `cordova prepare` steps are performed as the non-cli version of the package will replace the cli variant.
```
  "dependencies": {
    "cordova-android": "~8.1.0",
    "cordova-ios": "^6.1.0",
    "cordova-plugin-androidx": "^2.0.0",
    "cordova-plugin-androidx-adapter": "^1.1.1",
    "cordova-plugin-reteno-firebase": "^10.1.2-cli" --> Change to "10.1.2-cli"
  },
```

# Firebase config setup
There's a handy [installation and setup guide on medium.com](https://medium.com/@felipepucinelli/how-to-add-push-notifications-in-your-cordova-application-using-firebase-69fac067e821).
However, if using this, remember this forked plugin is `cordova-plugin-reteno-firebase` (not `cordova-plugin-reteno-firebase`).

Download your Firebase configuration files, `GoogleService-Info.plist` for iOS and `google-services.json` for android, and place them in the root folder of your cordova project.
Check out this [firebase article](https://support.google.com/firebase/answer/7015592) for details on how to download the files.

```
- My Project/
    platforms/
    plugins/
    www/
    config.xml
    google-services.json       <--
    GoogleService-Info.plist   <--
    ...
```

Or you can set custom location for your platform configuration files using plugin variables in your `config.xml`:

```
<plugin name="cordova-plugin-reteno-firebase">
    <variable name="ANDROID_FIREBASE_CONFIG_FILEPATH" value="resources/android/google-services.json" />
    <variable name="IOS_FIREBASE_CONFIG_FILEPATH" value="resources/ios/GoogleService-Info.plist" />
</plugin>
```

IMPORTANT: The Firebase SDK requires the configuration files to be present and valid, otherwise your app will crash on boot or Firebase features won't work.

# Cloud messaging

<p align="center">
  <a href="https://youtu.be/qLPhan9YUhQ"><img src="https://media.giphy.com/media/U70vu02o9yCFEffidf/200w_d.gif" /></a>
  <span>&nbsp;</span>
  <a href="https://youtu.be/35feCmGYSR4"><img src="https://media.giphy.com/media/Y4oFG0Awhd3TpnggHz/200w_d.gif" /></a>
</p>

There are 2 distinct types of messages that can be sent by Firebase Cloud Messaging (FCM):

- [Notification messages](https://firebase.google.com/docs/cloud-messaging/concept-options#notifications)
    - automatically displayed to the user by the operating system on behalf of the client app **while your app is not running or is in the background**
        - **if your app is in the foreground when the notification message arrives**, it is passed to the client app and it is the responsibility of the client app to display it.
    - have a predefined set of user-visible keys and an optional data payload of custom key-value pairs.
- [Data messages](https://firebase.google.com/docs/cloud-messaging/concept-options#data_messages)
    - Client app is responsible for processing data messages.
    - Data messages have only custom key-value pairs.

Note: only notification messages can be sent via the Firebase Console - data messages must be sent via the [FCM APIs](https://firebase.google.com/docs/cloud-messaging/server).

## Background notifications
If the notification message arrives while the app is in the background/not running, it will be displayed as a system notification.

By default, no callback is made to the plugin when the message arrives while the app is not in the foreground, since the display of the notification is entirely handled by the operating system.
However, there are platform-specific circumstances where a callback can be made when the message arrives and the app is in the background that don't require user interaction to receive the message payload - see [Android background notifications](#android-background-notifications) and [iOS background notifications](#ios-background-notifications) for details.

If the user taps the system notification, this launches/resumes the app and the notification title, body and optional data payload is passed to the [onMessageReceived](#onMessageReceived) callback.

When the `onMessageReceived` is called in response to a user tapping a system notification while the app is in the background/not running, it will be passed the property `tap: "background"`.


## Foreground notifications
If the notification message arrives while the app is in running in the foreground, by default **it will NOT be displayed as a system notification**.
Instead the notification message payload will be passed to the [onMessageReceived](#onMessageReceived) callback for the plugin to handle (`tap` will not be set).

If you include the `notification_foreground` key in the `data` payload, the plugin will also display a system notification upon receiving the notification messages while the app is running in the foreground.
For example:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "data": {
    "notification_foreground": "true",
  }
}
```

When the `onMessageReceived` is called in response to a user tapping a system notification while the app is in the foreground, it will be passed the property `tap: "foreground"`.

You can set additional properties of the foreground notification using the same key names as for [Data Message Notifications](#data-message-notification-keys).

## Android notifications
Notifications on Android can be customised to specify the sound, icon, LED colour, etc. that's displayed when the notification arrives.

### Android background notifications
If the notification message arrives while the app is in the background/not running, it will be displayed as a system notification.

If a notification message arrives while the app is in the background but is still running (i.e. has not been task-killed) and the device is not in power-saving mode, the `onMessageReceived` callback will be invoked without the `tap` property, indicating the message was received without user interaction.

If the user then taps the system notification, the app will be brought to the foreground and `onMessageReceived` will be invoked **again**, this time with `tap: "background"` indicating that the user tapped the system notification while the app was in the background.

In addition to the title and body of the notification message, Android system notifications support specification of the following notification settings:
- [Icon](#android-notification-icons)
- [Sound](#android-notification-sound)
- [Color accent](#android-notification-color)
- [Channel ID](#android-notification-channels) (Android 8.0 (O) and above)
    - This channel configuration enables you to specify:
        - Sound
        - Vibration
        - LED light
        - Badge
        - Importance
        - Visibility
    - See [createChannel](#createchannel) for details.

Note: on tapping a background notification, if your app is not running, only the `data` section of the notification message payload will be delivered to [onMessageReceived](#onMessageReceived).
i.e. the notification title, body, etc. will not. Therefore if you need the properties of the notification message itself (e.g. title & body) to be delivered to [onMessageReceived](#onMessageReceived), you must duplicate these in the `data` section, e.g.:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "data": {
    "notification_body": "Notification body",
    "notification_title": "Notification title"
  }
}
```

### Android foreground notifications
If the notification message arrives while the app is in the foreground, by default a system notification won't be displayed and the data will be passed to [onMessageReceived](#onMessageReceived).

However, if you set the `notification_foreground` key in the `data` section of the notification message payload, this will cause the plugin to display system notification when the message is received while your app is in the foreground. You can customise the notification using the same keys as for [Android data message notifications](#android-data-message-notifications).

### Android Notification Channels
- Android 8 (O) introduced [notification channels](https://developer.android.com/training/notify-user/channels).
- Notification channels are configured by the app and used to determine the **sound/lights/vibration** settings of system notifications.
- By default, this plugin creates a default channel with [default properties](#default-android-channel-properties)
    - These can be overridden via the [setDefaultChannel](#setdefaultchannel) function.
- The plugin enables the creation of additional custom channels via the [createChannel](#createchannel) function.

First you need to create a custom channel with the desired settings, for example:

```javascript
var channel  = {
    id: "my_channel_id",
    sound: "mysound",
    vibration: true,
    light: true,
    lightColor: parseInt("FF0000FF", 16).toString(),
    importance: 4,
    badge: true,
    visibility: 1
};

FirebasePlugin.createChannel(channel,
function(){
    console.log('Channel created: ' + channel.id);
},
function(error){
   console.log('Create channel error: ' + error);
});
```

Then reference it from your message payload:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "android": {
    "notification": {
      "channel_id": "my_channel_id"
    }
  }
}
```

#### Android 7 and below
- the channel referenced in the message payload will be ignored
- the sound setting of system notifications is specified in the notification message itself - see [Android Notification Sound](#android-notification-sound).


### Android Notification Icons
By default the plugin will use the default app icon for notification messages.

#### Android Default Notification Icon
To define a custom default notification icon, you need to create the images and deploy them to the `<projectroot>/platforms/android/app/src/main/res/<drawable-DPI>` folders.
The easiest way to create the images is using the [Image Asset Studio in Android Studio](https://developer.android.com/studio/write/image-asset-studio#create-notification) or using the [Android Asset Studio webapp](https://romannurik.github.io/AndroidAssetStudio/icons-notification.html#source.type=clipart&source.clipart=ac_unit&source.space.trim=1&source.space.pad=0&name=notification_icon).

The icons should be monochrome transparent PNGs with the following sizes:

- mdpi: 24x24
- hdpi: 36x36
- xhdpi: 48x48
- xxhdpi: 72x72
- xxxhdpi: 96x96

Once you've created the images, you need to deploy them from your Cordova project to the native Android project.
To do this, copy the `drawable-DPI` image directories into your Cordova project and add `<resource-file>` entries to the `<platform name="android">` section of your `config.xml`, where `src` specifies the relative path to the images files within your Cordova project directory.

For example, copy the`drawable-DPI` image directories to `<projectroot>/res/android/` and add the following to your `config.xml`:

```xml
<platform name="android">
    <resource-file src="res/android/drawable-mdpi/notification_icon.png" target="app/src/main/res/drawable-mdpi/notification_icon.png" />
    <resource-file src="res/android/drawable-hdpi/notification_icon.png" target="app/src/main/res/drawable-hdpi/notification_icon.png" />
    <resource-file src="res/android/drawable-xhdpi/notification_icon.png" target="app/src/main/res/drawable-xhdpi/notification_icon.png" />
    <resource-file src="res/android/drawable-xxhdpi/notification_icon.png" target="app/src/main/res/drawable-xxhdpi/notification_icon.png" />
    <resource-file src="res/android/drawable-xxxhdpi/notification_icon.png" target="app/src/main/res/drawable-xxxhdpi/notification_icon.png" />
</platform>
```

The default notification icon images **must** be named `notification_icon.png`.

You then need to add a `<config-file>` block to the `config.xml` which will instruct Firebase to use your icon as the default for notifications:

```xml
<platform name="android">
    <config-file target="AndroidManifest.xml" parent="/manifest/application">
        <meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@drawable/notification_icon" />
    </config-file>
</platform>
```


#### Android Large Notification Icon
The default notification icons above are monochrome, however you can additionally define a larger multi-coloured icon.

**NOTE:** FCM currently does not support large icons in system notifications displayed for notification messages received in the while the app is in the background (or not running).
So the large icon will currently only be used if specified in [data messages](#android-data-messages) or [foreground notifications](#foreground-notifications).

The large icon image should be a PNG-24 that's 256x256 pixels and must be named `notification_icon_large.png` and should be placed in the `drawable-xxxhdpi` resource directory.
As with the small icons, you'll need to add a `<resource-file>` entry to the `<platform name="android">` section of your `config.xml`:

```xml
<platform name="android">
    <resource-file src="res/android/drawable-xxxhdpi/notification_icon_large.png" target="app/src/main/res/drawable-xxxhdpi/notification_icon_large.png" />
</platform>
```


#### Android Custom Notification Icons
You can define additional sets of notification icons in the same manner as above.
These can be specified in notification or data messages.

For example:

```xml
        <resource-file src="res/android/drawable-mdpi/my_icon.png" target="app/src/main/res/drawable-mdpi/my_icon.png" />
        <resource-file src="res/android/drawable-hdpi/my_icon.png" target="app/src/main/res/drawable-hdpi/my_icon.png" />
        <resource-file src="res/android/drawable-xhdpi/my_icon.png" target="app/src/main/res/drawable-xhdpi/my_icon.png" />
        <resource-file src="res/android/drawable-xxhdpi/my_icon.png" target="app/src/main/res/drawable-xxhdpi/my_icon.png" />
        <resource-file src="res/android/drawable-xxxhdpi/my_icon.png" target="app/src/main/res/drawable-xxxhdpi/my_icon.png" />
        <resource-file src="res/android/drawable-xxxhdpi/my_icon_large.png" target="app/src/main/res/drawable-xxxhdpi/my_icon_large.png" />
```

When sending an FCM notification message, you will then specify the icon name in the `android.notification` section, for example:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "android": {
    "notification": {
      "icon": "my_icon",
    }
  },
  "data": {
    "notification_foreground": "true",
  }
}
```

You can also reference these icons in [data messages](#android-data-messages), for example:

```json
{
  "name": "my_data",
  "data" : {
    "notification_foreground": "true",
    "notification_body" : "Notification body",
    "notification_title": "Notification title",
    "notification_android_icon": "my_icon",
  }
}
```


### Android Notification Color
On Android Lollipop (5.0/API 21) and above you can set the default accent color for the notification by adding a color setting.
This is defined as an [ARGB colour](https://en.wikipedia.org/wiki/RGBA_color_space#ARGB_(word-order)) which the plugin sets by default to `#FF00FFFF` (cyan).
Note: On Android 7 and above, the accent color can only be set for the notification displayed in the system tray area - the icon in the statusbar is always white.

You can override this default by specifying a value using the `ANDROID_ICON_ACCENT` plugin variable during plugin installation, for example:

    cordova plugin add cordova-plugin-reteno-firebase --variable ANDROID_ICON_ACCENT=#FF123456

You can override the default color accent by specifying the `colour` key as an RGB value in a notification message, e.g.:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "android": {
    "notification": {
      "color": "#00ff00"
    }
  }
}
```

And in a data message:

```json
{
  "name": "my_data",
  "data" : {
    "notification_foreground": "true",
    "notification_body" : "Notification body",
    "notification_title": "Notification title",
    "notification_android_color": "#00ff00"
  }
}
```

### Android Notification Sound
You can specify custom sounds for notifications or play the device default notification sound.

Custom sound files must be in `.mp3` format and deployed to the `/res/raw` directory in the Android project.
To do this, you can add `<resource-file>` tags to your `config.xml` to deploy the files, for example:

```xml
<platform name="android">
    <resource-file src="res/android/raw/my_sound.mp3" target="app/src/main/res/raw/my_sound.mp3" />
</platform>
```

To ensure your custom sounds works on all versions of Android, be sure to include both the channel name and sound name in your message payload (see below for details), for example:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "android": {
    "notification": {
      "channel_id": "my_channel_id",
      "sound": "my_sound"
    }
  }
}
```

#### Android 8.0 and above
On Android 8.0 and above, the notification sound is specified by which [Android notification channel](#android-notification-channels) is referenced in the notification message payload.
First create a channel that references your sound, for example:

```javascript
var channel  = {
    id: "my_channel_id",
    sound: "my_sound"
};

FirebasePlugin.createChannel(channel,
function(){
    console.log('Channel created: ' + channel.id);
},
function(error){
   console.log('Create channel error: ' + error);
});
```

Then reference that channel in your message payload:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "android": {
    "notification": {
      "channel_id": "my_channel_id"
    }
  }
}
```

#### On Android 7 and below
On Android 7 and below, you need to specify the sound file name in the `android.notification` section of the message payload.
For example:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "android": {
    "notification": {
      "sound": "my_sound"
    }
  }
}
```

And in a data message by specifying it in the `data` section:

```json
{
  "name": "my_data",
  "data" : {
    "notification_foreground": "true",
    "notification_body" : "Notification body",
    "notification_title": "Notification title",
    "notification_android_sound": "my_sound"
  }
}
```

- To play the default notification sound, set `"sound": "default"`.
- To display a silent notification (no sound), omit the `sound` key from the message.

### Android cloud message types
The type of payload data in an FCM message influences how the message will be delivered to the app dependent on its run state, as outlined in [this Firebase documentation](https://firebase.google.com/docs/cloud-messaging/android/receive).

|App run state | Notification payload | Data payload | Notification+Data payload |
|----------|----------------------|--------------|---------------------------|
| Foreground | `onMessageReceived` | `onMessageReceived` | `onMessageReceived` |
| Background | System tray<sup>[[1]](#messagetypefootnote1)</sup>| `onMessageReceived` | Notification payload: System tray<sup>[[1]](#messagetypefootnote1)</sup> <br/> Data payload: `onMessageReceived` via extras of New Intent<sup>[[2]](#messagetypefootnote2)</sup> |
| Not running | System tray<sup>[[1]](#messagetypefootnote1)</sup> | **Never received**<sup>[[3]](#messagetypefootnote3)</sup> | Notification payload: System tray<sup>[[1]](#messagetypefootnote1)</sup> <br/> Data payload: `onMessageReceived` via extras of Launch Intent<sup>[[2]](#messagetypefootnote2)</sup> |

<a name="messagetypefootnote1">1</a>: If user taps the system notification, its payload is delivered to `onMessageReceived`

<a name="messagetypefootnote2">2</a>: The data payload is only delivered as an extras Bundle Intent if the user taps the system notification.
Otherwise it will not be delivered as outlined in [this Firebase documentation](https://firebase.google.com/docs/cloud-messaging/concept-options#notification-messages-with-optional-data-payload).

<a name="messagetypefootnote3">3</a>: If the app is not running/has been task-killed when the data message arrives, it will never be received by the app.

## iOS notifications
Notifications on iOS can be customised to specify the sound and badge number that's displayed when the notification arrives.

Notification settings are specified in the `apns.payload.aps` key of the notification message payload.
For example:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "apns": {
      "payload": {
        "aps": {
          "sound": "default",
          "badge": 1,
          "content-available": 1
        }
      }
    }
}
```

### iOS background notifications
If the app is in the background but is still running (i.e. has not been task-killed) and the device is not in power-saving mode, the `onMessageReceived` callback can be invoked when the message arrives without requiring user interaction (i.e. tapping the system notification).
To do this you must specify `"content-available": 1` in the `apns.payload.aps` section of the message payload - see the [Apple documentation](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW8) for more information.
When the message arrives, the `onMessageReceived` callback will be invoked without the `tap` property, indicating the message was received without user interaction.
If the user then taps the system notification, the app will be brought to the foreground and `onMessageReceived` will be invoked **again**, this time with `tap: "background"` indicating that the user tapped the system notification while the app was in the background.

### iOS notification sound
You can specify custom sounds for notifications or play the device default notification sound.

Custom sound files must be in a supported audio format (see [this Apple documentation](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/SupportingNotificationsinYourApp.html#//apple_ref/doc/uid/TP40008194-CH4-SW10) for supported formats).
For example to convert an `.mp3` file to the supported `.caf` format run:

    afconvert my_sound.mp3 my_sound.caf -d ima4 -f caff -v

Sound files must be deployed with the iOS application bundle.
To do this, you can add `<resource-file>` tags to your `config.xml` to deploy the files, for example:

```xml
<platform name="ios">
    <resource-file src="res/ios/sound/my_sound.caf" />
</platform>
```

In a notification message, specify the `sound` key in the `apns.payload.aps` section, for example:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "apns": {
      "payload": {
        "aps": {
          "sound": "my_sound.caf"
        }
      }
    }
}
```

- To play the default notification sound, set `"sound": "default"`.
- To display a silent notification (no sound), omit the `sound` key from the message.

In a data message, specify the `notification_ios_sound` key in the `data` section:

```json
{
  "name": "my_data",
  "data" : {
    "notification_foreground": "true",
    "notification_body" : "Notification body",
    "notification_title": "Notification title",
    "notification_ios_sound": "my_sound.caf"
  }
}
```

### iOS critical notifications
iOS offers the option to send critical push notifications. These kind of notifications appear even when your iPhone or iPad is in Do Not Disturb mode or silenced. Sending critical notifications requires a special entitlement that needs to be issued by Apple.
Use the pugin setting `IOS_ENABLE_CRITICAL_ALERTS_ENABLED=true` to enable the critical push notifications capability.
A user also needs to explicitly [grant permission](#grantcriticalpermission) to receive critical alerts.

### iOS badge number
In a notification message, specify the `badge` key in the `apns.payload.aps` section, for example:

```json
{
  "name": "my_notification",
  "notification": {
    "body": "Notification body",
    "title": "Notification title"
  },
  "apns": {
      "payload": {
        "aps": {
          "badge": 1
        }
      }
    }
}
```

In a data message, specify the `notification_ios_badge` key in the `data` section:

```json
{
  "name": "my_data",
  "data" : {
    "notification_foreground": "true",
    "notification_body" : "Notification body",
    "notification_title": "Notification title",
    "notification_ios_badge": 1
  }
}
```

### iOS actionable notifications
[Actionable notifications](https://developer.apple.com/documentation/usernotifications/declaring_your_actionable_notification_types) are supported on iOS:

<img width="300" src="https://user-images.githubusercontent.com/2345062/90025071-88c0a180-dcad-11ea-86f7-033f84601a56.png"/>
<img width="300" src="https://user-images.githubusercontent.com/2345062/90028234-531db780-dcb1-11ea-9df3-6bfcf8f2e9d8.png"/>

To use them in your app you must do the following:

1. Add a `pn-actions.json` file to your Cordova project which defines categories and actions, for example:

```json
    {
      "PushNotificationActions": [
        {
          "category": "news",
          "actions": [
            {
              "id": "read", "title": "Read", "foreground": true
            },
            {
              "id": "skip", "title": "Skip"
            },
            {
              "id": "delete", "title": "Delete", "destructive": true
            }
          ]
        }
      ]
    }
```

Note the `foreground` and `destructive` options correspond to the equivalent [UNNotificationActionOptions](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions?language=objc).

2. Reference it as a resource file in your `config.xml`:

```xml
    <platform name="ios">
        ...
        <resource-file src="relative/path/to/pn-actions.json" />
    </platform>
```

3. Add a category entry to your FCM message payload which references one of your categories:

```json
{
  "notification": {
      "title": "iOS Actionable Notification",
      "body": "With custom buttons"
  },
  "apns": {
    "payload": {
      "aps": {
        "category": "news"
      }
    }
  }
}
```

When the notification arrives, if the user presses an action button the [`onMessageReceived()`](#onmessagereceived) function is invoked with the notification message payload, including the corresponding action ID.
For example:

```json
{
    "action": "read",
    "google.c.a.e": "1",
    "notification_foreground": "true",
    "aps": {
        "alert": {
            "title": "iOS Actionable Notification",
            "body": "With custom buttons"
        },
        "category": "news"
    },
    "gcm.message_id": "1597240847657854",
    "tap": "background",
    "messageType": "notification"
}
```

So you can obtain the category with `message.aps.category` and the action with `message.action` and handle this appropriately in your app code.

Notes:
- Actionable notifications are currently only available for iOS - not Android
- To reveal the notification action buttons, the user must drag downwards on the notification dialog
- Actionable notifications work with both foreground and background (system) notifications
- If your app is in the background/not running when the notification message arrives and a system notification is displayed, if the user chooses an action (instead of tapping the notification dialog body), your app will not be launched/foregrounded but [`onMessageReceived()`](#onmessagereceived) will be invoked, enabling your app code to handle the user's action selection silently in the background.

### iOS notification settings button

<img width="300" src="https://i.stack.imgur.com/84LDU.jpg">

Adding such a Button is possible with this Plugin.
To enable this Feature, you need to pass `true` for **requestWithProvidesAppNotificationSettings** when you [request the Permission](#grantpermission).

You then need to subscribe to `onOpenSettings` and open your apps notification settings page.

## Data messages
FCM data messages are sent as an arbitrary k/v structure and by default are passed to the app for it to handle them.

**NOTE:** FCM data messages **cannot** be sent from the Firebase Console - they can only be sent via the FCM APIs.

### Data message notifications
This plugin enables a data message to be displayed as a system notification.
To have the app display a notification when the data message arrives, you need to set the `notification_foreground` key in the `data` section.
You can then set a `notification_title` and `notification_body`, for example:

```json
{
  "name": "my_data",
  "data" : {
    "notification_foreground": "true",
    "notification_body" : "Notification body",
    "notification_title": "Notification title",
    "foo" : "bar"
  }
}
```

Additional platform-specific notification options can be set using the additional keys below (which are only relevant if the `notification_foreground` key is set).

Note: [foreground notification messages](#foreground-notifications) can also make use of these keys.

#### Android data message notifications
On Android:
- Data messages that arrive while your app is running in the foreground or running in the background will be immediately passed to the `onMessageReceived()` Javascript handler in the Webview.
- Data messages (not containing notification keys) that arrive while your app is **not running** will be passed to the `onMessageReceived()` Javascript handler when the app is next launched.
- Data messages containing notification keys that arrive while your app is running or **not running** will be displayed as a system notification.

The following Android-specific keys are supported and should be placed inside the `data` section:

- `notification_android_id` - Identifier used to replace existing notifications in the notification drawer
    - If not specified, each request creates a new notification.
    - If specified and a notification with the same tag is already being shown, the new notification replaces the existing one in the notification drawer.
- `notification_android_body_html` - If is passed, the body of a notification is processed as if it were html, you can use `<b>, <i> or <s>`
    - If not specified, the body of the notification will be processed as plain text.
- `notification_android_icon` - name of a [custom notification icon](#android-custom-notification-icons) in the drawable resources
    - if not specified, the plugin will use the default `notification_icon` if it exists; otherwise the default app icon will be displayed
    - if a [large icon](#android-large-notification-icon) has been defined, it will also be displayed in the system notification.
- `notification_android_color` - the [color accent](#android-notification-color) to use for the small notification icon
    - if not specified, the default color accent will be used
- `notification_android_image` - Specifies the image notification
    - if not specified, the notification will not show any image
- `notification_android_image_type` - Specifies the image notification type
    - Possible values:
        - `square` - The image is displayed in the default format.
        - `circle` - This notification displays the image in circular format.
        - `big_picture` - Displays the image like `square` type, but the notification can be expanded and show the image in a big picture, example: https://developer.android.com/training/notify-user/expanded#image-style
    - Defaults to `square` if not specified.
- `notification_android_channel_id` - ID of the [notification channel](#android-notification-channels) to use to display the notification
    - Only applies to Android 8.0 and above
    - If not specified, the [default notification channel](#default-android-channel-properties) will be used.
        - You can override the default configuration for the default notification channel using [setDefaultChannel](#setdefaultchannel).
    - You can create additional channels using [createChannel](#createchannel).
- `notification_android_priority` - Specifies the notification priority
    - Possible values:
        - `2` - Highest notification priority for your application's most important items that require the user's prompt attention or input.
        - `1` - Higher notification priority for more important notifications or alerts.
        - `0` - Default notification priority.
        - `-1` - Lower notification priority for items that are less important.
        - `-2` - Lowest notification priority. These items might not be shown to the user except under special circumstances, such as detailed notification logs.
    - Defaults to `2` if not specified.
- `notification_android_visibility` - Specifies the notification visibility
    - Possible values:
        - `1` - Show this notification in its entirety on all lockscreens.
        - `0` - Show this notification on all lockscreens, but conceal sensitive or private information on secure lockscreens.
        - `-1` - Do not reveal any part of this notification on a secure lockscreen.
    - Defaults to `1` if not specified.

The following keys only apply to Android 7 and below.
On Android 8 and above they will be ignored - the `notification_android_channel_id` property should be used to specify a [notification channel](#android-notification-channels) with equivalent settings.

- `notification_android_sound` - name of a sound resource to play as the [notification sound](#android-notification-sound)
    - if not specified, no sound is played
    - `default` plays the default device notification sound
    - otherwise should be the name of an `.mp3` file in the `/res/raw` directory, e.g. `my_sound.mp3` => `"sounds": "my_sound"`
- `notification_android_lights` - color and pattern to use to blink the LED light
    - if not defined, LED will not blink
    - in the format `ARGB, time_on_ms, time_off_ms` where
        - `ARGB` is an ARGB color definition e.g. `#ffff0000`
        - `time_on_ms` is the time in milliseconds to turn the LED on for
        - `time_off_ms` is the time in milliseconds to turn the LED off for
    - e.g. `"lights": "#ffff0000, 250, 250"`
- `notification_android_vibrate` - pattern of vibrations to use when the message arrives
    - if not specified, device will not vibrate
    - an array of numbers specifying the time in milliseconds to vibrate
    - e.g. `"vibrate": "500, 200, 500"`

Example data message with Android notification keys:

```json
{
  "name": "my_data_message",
  "data" : {
    "notification_foreground": "true",
    "notification_body" : "Notification body",
    "notification_title": "Notification title",
    "notification_android_channel_id": "my_channel",
    "notification_android_priority": "2",
    "notification_android_visibility": "1",
    "notification_android_color": "#ff0000",
    "notification_android_icon": "coffee",
    "notification_android_image": "https://example.com/avatar.jpg",
    "notification_android_image_type": "circle",
    "notification_android_sound": "my_sound",
    "notification_android_vibrate": "500, 200, 500",
    "notification_android_lights": "#ffff0000, 250, 250"
  }
}
```

#### iOS data message notifications
On iOS:
- Data messages that arrive while your app is running in the foreground or running in the background will be immediately passed to the `onMessageReceived()` Javascript handler in the Webview.
- Data messages that arrive while your app is **not running** will **NOT be received by your app!**

The following iOS-specific keys are supported and should be placed inside the `data` section:

- `notification_ios_sound` - Sound to play when the notification is displayed
    - To play a custom sound, set the name of the sound file bundled with your app, e.g.  `"sound": "my_sound.caf"` - see [iOS notification sound](#ios-notification-sound) for more info.
    - To play the default notification sound, set `"sound": "default"`.
    - To display a silent notification (no sound), omit the `sound` key from the message.
- `notification_ios_badge` - Badge number to display on app icon on home screen.
- `notification_ios_image_jpg` - Specifies the `jpg` image notification, to use this you need to have configured the `NotificationService` - [Tutorial to set it up](docs/IOS_NOTIFICATION_SERVICE.md)
- `notification_ios_image_png` - Specifies the `png` image notification, to use this you need to have configured the `NotificationService` - [Tutorial to set it up](docs/IOS_NOTIFICATION_SERVICE.md)
- `notification_ios_image_gif` - Specifies the `gif` image notification, to use this you need to have configured the `NotificationService` - [Tutorial to set it up](docs/IOS_NOTIFICATION_SERVICE.md)

For example:
```json
{
  "name": "my_data",
  "data" : {
    "notification_foreground": "true",
    "notification_body" : "Notification body",
    "notification_title": "Notification title",
    "notification_ios_sound": "my_sound.caf",
    "notification_ios_badge": 1,
    "notification_ios_image_png": "https://example.com/avatar.png"
  }
}
```

## Custom FCM message handling
In some cases you may want to handle certain incoming FCM messages differently rather than with the default behaviour of this plugin.
Therefore this plugin provides a mechanism by which you can implement your own custom FCM message handling for specific FCM messages which bypasses handling of those messages by this plugin.
To do this requires you to write native handlers for Android & iOS which hook into the native code of this plugin.

### Android
You'll need to add a native class which extends the [`FirebasePluginMessageReceiver` abstract class](src/android/FirebasePluginMessageReceiver.java) and implements the `onMessageReceived()` and `sendMessage()` abstract methods.

### iOS
You'll need to add a native class which extends the [`FirebasePluginMessageReceiver` abstract class](src/ios/FirebasePluginMessageReceiver.h) and implements the `sendNotification()` abstract method.

# InApp Messaging
Engage active app users with contextual messages.
The SDK component is included in the plugin but no explicit plugin API calls are required to use inapp messaging.

See the [iOS](https://firebase.google.com/docs/in-app-messaging/get-started?platform=ios#send_a_test_message) and [Android](https://firebase.google.com/docs/in-app-messaging/get-started?platform=android#send_a_test_message) guides for how to send a test message.

# Google Tag Manager
Download your container-config json file from Tag Manager and add a `<resource-file>` node in your `config.xml`.

## Android
```xml
<platform name="android">
    <resource-file src="GTM-XXXXXXX.json" target="assets/containers/GTM-XXXXXXX.json" />
    ...
```

## iOS
```xml
<platform name="ios">
    <resource-file src="GTM-YYYYYYY.json" />
    ...
```

# API
The list of available methods for this plugin is described below.

## Notifications and data messages
The plugin is capable of receiving push notifications and FCM data messages.

See [Cloud messaging](#cloud-messaging) section for more.

### getToken
Get the current FCM token.
Null if the token has not been allocated yet by the Firebase SDK.

**Parameters**:
- {function} success - callback function which will be passed the {string} token as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.getToken(function(fcmToken) {
    console.log(fcmToken);
}, function(error) {
    console.error(error);
});
```
Note that token will be null if it has not been established yet.

### getId
Get the app instance ID (an constant ID which persists as long as the app is not uninstalled/reinstalled).
Null if the ID has not been allocated yet by the Firebase SDK.

**Parameters**:
- {function} success - callback function which will be passed the {string} ID as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.getId(function(appInstanceId) {
    console.log(appInstanceId);
}, function(error) {
    console.error(error);
});
```
Note that token will be null if it has not been established yet.

### onTokenRefresh
Registers a handler to call when the FCM token changes.
This is the best way to get the token as soon as it has been allocated.
This will be called on the first run after app install when a token is first allocated.
It may also be called again under other circumstances, e.g. if `unregister()` is called or Firebase allocates a new token for other reasons.
You can use this callback to return the token to you server to keep the FCM token associated with a given user up-to-date.

**Parameters**:
- {function} success - callback function which will be passed the {string} token as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.onTokenRefresh(function(fcmToken) {
    console.log(fcmToken);
}, function(error) {
    console.error(error);
});
```

### getAPNSToken
iOS only.
Get the APNS token allocated for this app install.
Note that token will be null if it has not been allocated yet.

**Parameters**:
- {function} success - callback function which will be passed the {string} APNS token as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.getAPNSToken(function(apnsToken) {
    console.log(apnsToken);
}, function(error) {
    console.error(error);
});
```

### onApnsTokenReceived
iOS only.
Registers a handler to call when the APNS token is allocated.
This will be called once when remote notifications permission has been granted by the user at runtime.

**Parameters**:
- {function} success - callback function which will be passed the {string} token as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.onApnsTokenReceived(function(apnsToken) {
    console.log(apnsToken);
}, function(error) {
    console.error(error);
});
```

### onOpenSettings
iOS only
Registers a callback function to invoke when the AppNotificationSettingsButton is tapped by the user

**Parameters**:
- {function} success - callback function which will be invoked without any argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.onOpenSettings(function() {
    console.log("Redirect to App Notification Settings Page here");
}, function(error) {
    console.error(error);
});
```

### onMessageReceived
Registers a callback function to invoke when:
- a notification or data message is received by the app
- a system notification is tapped by the user

**Parameters**:
- {function} success - callback function which will be passed the {object} message as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.onMessageReceived(function(message) {
    console.log("Message type: " + message.messageType);
    if(message.messageType === "notification"){
        console.log("Notification message received");
        if(message.tap){
            console.log("Tapped in " + message.tap);
        }
    }
    console.dir(message);
}, function(error) {
    console.error(error);
});
```

The `message` object passed to the callback function will contain the platform-specific FCM message payload along with the following keys:
- `messageType=notification|data` - indicates if received message is a notification or data message
- `tap=foreground|background` - set if the call to `onMessageReceived()` was initiated by user tapping on a system notification.
    - indicates if the system notification was tapped while the app was in the foreground or background.
    - not set if no system notification was tapped (i.e. message was received directly from FCM rather than via a user tap on a system notification).

Notification message flow:

1. App is in foreground:
    a. By default, when a notification message arrives the app receives the notification message payload in the `onMessageReceived` JavaScript callback without any system notification on the device itself.
    b. If the `data` section contains the `notification_foreground` key, the plugin will display a system notification while in the foreground.
2. App is in background:
    a. User receives the notification message as a system notification in the device notification bar
    b. User taps the system notification which launches the app
    b. User receives the notification message payload in the `onMessageReceived` JavaScript callback

Data message flow:

1. App is in foreground:
    a. By default, when a data message arrives the app receives the data message payload in the `onMessageReceived` JavaScript callback without any system notification on the device itself.
    b. If the `data` section contains the `notification_foreground` key, the plugin will display a system notification while in the foreground.
2. App is in background:
    a. The app receives the data message in the `onMessageReceived` JavaScript callback while in the background
    b. If the data message contains the [data message notification keys](#data-message-notifications), the plugin will display a system notification for the data message while in the background.

### grantPermission
Grant run-time permission to receive push notifications (will trigger user permission prompt).
iOS & Android 13+ (Android <= 12 will always return true).

On Android, the `POST_NOTIFICATIONS` permission must be added to the `AndroidManifest.xml` file by inserting the following into your `config.xml` file:

```xml
<config-file target="AndroidManifest.xml" parent="/*">
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
</config-file>
```

**Parameters**:
- {function} success - callback function which will be passed the {boolean} permission result as an argument
- {function} error - callback function which will be passed a {string} error message as an argument
- {boolean} requestWithProvidesAppNotificationSettings - (**iOS12+ only**) indicates if app provides AppNotificationSettingsButton

```javascript
FirebasePlugin.grantPermission(function(hasPermission){
    console.log("Notifications permission was " + (hasPermission ? "granted" : "denied"));
});
```

### grantCriticalPermission
Grant critical permission to receive critical push notifications (will trigger additional prompt).
iOS 12.0+ only (Android will always return true).

**Parameters**:
- {function} success - callback function which will be passed the {boolean} permission result as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

**Critical push notifications require a special entitlement that needs to be issued by Apple.**

```javascript
FirebasePlugin.grantCriticalPermission(function(hasPermission){
    console.log("Critical notifications permission was " + (hasPermission ? "granted" : "denied"));
});
```

### hasPermission
Check permission to receive push notifications and return the result to a callback function as boolean.
On iOS, returns true if runtime permission for remote notifications is granted and enabled in Settings.
On Android, returns true if global remote notifications are enabled in the device settings and (on Android 13+) runtime permission for remote notifications is granted.

**Parameters**:
- {function} success - callback function which will be passed the {boolean} permission result as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.hasPermission(function(hasPermission){
    console.log("Permission is " + (hasPermission ? "granted" : "denied"));
});
```

### hasCriticalPermission
Check permission to receive critical push notifications and return the result to a callback function as boolean.
iOS 12.0+ only (Android will always return true).

**Critical push notifications require a special entitlement that needs to be issued by Apple.**

**Parameters**:
- {function} success - callback function which will be passed the {boolean} permission result as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.hasCriticalPermission(function(hasPermission){
    console.log("Permission to send critical push notifications is " + (hasPermission ? "granted" : "denied"));
});
```

### unregister
Unregisters from Firebase Cloud Messaging by deleting the current FCM device token.
Use this to stop receiving push notifications associated with the current token.
e.g. call this when you logout user from your app.
By default, a new token will be generated as soon as the old one is removed.
To prevent a new token being generated, be sure to disable autoinit using [`setAutoInitEnabled()`](#setautoinitenabled) before calling [`unregister()`](#unregister).

You can disable autoinit on first run and therefore prevent an FCM token being allocated by default (allowing user opt-in) by setting the `FIREBASE_FCM_AUTOINIT_ENABLED` plugin variable at plugin installation time:

    cordova plugin add cordova-plugin-reteno-firebase --variable FIREBASE_FCM_AUTOINIT_ENABLED=false

**Parameters**: None

```javascript
FirebasePlugin.unregister();
```

### isAutoInitEnabled
Indicates whether autoinit is currently enabled.
If so, new FCM tokens will be automatically generated.

**Parameters**:
- {function} success - callback function which will be passed the {boolean} result as an argument
- {function} error - callback function which will be passed a {string} error message as an argument


```javascript
FirebasePlugin.isAutoInitEnabled(function(enabled){
    console.log("Auto init is " + (enabled ? "enabled" : "disabled"));
});

```

### setAutoInitEnabled
Sets whether to autoinit new FCM tokens.
By default, a new token will be generated as soon as the old one is removed.
To prevent a new token being generated, by sure to disable autoinit using [`setAutoInitEnabled()`](#setautoinitenabled) before calling [`unregister()`](#unregister).

**Parameters**:
- {boolean} enabled - set true to enable, false to disable
- {function} success - callback function to call on successful execution of operation.
- {function} error - callback function which will be passed a {string} error message as an argument


```javascript
FirebasePlugin.setAutoInitEnabled(false, function(){
    console.log("Auto init has been disabled ");
    FirebasePlugin.unregister();
});

```

### setBadgeNumber
iOS only.
Set a number on the icon badge:

**Parameters**:
- {integer} badgeNumber - number to set for the app badge

```javascript
FirebasePlugin.setBadgeNumber(3);
```

Set 0 to clear the badge
```javascript
FirebasePlugin.setBadgeNumber(0);
```

Note: this function is no longer available on Android

### getBadgeNumber
iOS only.
Get icon badge number:

**Parameters**:
- {function} success - callback function which will be passed the {integer} current badge number as an argument

```javascript
FirebasePlugin.getBadgeNumber(function(n) {
    console.log(n);
});
```

Note: this function is no longer available on Android

### clearAllNotifications
Clear all pending notifications from the drawer:

**Parameters**: None

```javascript
FirebasePlugin.clearAllNotifications();
```

### subscribe
Subscribe to a topic.

Topic messaging allows you to send a message to multiple devices that have opted in to a particular topic.

**Parameters**:
- {string} topicName - name of topic to subscribe to
- {function} success - callback function which will be call on successful subscription
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.subscribe("latest_news", function(){
    console.log("Subscribed to topic");
}, function(error){
     console.error("Error subscribing to topic: " + error);
});
```

### unsubscribe
Unsubscribe from a topic.

This will stop you receiving messages for that topic

**Parameters**:
- {string} topicName - name of topic to unsubscribe from
- {function} success - callback function which will be call on successful unsubscription
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.unsubscribe("latest_news", function(){
    console.log("Unsubscribed from topic");
}, function(error){
     console.error("Error unsubscribing from topic: " + error);
});
```

### createChannel
Android 8+ only.
Creates a custom channel to be used by notification messages which have the channel property set in the message payload to the `id` of the created channel:
- For background (system) notifications: `android.notification.channel_id`
- For foreground/data notifications:  `data.notification_android_channel_id`

For each channel you may set the sound to be played, the color of the phone LED (if supported by the device), whether to vibrate and set vibration pattern (if supported by the device), importance and visibility.
Channels should be created as soon as possible (on program start) so notifications can work as expected.
A default channel is created by the plugin at app startup; the properties of this can be overridden see [setDefaultChannel](#setdefaultchannel)

Calling on Android 7 or below or another platform will have no effect.

**Parameters**:
- {object} - channel configuration object (see below for object keys/values)
- {function} success - callback function which will be call on successful channel creation
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
// Define custom  channel - all keys are except 'id' are optional.
var channel  = {
    // channel ID - must be unique per app package
    id: "my_channel_id",

    // Channel description. Default: empty string
    description: "Channel description",

    // Channel name. Default: empty string
    name: "Channel name",

    //The sound to play once a push comes. Default value: 'default'
    //Values allowed:
    //'default' - plays the default notification sound
    //'ringtone' - plays the currently set ringtone
    //'false' - silent; don't play any sound
    //filename - the filename of the sound file located in '/res/raw' without file extension (mysound.mp3 -> mysound)
    sound: "mysound",

    //Vibrate on new notification. Default value: true
    //Possible values:
    //Boolean - vibrate or not
    //Array - vibration pattern - e.g. [500, 200, 500] - milliseconds vibrate, milliseconds pause, vibrate, pause, etc.
    vibration: true,

    // Whether to blink the LED
    light: true,

    //LED color in ARGB format - this example BLUE color. If set to -1, light color will be default. Default value: -1.
    lightColor: parseInt("FF0000FF", 16).toString(),

    //Importance - integer from 0 to 4. Default value: 4
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

    // Optionally specify the usage type of the notification. Defaults to USAGE_NOTIFICATION_RINGTONE ( =6)
    // For a list of all possible usages, see https://developer.android.com/reference/android/media/AudioAttributes.Builder#setUsage(int)

    usage: 6,
    // Optionally specify the stream type of the notification channel.
    // For a list of all possible values, see https://developer.android.com/reference/android/media/AudioAttributes.Builder#setLegacyStreamType(int)
    streamType: 5,
};

// Create the channel
FirebasePlugin.createChannel(channel,
function(){
    console.log('Channel created: ' + channel.id);
},
function(error){
   console.log('Create channel error: ' + error);
});
```

Example FCM v1 API notification message payload for invoking the above example channel:

```json

{
 "notification":
 {
      "title":"Notification title",
      "body":"Notification body"
 },
 "android": {
     "notification": {
       "channel_id": "my_channel_id"
     }
   }
}

```

If your Android app plays multiple sounds or effects, it's a good idea to create a channel for each likely combination. This is because once a channel is created you cannot override sounds/effects.
IE, expanding on the createChannel example:
```javascript
let soundList = ["train","woop","clock","radar","sonar"];
for (let key of soundList) {
    let name = "yourchannelprefix_" + key;
    channel.id = name;
    channel.sound = key;
    channel.name = "Your description " + key;

    // Create the channel
    window.FirebasePlugin.createChannel(channel,
        function(){
            console.log('Notification Channel created: ' + channel.id + " " + JSON.stringify(channel));
        },
        function(error){
            console.log('Create notification channel error: ' + error);
        });
}
```

Note, if you just have one sound / effect combination that the user can customise, just use setDefaultChannel when any changes are made.


### setDefaultChannel
Android 8+ only.
Overrides the properties for the default channel.
The default channel is used if no other channel exists or is specified in the notification.
Any options not specified will not be overridden.
Should be called as soon as possible (on app start) so default notifications will work as expected.
Calling on Android 7 or below or another platform will have no effect.

**Parameters**:
- {object} - channel configuration object
- {function} success - callback function which will be call on successfully setting default channel
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
var channel = {
  id: "my_default_channel",
  name: "My Default Name",
  description: "My Default Description",
  sound: "ringtone",
  vibration: [500, 200, 500],
  light: true,
  lightColor: parseInt("FF0000FF", 16).toString(),
  importance: 4,
  badge: false,
  visibility: -1
};

FirebasePlugin.setDefaultChannel(channel,
function(){
    console.log('Default channel set');
},
function(error){
   console.log('Set default channel error: ' + error);
});
```

### Default Android Channel Properties
The default channel is initialised at app startup with the following default settings:

```json
{
    id: "fcm_default_channel",
    name: "Default",
    description: "",
    sound: "default",
    vibration: true,
    light: true,
    lightColor: -1,
    importance: 4,
    badge: true,
    visibility: 1
}
```

### deleteChannel
Android 8+ only.
Removes a previously defined channel.
Calling on Android 7 or below or another platform will have no effect.

**Parameters**:
- {string} - id of channel to delete
- {function} success - callback function which will be call on successfully deleting channel
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.deleteChannel("my_channel_id",
function(){
    console.log('Channel deleted');
},
function(error){
   console.log('Delete channel error: ' + error);
});

```

### listChannels
Android 8+ only.
Gets a list of all channels.
Calling on Android 7 or below or another platform will have no effect.

**Parameters**:
- {function} success - callback function which will be passed the {array} of channel objects as an argument
- {function} error - callback function which will be passed a {string} error message as an argument

```javascript
FirebasePlugin.listChannels(
function(channels){
     if(typeof channels == "undefined")
          return;

     for(var i=0;i<channels.length;i++)
     {
          console.log("ID: " + channels[i].id + ", Name: " + channels[i].name);
     }
},
function(error){
   alert('List channels error: ' + error);
});

```