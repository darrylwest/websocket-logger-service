#!/usr/bin/env node

var config = require( __dirname + '/../config.json'),
    LoggerService = require( __dirname + '/../index'),
    service;
    
// run in background...
config.daemon = true;

service = LoggerService.createInstance( config );
service.start();

