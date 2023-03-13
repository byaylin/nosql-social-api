const Router = require('express').Router();

const { getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

Router.route('/').get(getThought).post(createThought);

Router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

Router.route('/:thoughtId/reactions').post(createReaction);
Router.route('/:thoughtId/reactions').delete(deleteReaction);