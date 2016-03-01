(function gulpfile()
{
	'use strict';

	var gulp		= require('gulp');
	var plugins		= require('gulp-load-plugins')({pattern:['gulp-*','gulp.*','del']});
	var noop		= plugins.util.noop;
	var args		= require('yargs').argv;
	var environ		= args.env?args.env:'local';

	var src = 'src';
	var paths;

	/*
	 * Task Definitions
	 */

	// cleanup tasks
	gulp.task('clean', cleanTask);
	gulp.task('cleanall', cleanAllTask);

	// linting tasks
	gulp.task('lint:scripts', lintScriptsTask);
	gulp.task('lint:config', lintConfigTask);
	gulp.task('lintall:config', lintAllConfig);
	gulp.task('lintall',
		gulp.parallel(
			'lintall:config',
			'lint:scripts'
		));

	// build tasks
	gulp.task('copy:config', copyConfigTask);
	gulp.task('copy:scripts', copyScriptsTask);
	gulp.task('build',
		gulp.series(
			'clean',
			'lintall',
			'copy:scripts',
			'copy:config'
		));

	// development server run tasks
	gulp.task('start:server', startServerTask);
	gulp.task('watch', watchTask);
	gulp.task('serve',
		gulp.series(
			'lintall',
			'copy:config',
			gulp.parallel(
				'start:server',
				'watch'
			)
		));
	gulp.task('restart:server', restartServerTask);
	gulp.task('default', gulp.series('serve'));

	paths =
	{
		scripts: [
			src + '/**/*.js',
			'!'+src+'/config/*.js',
			'!'+src+'/config.js'
		],
		config:
		{
			'localhost': src + '/config/localhost.js',
			'localdev': src + '/config/localdev.js',
			'development': src + '/config/development.js',
			'production': src + '/config/production.js'
		},
		dest:
		{
			'localdev': 'src',
			'localhost': 'src',
			'development': 'build',
			'production': 'dist'
		}
	};

	require('jshint-stylish');

	// validate and default environment
	switch (environ)
	{
		case 'local':
		{
			environ= args.db==='dev'?'localdev':'localhost';
			break;
		}

		case 'development':
		case 'production':
		{
			break;
		}

		default:
		{
			environ = 'localhost';
			break;
		}
	}

	/*
	 * Task Functions
	 */
	function cleanTask()
	{
		return cleanEnv(environ);
	}

	function cleanEnv(env)
	{
		var envPaths = [paths.dest[env]];

		if (env==='localhost'||env==='localdev')
		{
			envPaths = 'src/config.js';
		}

		return plugins.del(envPaths);
	}

	function cleanAllTask()
	{
		return Object.keys(paths.dest).forEach(cleanEnv);
	}

	function copyConfigTask()
	{
		return gulp.src(paths.config[environ])
			.pipe(plugins.rename('config.js'))
			.pipe(gulp.dest(paths.dest[environ]));
	}

	function copyScriptsTask()
	{
		return gulp.src(paths.scripts)
			.pipe((environ==='localdev'||environ==='localhost')?noop():gulp.dest(paths.dest[environ]));
	}

	function lintConfig(env)
	{
		return gulp.src(paths.config[env])
			.pipe(plugins.jshint())
			.pipe(plugins.jscs())
			.pipe(plugins.jscsStylish.combineWithHintResults())
			.pipe(plugins.jshint.reporter('jshint-stylish'));
	}

	function lintConfigTask()
	{
		return lintConfig(environ);
	}

	function lintAllConfig()
	{
		return gulp.src(getValues(paths.config))
			.pipe(plugins.jshint())
			.pipe(plugins.jscs())
			.pipe(plugins.jscsStylish.combineWithHintResults())
			.pipe(plugins.jshint.reporter('jshint-stylish'));
	}

	function lintScriptsTask()
	{
		return gulp.src(paths.scripts)
			.pipe(plugins.jshint())
			.pipe(plugins.jscs())
			.pipe(plugins.jscsStylish.combineWithHintResults())
			.pipe(plugins.jshint.reporter('jshint-stylish'));
	}

	function startServerTask()
	{
		plugins.developServer.listen(
		{
			path: 'src/app.js'
		});
	}

	function restartServerTask()
	{
		plugins.developServer.restart();
	}

	function watchTask()
	{
		gulp.watch([paths.scripts], gulp.series(
			'lint:scripts',
			'restart:server'
		));

		gulp.watch([paths.config[environ]], gulp.series(
			'lint:config',
			'copy:config',
			'restart:server'
		));
	}

	// get an array of the values in an object
	function getValues(object)
	{
		var vals = [];
		var key;

		for (key in object)
		{
			if (object.hasOwnProperty(key))
			{
				vals.push(object[key]);
			}
		}

		return vals;
	}
})();
