/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/30/14
 */
var should = require('chai').should(),
    dash = require('lodash'),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    LoggerService = require('../lib/LoggerService');

describe('LoggerService', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('LoggerService');
        opts.hub = {};
        opts.appkey = 'test-server';

        return opts;
    };

    describe('#instance', function() {
        var service = new LoggerService( createOptions()),
            methods = [
                'start',
                'createMessageProducer',
                'messageHandler',
                'openSession'
            ];

        it('should create an instance of LoggerService', function() {
            should.exist( service );
            service.should.be.instanceof( LoggerService );
        });

        it( 'should contain all known methods based on method count and type', function() {
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a('function');
            });
        });
    });
});
