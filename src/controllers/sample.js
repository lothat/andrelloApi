(function sample()
{
	'use strict';

	var mongoose = require('mongoose');

	//  var common = require('./common');
	//  var ecmData = mongoose.model('ecmModel');

	/* GET the ecm record
	 *
	 * /api/ecm
	 */
	module.exports.sampleList = sampleList;
	module.exports.sampleUpdate = sampleUpdate;

	function sampleList(req, res, next)
	{
		/*    var query= {};
		'scale'.forEach(function(param)
		{
			if (req.query[param])
			{
				query[param] = req.query[param].toUpperCase();
			}
		});

		ecmData.findOne(query, function(err, doc)
		{
			if (doc)
			{
				common.sendJsonResponse(res, 200, doc);
			}
			else if (err)
			{
				common.sendJsonResponse(res, 404, err);
			}
			else
			{
				common.sendJsonResponse(res, 404, {'message': 'No ecm data found'});
			}
		});
		*/

		// console.log('sampleList: returning status 501 with "Not Implemented" error message');
		next({'message': 'Not Implemented'});

		// res.status(501).json({'message': 'Not Implemented'});
	}

	/* PUT the ecm record - will return the record if successful
	 *
	 * /api/ecm
	 */
	function sampleUpdate(req, res)
	{
		/*
		var errArray = [];
		req.body.forEach(function(newDoc)
		{
			ecmData.findOne(
			{
				scale: newDoc.scale
			}, function(err, oldDoc)
			{
				if (err)
				{
					return errArray.push(err);
				}
				if (newDoc.count !== oldDoc.count || newDoc.onTarget !== oldDoc.onTarget)
				{
					oldDoc.count = newDoc.count;
					oldDoc.dates = newDoc.dates;
					oldDoc.implemented = newDoc.implemented;
					oldDoc.inProgress = newDoc.inProgress;
					oldDoc.implemented = newDoc.implemented;
					oldDoc.lastUpdate = new Date();
					oldDoc.save(function(err)
					{
						if (err)
						{
							return errArray.push(err);
						}
					});
				}
			});
		});
		*/
		res.status(501).json({'error': 'Not Implemented'});
	}
})();

