#!/usr/bin/env node

var dash = require('lodash'),
    config = require( __dirname + '/../config.json' ),
    LoggerService = require( __dirname + '/../index' ),
    MessageHub = require( 'node-messaging-commons' ),
    hub = MessageHub.createInstance( config ),
    cid = 'logclient-' + Math.random().toString(20),
    consumer = hub.createConsumer( LoggerService.DEFAULT_CHANNEL),
    producer = hub.createProducer( '/' + cid );

consumer.onMessage(function(msg) {
    if (msg.ssid === config.appkey) {
        console.log( msg );

        // request to change log levels, shutdown, re-open session, etc...
    }
});

producer.onMessage(function(msg) {
    console.log('<< ', msg);
});

var requestSession = function() {
    var request = {
        cid:cid,
        action:'openSession'
    };

    console.log( '>> ', request );

    consumer.publish( request );
};

requestSession();