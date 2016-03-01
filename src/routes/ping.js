(function ping()
{
	'use strict';

	var ctrl = require('../controllers/ping');

	module.exports = pingRouter;

	function pingRouter(router)
	{
		router.get('/ping', ctrl.pingServer);
		router.get('/serverStatus', ctrl.serverStatus);
	}
})();
