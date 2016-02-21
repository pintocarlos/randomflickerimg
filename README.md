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
<link rel="stylesheet" href="styles/styles-min.css">
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

`git clone https://github.com/pintocarlos/randomflickerimg.git`

`cd randomflickerimg`

`npm install`

`gulp`

## API Reference

The component takes a single parameter called: `pollingSecondsInterval` which is used to determine the number of seconds until displaying a new image.

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

## License

MIT License 2016
