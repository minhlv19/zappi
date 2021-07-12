fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
### android_internal
```
fastlane android_internal
```
Build and push a new internal test build to the Play Store
### build
```
fastlane build
```
Build a version of the app
### ibn
```
fastlane ibn
```
Increment build number and push to repository - Build number in this case is the android version code

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
