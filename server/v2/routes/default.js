import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({ message: "Bienvenue, this is WayFarer's!!!" }));

export default router;
