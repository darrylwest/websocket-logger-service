/**
 * @class LoggerClient
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/01/14
 */
if (typeof require === 'function') {
    AbstractMessageClient = require('./AbstractMessageClient');
}

var LoggerClient = function(options) {
    'use strict';

    var client = this,
        log = options.log,
        channelName = '/logger',
        appkey = options.appkey, // the logger's ssid
        cid = Math.random().toString(20);

    AbstractMessageClient.extend( client, options );

    /**
     * open the public/private channels to begin exchanges
     */
    this.start = function() {
        log.info('open the logger channel: ', channelName);
        client.subscribe( channelName, client.loggerMessageHandler );
    };

    /**
     * the public access channel message handler; grab the current token and queue
     * the outgoing private message
     *
     * @param msg - a wrapped message request
     */
    this.loggerMessageHandler = function(msg) {

        if (msg.ssid === appkey) {
            log.info( JSON.stringify( msg ));
        }

        // client UI would push up to log table
    };

    if (!log) throw new Error('logger client must be constructed with a log');
};

LoggerClient.createInstance = function(opts) {
    'use strict';

    if (!opts) opts = {};

    opts.version = '2014.09.01';
    opts.log = RemoteLogger.createLogger('LoggerClient');

    return new LoggerClient( opts );
};

if (typeof module === 'object') {
    module.exports = LoggerClient;
}
