const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');
const e = require('express');

exports.register = async (req, res) => {
    const { name, password, email, isDoctor, location, specialization, address, workHours, phone } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await models.User.create({
            name,
            email,
            password: hashedPassword,
            isDoctor: isDoctor || false,
            latitude: location?.latitude,
            longitude: location?.longitude
        });

        if (isDoctor) {
            await models.Doctor.create({
                userId: newUser.id,
                specialization,
                address,
                workHours,
                phone
            });
        };

        res.status(200).json({ message: "تم إنشاء الحسابك بنجاح" });
    } catch (e) {
        res.status(500).json(e);
    };
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await models.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        };

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name
        }, process.env.JWT_SECRET);

        res.status(200).json({ accessToken: token });
    } catch (e) {
        res.status(500).json(e);
    };
};

exports.me = (req, res) => {
    const user = req.currentUser;

    res.status(200).json(user);
};

exports.getProfile = async (req, res) => {
    try {
        const result = await models.User.findOne({
            where: { id: req.currentUser.id },
            attributes: { exclude: ['password'] },
            include: [{ model: models.Doctor }]
        });

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json(e);
    };
};

exports.updateProfile = async (req, res) => {
    const { name, email, password, location, isDoctor, specialization, address, workHours, phone } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await models.User.update({
            name,
            email,
            password: hashedPassword,
            latitude: location?.latitude,
            longitude: location?.longitude,
            isDoctor
        }, { where: { id: req.currentUser.id } });

        if (isDoctor) {
            await models.Doctor.update({
                specialization,
                address,
                workHours,
                phone
            }, { where: { userId: req.currentUser.id } });
        };

        res.status(200).json({ message: 'تم تحديث الملف الشخصي بنجاح' });
    } catch (e) {
        res.status(500).json(e);
    };
};

exports.deleteAccount = async (req, res) => {
    try {
        await models.User.destroy({ where: { id: req.currentUser.id } });
        res.status(200).json({ message: 'تم حذف الحساب بنجاح' });
    } catch (e) {
        res.status(500).json(e);
    };
};