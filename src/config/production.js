(function config()
{
	'use strict';

	module.exports =
	{
		environment: 'production',
		server :
		{
			protocol: 'https',
			port: '443',
			okOrigins:
			[
			]
		},
		mongo :
		{
			hostname: '',
			database: 'EDVDashboard'
		}
	};
})();
