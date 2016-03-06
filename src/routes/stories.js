(function storiesRoutes()
{
	'use strict';

	var ctrl = require('../controllers/stories');

	module.exports = storiesRouter;

	function storiesRouter(router)
	{
		// router.get('/clients/:userId/stories', ctrl.listStories);
		// router.get('/clients/:userId/stories/:id', ctrl.getStoryById);
		// router.put('/clients/:userId/stories/:id', ctrl.updateStory);
		// router.delete('/clients/:userId/stories/:id', ctrl.deleteStory);
		// router.post('/clients/:userId/stories', ctrl.createStory);
		router.get('/stories', ctrl.listStories);
		router.get('/stories/:id', ctrl.getStoryById);
		router.put('/stories/:id', ctrl.updateStory);
		router.delete('/stories/:id', ctrl.deleteStory);
		router.post('/stories', ctrl.createStory);
	}
})();
