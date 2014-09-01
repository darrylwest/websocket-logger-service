# Websocket Logger Service
- - -

A real-time websocket logging service to enable shared/remote browser debugging

[![NPM version](https://badge.fury.io/js/websocket-logger-service.svg)](http://badge.fury.io/js/websocket-logger-service) [![Build Status](https://travis-ci.org/darrylwest/websocket-logger-service.svg?branch=develop)](https://travis-ci.org/darrylwest/websocket-logger-service) [![Dependency Status](https://david-dm.org/darrylwest/websocket-logger-service.svg)](https://david-dm.org/darrylwest/websocket-logger-service)

## Introduction

The Websocket Logger Service...

## Installation

### Server

~~~
	npm install websocket-logger-service --save
~~~

### Client/Browser

The project includes a "browser" folder with enough to create a websocket logger.  Here is a short snippet of the browser code:

~~~
<!DOCTYPE html>
<html>
<head>
    <title>websocket logger page</title>
    <script src="browser-messaging-commons.js"></script>
    <script src="messaging-config.js"></script>
    <script src="LoggerClient.js"></script>
    <script>
        var client;

        var start = function() {
            var options = readMessagingConfig();
            console.log( JSON.stringify( options ));

            client = LoggerClient.createInstance( options );

            client.start();

            window.client = client;
        };

    </script>
</head>
~~~

### Server

The project includes a "bin" folder with a run/start/stop and status scripts.  The run script is the same as start, but it runs in the forgound.  It looks something like this:

~~~
	var config = require('./config.json'),
    	LoggerService = require('websocket-logger-service'),
        service = LoggerService.createInstance( config );

    service.start();
~~~

If you have a message service running on this port, then this is enough to start the public producer channel that responds to spell logger channel requests.  To create and start a generic message service, see [this commons project](https://www.npmjs.org/package/node-messaging-commons).

## Configuration

Here is a sample configuration file.

~~~
{
    "port":29169,
    "hubName":"/MessageHub",
    "channels":[ "/logger" ],
    "appkey":"e5f88edb-8370-4a48-a1c9-2579e3209541"
}
~~~

You would want to have a proxy and preferrably HTTPS in front of this but port 29169 works for development.

## Tests

Unit tests include should/specs, jshint and validate-package.  Tests can be run from the command line with this:

~~~
    make test

    or

    make watch

    or

    grunt mochaTest jshint validate-package
~~~

- - -
<p><small><em>Copyright © 2014, rain city software | Version 0.90.10</em></small></p>
