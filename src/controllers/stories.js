(function sample()
{
	'use strict';

	var mongoose = require('mongoose');

	//  var common = require('./common');
	var Story = mongoose.model('story');

	/* GET the ecm record
	 *
	 * /api/ecm
	 */
	module.exports =
	{
		listStories: listStories,
		getStoryById: getStory,
		updateStory: updateStory,
		deleteStory: deleteStory,
		createStory: createStory
	};

	function listStories(req, res)
	{
		// var query =
		// {
		// 	userId: req.params.userId // req.user.sub
		// };

		Story.find(/*query, */function findStories(err, doc)
		{
			if (doc)
			{
				res.status(200).json(doc);
			}
			else if (err)
			{
				res.status(400).json(err);
			}
			else
			{
				res.status(404).json({'message': 'Not Found'});
			}
		});
	}

	function getStory(req, res)
	{
		var query =
		{
			_id: req.params.id// ,
			// userId: req.params.userId // req.user.sub
		};

		Story.find(query, function findStory(err, doc)
		{
			if (doc)
			{
				res.status(200).json(doc);
			}
			else if (err)
			{
				res.status(400).json(err);
			}
			else
			{
				res.status(404).json({'message': 'Not Found'});
			}
		});
	}

	function updateStory(req, res)
	{
		var query =
		{
			_id: req.params.id // ,
			// userId: req.params.userId // req.user.sub
		};

		Story.update(query, omit(req.body, '_id'), function findAndUpdateStory(err, doc)
		{
			if (err)
			{
				res.status(400).json(err);
			}
			else
			{
				res.status(200).json(req.body);
			}
		});
	}

	function deleteStory(req, res)
	{
		var query =
		{
			_id: req.params.id // ,
			// userId: req.params.userId // req.user.sub
		};

		Story.remove(query, omit(req.body, '_id'), function findDeleteStory(err, doc)
		{
			if (err)
			{
				res.status(400).json(err);
			}
			else
			{
				res.status(200).json(req.body);
			}
		});
	}

	function createStory(req, res)
	{
		var newStoryObj =
		{
			assignee: req.body.assignee,
			criteria: req.body.criteria,
			description: req.body.description,
			reporter: req.body.reporter,
			status: req.body.status,
			title: req.body.title,
			type: req.body.type // ,
			// userId: req.params.userId // req.user.sub
		};
		var newstory = new Story(newStoryObj);

		newstory.save(function saveStory(err, createdStory)
		{
			if (err)
			{
				res.status(400).json(err);
			}
			else
			{
				res.status(200).json(createdStory);
			}
		});
	}

	function omit(object, fields)
	{
		var newobj = {};
		var keys;
		var flds = {};

		switch (typeof fields)
		{
			case 'string':
			{
				flds[fields] = true;
				break;
			}

			case 'object':
			{
				flds = fields;
				break;
			}
		}
		keys = object.keys.filter(filterFields);

		function filterFields(fld)
		{
			var rval = !flds[fld];

			if (rval)
			{
				newobj[fld] = object[fld];
			}

			return rval;
		}
	}
})();

