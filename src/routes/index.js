(function index()
{
	'use strict';

	var fs = require('fs');
	var path = require('path');

	module.exports = router;

	function router(express)
	{
		var router = express.Router();

		fs.readdirSync(__dirname).forEach(function requireFile(file)
		{
			if (file!=='index.js')
			{
				require('./'+file)(router);
			}
		});

		return router;
	}
})();
