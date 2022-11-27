const { BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
    async create(req, res) {
        const { basketId } = req.user;
        const deviceId = req.body.id;
        await BasketDevice.create({ basketId, deviceId, amount: 1 });
        return res.json(req.body);
    }

    async increase(req, res) {
        const { deviceId } = req.body;

        let { amount } = await BasketDevice.findOne({ where: { deviceId } });

        if (amount < 50) {
            amount++;
        }

        await BasketDevice.update(
            { amount },
            {
                where: {
                    deviceId,
                },
            }
        );
        return res.json({ deviceId, amount });
    }

    async getAll(req, res) {
        const basketDevices = await BasketDevice.findAll({
            include: Device,
        });

        return res.json(
            basketDevices.map((item) => {
                return { ...item.device.dataValues, amount: item.amount };
            })
        );
    }

    async decrease(req, res) {
        const { deviceId } = req.body;

        let { amount } = await BasketDevice.findOne({ where: { deviceId } });

        if (amount > 0) {
            amount--;
        }

        await BasketDevice.update(
            { amount },
            {
                where: {
                    deviceId,
                },
            }
        );
        return res.json({ deviceId, amount });
    }
}

module.exports = new BasketController();
