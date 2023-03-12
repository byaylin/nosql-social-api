const { User, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .populate('reactions')
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Thought does not exist!'})
                : res.json(thought)
        })
        .catch((err) => res.status(500).json(err))
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$push: {thoughts: _id}},
                    {runValidators: true, new: true}
                );
            })
            .then((thought) => {
                !thought
                ? res.status(404).json({message: 'Thought does not exist!'})
                : res.json(thought)
            })
            .catch((err) => res.status(500).json(err))
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Thought does not exist!'})
                : res.json(thought)
        })
        .catch((err) => res.status(500).json(err))
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Thought does not exist!'})
                : User.findOneAndUpdate(
                    {thoughts: req.params.thoughtId},
                    {$pull: {thoughts: req.params.thoughtId}},
                    {runValidators: true, new: true}
                  )
        })
        .then(() => res.json({message: 'Thought deleted!'}))
        .catch((err) => res.status(500).json(err))
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Thought does not exist!'})
                : res.json(thought)
        })
        .catch((err) => res.status(500).json(err))
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Thought does not exist!'})
                : res.json(thought)
        })
        .catch((err) => res.status(500).json(err))
    },
};
