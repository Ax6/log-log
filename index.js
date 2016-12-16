/**
 * Created by aaronrusso on 16/12/2016.
 */
module.exports = Logs;
var events = require("events");
var chalk = require("chalk");

/**
 * General purpose Logs class
 * @class Logs
 * @param {Object} logOptions
 * Identify logging options
 * Object can have the following structure (properties are optional)
 * {
 *  applicationName: String,
 *  color: String,
 *  dim: Boolean
 * }
 * @returns {Logs}
 */
function Logs(logOptions) {
    this.application = "";
    this.color = null;
    this.dim = false;
    if (logOptions.hasOwnProperty("applicationName")) {
        this.application = logOptions.applicationName;
    }
    if (logOptions.hasOwnProperty("color")) {
        this.color = logOptions.color;
    }
    if (logOptions.hasOwnProperty("dim")) {
        this.dim = logOptions.dim;
    }
    this._debugFlag = true;
    this.level = 0;
    events.EventEmitter.call(this);
}

require("util").inherits(Logs, events.EventEmitter);

Logs.HIGH_LEVEL = 0;
Logs.MEDIUM_LEVEL = 1;
Logs.LOW_LEVEL = 2;

/**
 * Log error
 * @param {String} error
 */
Logs.prototype.error = function (error) {
    this._msg(error, chalk.red.bold.underline("ERROR # "));
};

/**
 * Log warning
 * @param {String} warning
 */
Logs.prototype.warning = function (warning) {
    this._msg(warning, chalk.yellow.bold.underline("WARNING # "));
};

/**
 * Log message
 * @param {String} msg
 * @param {Number} [level] Define debug depth to consider
 */
Logs.prototype.debug = function (msg, level) {
    if (this.isDebugEnabled() && (!level || level <= this.level)) {
        this._msg(" " + msg);
    }
};

Logs.prototype.test = function (msg) {
    this._msg(msg, chalk.cyan.bold("~TEST~"));
};

/**
 * Set debug depth
 * @param {Number} level
 */
Logs.prototype.setDepthLevel = function (level) {
    if (!isNaN(level)) {
        this.level = level;
    }
};

Logs.prototype._msg = function (_msg, _preMsg) {
    if (!_preMsg) {
        _preMsg = "";
    }
    var msg = chalk.dim(this.getNiceDate()) + " <" + this.application + "> " + (this.color ? chalk[this.color](_msg) : _msg);
    console.log(_preMsg + (!this.dim ? msg : chalk.dim(msg)));
};

/**
 * Establish if debug is enabled
 * @returns {Boolean}
 */
Logs.prototype.isDebugEnabled = function () {
    return this._debugFlag;
};

/**
 * Enable debug messages
 */
Logs.prototype.enableDebug = function () {
    this._debugFlag = true;
};

/**
 * Disable debug messages
 */
Logs.prototype.disableDebug = function () {
    this._debugFlag = false;
};

Logs.prototype.getNiceDate = function (mode, myDate) {
    var date = new Date();
    if (myDate) {
        date = myDate;
    }
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    if (mode) {
        return year + "-" + month + "-" + day;
    } else {
        return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;
    }
};

