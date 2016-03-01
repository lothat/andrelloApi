(function config()
{
	'use strict';

	module.exports =
	{
		environment: 'development',
		server :
		{
			protocol: 'https',
			port: '443',
			okOrigins:
			[
				'https://localhost',
				'https://localhost:9000',
				'http://localhost',
				'http://localhost:9000',
				'https://ec2-52-2-13-35.compute-1.amazonaws.com',
				'https://ec2-52-2-13-35.compute-1.amazonaws.com/Dashboard:443'
			]
		},
		mongo :
		{
			hostname: 'ec2-52-2-13-35.compute-1.amazonaws.com',
			database: 'EDVDashboard'// ,
			// auth : 'eyJ1c2VyaWQiOiJvcHNkc2hiIiwicGFzc3dvcmQiOiJQYSQkdzByZCIsInNvdXJjZSI6ImFkbWluIn0='
		}
	};
})();
