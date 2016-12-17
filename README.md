# log-log
Easy and friendly logging

## Installation
```bash
$ npm install log-log
```

## Examples
Ready to go
```js
var LogLog = require('log-log');
var log = new LogLog();

log.debug("Debug some stuff");
```
Simple demo
```js
var log = new LogLog({applicationName: "Demo", color: LogLog.COLORS.CYAN});

log.debug("Hello!");

log.changeColor(LogLog.COLORS.DEFAULT);

log.error("Sample error");
log.warning("Sample warning");
log.success("Sample success");
log.test("Sample test");
```
![example](https://i.gyazo.com/a3cca4a6edba039d375aee36b58dcdc5.png)

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