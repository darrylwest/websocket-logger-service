/**
 * @class LoggerService
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/30/14
 */
var dash = require('lodash'),
    uuid = require('node-uuid'),
    MessageHub = require('node-messaging-commons');

var LoggerService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        hub = options.hub,
        channel = options.channel || LoggerService.DEFAULT_CHANNEL,
        producer = options.producer,
        id = options.appkey;

    /**
     * start the logger service to begin responding to client requests
     */
    this.start = function() {
        log.info('start the logger service');

        service.createMessageProducer();
    };

    this.createMessageProducer = function() {
        if (!producer) {
            log.info('create the logger message producer, id: ', id);

            producer = hub.createProducer( channel, id );
            producer.onMessage( service.messageHandler );
        }

        return producer;
    };

    this.messageHandler = function(msg) {
        if (msg.ssid !== id) {
            log.info('<< ', JSON.stringify( msg ));

            // log the message using ssid
            var request = msg.message,
                action = request.action;

            if (action && typeof service[ action ] === 'function') {
                service[ action ]( request );
            }
        }
    };

    this.openSession = function(request) {
        log.info('open session for request: ', JSON.stringify( request ));

        // parse the request
    };

    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
    if (!hub) throw new Error('server must be constructed with a message hub');
    if (!id) throw new Error('server must be constructed with an appkey');
};

LoggerService.DEFAULT_CHANNEL = '/logger';

LoggerService.createInstance = function(config) {
    'use strict';

    var logManager;

    if (!config) throw new Error('must be constructed with a config object');
    if (!config.port) throw new Error('server must be constructed with a port');
    if (!config.hubName) throw new Error('server must be constructed with a hub name');

    // don't damage the original
    config = dash.clone( config );

    logManager = require('simple-node-logger').createLogManager();

    var createLoggerService = function() {
        var opts = dash.clone( config );

        opts.log = logManager.createLogger('LoggerService');

        return new LoggerService( opts );
    };

    if (!config.hub) {
        config.hub = MessageHub.createInstance( config );
    }

    return createLoggerService( config );
};

module.exports = LoggerService;

