## Installation

1. Follow `Step 1` described in iOS SDK setup guide: [link](https://docs.reteno.com/reference/ios#step-1-add-the-notification-service-extension)


2. Modify your cocoapod file to contain next dependencies:
```

target 'NotificationServiceExtension' do
  pod 'Reteno', '1.6.6'
  pod 'Sentry', '8.2.0', :modular_headers => true

end

target 'ExampleCordova' do
  ...
  pod 'Reteno', '1.6.6'
  pod 'Sentry', '8.2.0', :modular_headers => true
end

```

3. In RetenoPlugin.swift start SentrySDK with your parameters
```swift
override func pluginInitialize(){
  ...
  SentrySDK.start { options in
                    options.dsn = "your-url"
                    options.debug = true
                    options.enableAppHangTracking = true
                    options.enableFileIOTracing = true
        }
}

```
