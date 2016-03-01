(function sample()
{
	'use strict';

	var ctrl = require('../controllers/sample');

	module.exports = sampleRouter;

	function sampleRouter(router)
	{
		router.get('/sample', ctrl.sampleList);
		router.put('/sample', ctrl.sampleUpdate);
	}
})();
