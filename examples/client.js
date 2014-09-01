#!/usr/bin/env node

var dash = require('lodash'),
    config = require( __dirname + '/../config.json' ),
    LoggerService = require( __dirname + '/../index' ),
    MessageHub = require( 'node-messaging-commons' ),
    hub = MessageHub.createInstance( config ),
    consumer = hub.createConsumer( LoggerService.DEFAULT_CHANNEL );

consumer.onMessage(function(msg) {
    if (msg.ssid === config.appkey) {
        console.log( msg );
    }
});

