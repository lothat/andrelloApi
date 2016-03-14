(function edvAPIserver()
{
	'use strict';

	var express = require('express');
	var config = require('./config');
	var http = require('http');
	var https = require('https');
	var path = require('path');
	var cors = require('cors');
	var fs = require('fs');
	var bodyParser =  require('body-parser');

	/* for logging */
	var winston = require('winston');

	var winstonMongodb = require('winston-mongodb');
	var expressWinston = require('express-winston');

	var db = require('./db');
	var router = require('./routes')(express);

	var app = express();
	var server;
	var sslOptions;

	var okOrigins = config.server.okOrigins;
	var corsOptions =
	{
		origin: function origin(origin, callback)
		{
			var originIsOk = (okOrigins.indexOf(origin) !== -1);

			originIsOk = !!1;

			callback(null, originIsOk);
		},
		methods: ['DELETE', 'GET','POST','PUT']
	};

	if (config.environment === 'production')
	{
		app.set('env','production');
	}

	/* TODO: Use helmet to set security configurations */
	app.disable('x-powered-by');
	app.set('port', config.server.port || 3000);

	if (config.server.protocol === 'https')
	{
		sslOptions =
		{
			pfx: fs.readFileSync('sslcert.pfx'),
			passphrase: 'password',

			// This is necessary only if using the client certificate authentication
			requestCert: false,
			isServer: true
		};
	}

	app.use(cors(corsOptions));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:false}));

	app.use('/api', router);

	// error handlers
	app.use(expressWinston.errorLogger(getErrorLoggerConfig()));
	app.use(errorHandler);

	if (config.server.protocol === 'https')
	{
		server = https.createServer(sslOptions, app);
	}

	else if (config.server.protocol === 'http')
	{
		server = http.createServer(app);
	}

	server.listen(app.get('port'), listenCallback);

	function listenCallback()
	{
		console.log('Express server listening on port ' + app.get('port'));
	}

	function getErrorLoggerConfig()
	{
		var transports = [];

		if (config.logger.console)
		{
			transports.push(new winston.transports.Console(
			{
				json: true,
				colorize: true
			}));
		}

		if (config.logger.file)
		{
			transports.push(new winston.transports.File(config.logger.file));
		}

		if (config.logger.mongodb)
		{
			transports.push(new winston.transports.MongoDB(config.logger.mongodb));
		}

		return {
			transports: transports
		};
	}

	function errorHandler(err, req, res, next)
	{
		if (res.headersSent)
		{
			return next(err);
		}

		res.status(500).json({ error: err });
	}
})();
