(function ping()
{
	'use strict';

	/* Respond that the server is up
	 *
	 * /api/ping
	 */
	module.exports.pingServer = pingServer;
	module.exports.serverStatus = serverStatus;

	function pingServer(req, res)
	{
		res.status(200)
			.send('Server is up');
	}

	/* PUT the return the process object - will return the record if successful
	 *
	 * /api/serverStatus
	 */
	function serverStatus(req, res)
	{
		var pcs =
		{
			time: new Date(),
			title: process.title,
			pid: process.pid,
			uptime: process.uptime(),
			cwd: process.cwd(),
			argv: process.argv,
			env: process.env,
			hrtime: process.hrtime(),
			release: process.release,
			nodeVersion: process.version,
			versions: process.versions,
			platform: process.platform,
			arch: process.arch,
			execPath: process.execPath,
			execArgv: process.execArgv,
			memoryUsage: process.memoryUsage(),
			config: process.config
		};

		res.status(200)
			.json(pcs);
	}
})();
