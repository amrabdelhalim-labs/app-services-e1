const { Op } = require("sequelize");
const models = require('../models');

exports.index = async (req, res) => {
    let {q} = req.query;
    const searchQuery = q ? {name: {[Op.iLike]: `%${q.replace(' ', '')}%`}} : {};

    try {
        const doctors = await models.User.findAll({
            where: { ...searchQuery, isDoctor: true },
            include: [{ model: models.Doctor , as: 'doctor' }],
            attributes: { exclude: ['password'] }
        });
        
        res.status(200).json(doctors);
    } catch (e) {
        res.status(500).json(e);
    };
};