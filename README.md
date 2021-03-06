# log-log
Easy and friendly logging with timestamp

## Installation
```bash
$ npm install log-log
```

## Examples
Ready to go
```js
var LogLog = require('log-log');
var log = LogLog.create();

log.debug("Debug some stuff");
```
Simple demo
```js
var log = LogLog.create({applicationName: "Demo", color: LogLog.COLORS.CYAN});

log.debug("Hello!");

log.changeColor(LogLog.COLORS.DEFAULT);

log.error("Sample error");
log.warning("Sample warning");
log.success("Sample success");
log.test("Sample test");
```
![example](https://i.gyazo.com/a3cca4a6edba039d375aee36b58dcdc5.png)

## Creating a new instance
### LogLog.create([logOptions])
 * `logOptions` Object used to pass a few logging options, all properties are optional
    * `applicationName` Name given to your `LogLog` instance, useful to distinguish classes and objects
    * `color` You can access available colors from `LogLog.COLORS` object
    * `dim` Default set to `false`, useful if you don't want logs to stand out too much

`create` will return a `Logs` instance. This object will have the following methods

## Methods
### debug(message[, depthLevel])
 * `message` {String | Object}
 * [`depthLevel`] {Number} Optional

When passing objects they get stringified

### error(message) | warning | success | test
 * `message` {String | Object}

When passing objects they get stringified

### disableDebug() | enableDebug()
Will affect only `.debug` messages

### isDebugEnabled()
Boolean returned

### setDepthLevel(level)
 * `level` {Number}

You can specify debug depth level in order to filter unwanted deep debug messages

### changeColor(color)
 * `color` {String}

You can access available colors from `LogLog.COLORS` object