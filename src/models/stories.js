(function storyModel()
{
	'use strict';

	var mongoose = require('mongoose');
	var timestamps = require('mongoose-timestamp');
	var definitions = require('./definitions');

	var storySchema = new mongoose.Schema(
	{
		assignee: definitions.string(100, true),
		criteria: definitions.string(100, false),
		description: definitions.string(100, false),
		reporter: definitions.string(100, true),
		status: definitions.string(100, true),
		title: definitions.string(100, true),
		type: definitions.string(100, true) // ,
		// userId: definitions.string(100, true)
	});

	storySchema.virtual('id').get(function getId()
	{
		return this._id;
	});

	storySchema.set('toJSON',
	{
		virtuals: true
	});

	storySchema.plugin(timestamps);
	mongoose.model('story', storySchema, 'stories');
})();
