# randomflickerimg

## Synopsis

A standalone JavaScript Knockout Component that sends a request to the public photos feed API and displays a single picture. A new picture is displayed after X number of seconds as configured for the component.

![alt tag](https://raw.githubusercontent.com/pintocarlos/randomflickerimg/master/src/demo1.png)

## Code Example

Sample usage can be found in: https://github.com/pintocarlos/randomflickerimg/blob/master/src/test.html

The component has been registered with the name: `random-flicker-image` and can be used directly in the markup as follows:
```html
<random-flicker-image params="{pollingSecondsInterval : 1}"></random-flicker-image>
```

The component inside of a sample could be included like this:

```html
<html>
<head>
<link rel="stylesheet" href="dist/styles/styles-min.css">
</head>
<body>

<random-flicker-image params="{pollingSecondsInterval : 1}"></random-flicker-image>

<script type='text/javascript' src='dist/scripts/jquery-2.2.0.min.js'></script>
<script type='text/javascript' src='dist/scripts/knockout-3.4.0.js'></script>
<script type='text/javascript' src='dist/scripts/source-min.js'></script>
<script>ko.applyBindings();</script>
</body>
</html>
```

## Installation

To run the example app using this component perform the following steps:

`git clone https://github.com/pintocarlos/randomflickerimg.git`

`cd randomflickerimg`

`npm install`

`gulp`

## API Reference

The component takes a single parameter called: `pollingSecondsInterval` which is used to determine the number of seconds until displaying a new image.

## Implementation Details

The component makes one single call to the flicker API and keeps in memory all of the urls returned. These urls are parsed and made ready to use for when the timer is up to display a new image. This allows the component to simply update the image url to point to a new one instead of having to hit the flicker api to get a new image which would take a lot longer (new roundtrip API ajax call, parsing it, hitting image url, etc).
When the image urls available run out, the component hits the API again asynchronously to populate itself with more image urls.
A placeholder image is used when the component runs out of images to show. 

## Tests

Tests coverage written using Jasmine can be found in:
 - https://github.com/pintocarlos/randomflickerimg/blob/master/spec/RandomFlickerImageComponent.spec.js

 To run the tests:
 `gulp` to start the server
 
 Go to: `localhost:8080/src/SpecRunner.html`

![alt tag](https://raw.githubusercontent.com/pintocarlos/randomflickerimg/master/src/tests.png)


## Dependencies

This project requires:
- jquery.js >2.0
- knockout.js >3.0
- Create your own Flicker API account and get an API key

## License

MIT License 2016
