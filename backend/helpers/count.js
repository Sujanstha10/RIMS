const { Op } = require('sequelize');

async function count(model, modelName) {
    try {
        const now = new Date();
        const twelveHoursAgo = new Date(now.getTime() - 10 * 60 * 60 * 1000);

        const Model = model[modelName];

        const count = await Model.findAndCountAll();

        const latest = await Model.findAll({
            where: {
                createdAt: {
                    [Op.gte]: twelveHoursAgo,
                    [Op.lte]: now,
                },
            },
        });

        const latestCount = latest.length;
        const percentage = (latestCount / count.count) * 100;

        return {percentage,totalCount: count.count,};
    } catch (error) {
        throw error;
    }
}

module.exports = count;
