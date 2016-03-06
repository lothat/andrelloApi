(function definitions()
{
	'use strict';

	var validate = require('mongoose-validator');

	module.exports =
	{
		string: string,
		date: date
	};

	function string(len, required)
	{
		return {
			type: String,
			required: !!required,
			validate: validate(
			{
				validator: 'isLength',
				arguments: [0, len || 100]
			})
		};
	}

	function date(start)
	{
		return {
			type: Date,
			validate: validate(
			{
				validator: 'isAfter',
				arguments: null || start
			})
		};
	}
})();
