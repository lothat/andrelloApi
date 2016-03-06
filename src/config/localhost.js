(function config()
{
	'use strict';

	module.exports =
	{
		environment: 'development',
		server :
		{
			protocol: 'http',
			port: '3000',
			okOrigins:
			[
				'http://localhost',
				'http://localhost:9000'
			]
		},
		logger :
		{
			console: true,
			file :
			{
				filename: 'logs/errorlog.txt',
				maxSize: 1024*1024,
				maxFiles: 10,
				prettyPrint: true,
				tailable: true
			},
			mongodb :
			{
				db: 'mongodb://localhost/Andrello',
				collection: 'errorlog'
			}
		},
		mongo :
		{
			hostname: 'localhost',
			database: 'Andrello'// ,
			// auth : 'eyJ1c2VyaWQiOiJvcHNkc2hiIiwicGFzc3dvcmQiOiJQYSQkdzByZCIsInNvdXJjZSI6ImFkbWluIn0='
		}
	};
})();
