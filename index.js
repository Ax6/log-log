/**
 * Created by aaronrusso on 16/12/2016.
 */
module.exports = Logs;
var util = require('util');
var events = require('events');
var chalk = require('chalk');

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
    this.applicationName = "";
    this.color = Logs.COLORS.DEFAULT;
    this.dim = false;
    if (logOptions && logOptions.hasOwnProperty("applicationName")) {
        this.applicationName = logOptions.applicationName;
    }
    if (logOptions && logOptions.hasOwnProperty("color") && this._colorExist(logOptions.color)) {
        this.changeColor(logOptions.color.toLowerCase());
    }
    if (logOptions && logOptions.hasOwnProperty("dim")) {
        this.dim = logOptions.dim;
    }
    this._debugFlag = true;
    this.level = 0;
    events.EventEmitter.call(this);
}

util.inherits(Logs, events.EventEmitter);

Logs.HIGH_DEPTH = 0;
Logs.MEDIUM_DEPTH = 1;
Logs.LOW_DEPTH = 2;

Logs.COLORS = {
    DEFAULT: null,
    RED: "red",
    GREEN: "green",
    YELLOW: "yellow",
    BLUE: "blue",
    MAGENTA: "magenta",
    CYAN: "cyan",
    WHITE: "white",
    GRAY: "gray",
    BLACK: "black"
};

/**
 * Log error
 * @param {String|Object} error
 */
Logs.prototype.error = function (error) {
    this._msg(error, chalk.bgRed.black(" ERROR ") + " ");
};

/**
 * Log warning
 * @param {String|Object} warning
 */
Logs.prototype.warning = function (warning) {
    this._msg(warning, chalk.bgYellow.black(" WARNING ") + " ");
};

/**
 * Log success
 * @param {String|Object} success
 */
Logs.prototype.success = function (success) {
    this._msg(success, chalk.bgGreen.black(" SUCCESS ") + " ");
};

/**
 * Log message
 * @param {String|Object} msg
 * @param {Number} [level] Define debug depth to consider
 */
Logs.prototype.debug = function (msg, level) {
    if (this.isDebugEnabled() && (!level || level <= this.level)) {
        this._msg(msg);
    }
};

/**
 * Log test
 * @param {String|Object} msg
 */
Logs.prototype.test = function (msg) {
    this._msg(msg, chalk.cyan.bold("~TEST~ "));
};

/**
 * Change color
 * @param {String} color
 */
Logs.prototype.changeColor = function (color) {
    if (this._colorExist(color)) {
        this.color = color;
    } else {
        this.color = null;
    }
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

Logs.prototype._msg = function (_msg, _preMsg) {
    if (!_preMsg) {
        _preMsg = "";
    }
    var msg = chalk.dim(this._getNiceDate()) + this._getFormattedName() + this._getFormattedMessage(_msg);
    console.log(_preMsg + (!this.dim ? msg : chalk.dim(msg)));
};

Logs.prototype._getFormattedMessage = function (_msg) {
    if (typeof _msg === "object") {
        _msg = JSON.stringify(util.inspect(_msg));
    }
    return (this.color ? chalk[this.color](_msg) : _msg);
};

Logs.prototype._getFormattedName = function () {
    if (this.applicationName) {
        return " <" + this.applicationName + "> ";
    } else {
        return "";
    }
};

Logs.prototype._colorExist = function (color) {
    for (var existingColor in Logs.COLORS) {
        if (Logs.COLORS[existingColor] === color) {
            return true;
        }
    }
    return false;
};

Logs.prototype._getNiceDate = function (mode, myDate) {
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

