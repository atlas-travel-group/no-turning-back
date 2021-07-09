const router = require('express').Router();
const { Destination } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//     try {
//         const destinationData = await Destination.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });

//         res.status(200).json(newTrip);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.get('/', async (req, res) => {
    const destinationData = await Destination.findAll().catch((err) => {
        res.json(err);
    });
    res.json(destinationData);
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newDestination = await Destination.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newDestination);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const destinationData = await Destination.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!destinationData) {
            res.status(404).json({ message: 'No destination found with this id!' });
            return;
        }

        res.status(200).json(destinationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
