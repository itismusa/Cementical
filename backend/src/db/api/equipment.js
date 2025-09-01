
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class EquipmentDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const equipment = await db.equipment.create(
            {
                id: data.id || undefined,

        equipment_name: data.equipment_name
        ||
        null
            ,

        equipment_type: data.equipment_type
        ||
        null
            ,

        performance_rating: data.performance_rating
        ||
        null
            ,

        maintenance_schedule: data.maintenance_schedule
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return equipment;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const equipmentData = data.map((item, index) => ({
                id: item.id || undefined,

                equipment_name: item.equipment_name
            ||
            null
            ,

                equipment_type: item.equipment_type
            ||
            null
            ,

                performance_rating: item.performance_rating
            ||
            null
            ,

                maintenance_schedule: item.maintenance_schedule
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const equipment = await db.equipment.bulkCreate(equipmentData, { transaction });

        return equipment;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const equipment = await db.equipment.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.equipment_name !== undefined) updatePayload.equipment_name = data.equipment_name;

        if (data.equipment_type !== undefined) updatePayload.equipment_type = data.equipment_type;

        if (data.performance_rating !== undefined) updatePayload.performance_rating = data.performance_rating;

        if (data.maintenance_schedule !== undefined) updatePayload.maintenance_schedule = data.maintenance_schedule;

        updatePayload.updatedById = currentUser.id;

        await equipment.update(updatePayload, {transaction});

        return equipment;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const equipment = await db.equipment.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of equipment) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of equipment) {
                await record.destroy({transaction});
            }
        });

        return equipment;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const equipment = await db.equipment.findByPk(id, options);

        await equipment.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await equipment.destroy({
            transaction
        });

        return equipment;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const equipment = await db.equipment.findOne(
            { where },
            { transaction },
        );

        if (!equipment) {
            return equipment;
        }

        const output = equipment.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

                if (filter.equipment_name) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'equipment',
                            'equipment_name',
                            filter.equipment_name,
                        ),
                    };
                }

            if (filter.performance_ratingRange) {
                const [start, end] = filter.performance_ratingRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    performance_rating: {
                    ...where.performance_rating,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    performance_rating: {
                    ...where.performance_rating,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.maintenance_scheduleRange) {
                const [start, end] = filter.maintenance_scheduleRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    maintenance_schedule: {
                    ...where.maintenance_schedule,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    maintenance_schedule: {
                    ...where.maintenance_schedule,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.equipment_type) {
                where = {
                    ...where,
                equipment_type: filter.equipment_type,
            };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.equipment.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'equipment',
                        'equipment_name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.equipment.findAll({
            attributes: [ 'id', 'equipment_name' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['equipment_name', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.equipment_name,
        }));
    }

};

