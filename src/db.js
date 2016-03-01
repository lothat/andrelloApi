(function db()
{
	'use strict';

	var mongoose = require('mongoose');
	var config = require('./config').mongo;
	var fs = require('fs');
	var path = require('path');

	var dbOptions = getConnectionOptions();
	var port = (config.port===undefined?27017:config.port);

	mongoose.connect(config.hostname, config.database, port, dbOptions);

	// CONNECTION EVENTS
	mongoose.connection.on('connected', onConnect);
	mongoose.connection.on('error', onError);
	mongoose.connection.on('disconnected', onDisconnect);

	// CAPTURE APP TERMINATION / RESTART EVENTS
	// for nodemon restarts
	mongoose.connection.once('SIGUSR2', nodemonRestart);
	mongoose.connection.on('SIGINT', onTermination);
	mongoose.connection.on('SIGTERM', onTermination);

	// LOAD SCHEMAS AND MODELS
	fs.readdirSync(path.join(__dirname,'models')).forEach(function requireFile(file)
	{
		require('./models/'+file);
	});

	// set default connection options, but let the config file override them
	function getConnectionOptions()
	{
		var opts = config.options;

		if (opts===undefined)
		{
			opts = {};
		}

		setSocketOptions(opts, 'server');
		setSocketOptions(opts, 'replSet');
		getAuthOptions(opts);

		if (config.user!==undefined && config.password!==undefined)
		{
			opts.user = config.user;
			opts.pass = config.pass;

			if (config.authSource!==undefined)
			{
				opts.auth =
				{
					authSource : config.authSource
				};
			}
		}

		return opts;
	}

	function setSocketOptions(opts, section)
	{
		if(opts[section]===undefined)
		{
			opts[section] = {};
		}

		if (opts[section].socketOptions===undefined)
		{
			opts[section].socketOptions = {};
		}

		if (opts[section].socketOptions.keepAlive===undefined)
		{
			opts[section].socketOptions.keepAlive = 1;
		}

		if (opts[section].socketOptions.connectTimeoutMS===undefined)
		{
			opts[section].socketOptions.connectTimeoutMS = 3000;
		}
	}

	function getAuthOptions(opts)
	{
		var auth=config.auth;

		if (auth!==undefined)
		{
			if ('string'===

typeof auth)
			{
				auth = JSON.parse(new Buffer(auth, 'base64').toString('utf8'));
			}

			else if ('object'===

typeof auth)
			{
				console.log('WARNING: unencoded auth data in configuration file');
			}

			if (auth.userid!==undefined && auth.password!==undefined)
			{
				opts.user = auth.userid;
				opts.pass = auth.password;

				if (auth.source!==undefined)
				{
					opts.auth =
					{
						authSource : auth.source
					};
				}
			}
		}
	}

	// To be called when process is restarted or terminated
	function gracefulShutdown(message, callback)
	{
		mongoose.connection.close(function closeCallback()
		{
			console.log('Mongoose disconnected through '+message);
			callback();
		});
	}

	function onConnect()
	{
		console.log('Mongoose connected to mongodb://' + config.hostname +
			(config.port!==undefined?(':'+config.port):'') + '/' + config.database +
			(dbOptions.user!==undefined?(' as '+dbOptions.user):''));
	}

	function onError(err)
	{
		console.log('Mongoose connection error:');
		console.log(err);
	}

	function onDisconnect()
	{
		console.log('Mongoose disconnected');
	}

	function onTermination()
	{
		gracefulShutdown('application terminated', exitCallback);
	}

	function nodemonRestart()
	{
		gracefulShutdown('nodemon restart', killCallback);
	}

	function exitCallback()
	{
		process.exit(0);
	}

	function killCallback()
	{
		process.kill(process.pid, 'SIGUSR2');
	}
})();
