
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class JobsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const jobs = await db.jobs.create(
            {
                id: data.id || undefined,

        job_name: data.job_name
        ||
        null
            ,

        job_type: data.job_type
        ||
        null
            ,

        start_date: data.start_date
        ||
        null
            ,

        end_date: data.end_date
        ||
        null
            ,

        depth: data.depth
        ||
        null
            ,

        casing_size: data.casing_size
        ||
        null
            ,

        slurry_volume: data.slurry_volume
        ||
        null
            ,

        slurry_density: data.slurry_density
        ||
        null
            ,

        cost: data.cost
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return jobs;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const jobsData = data.map((item, index) => ({
                id: item.id || undefined,

                job_name: item.job_name
            ||
            null
            ,

                job_type: item.job_type
            ||
            null
            ,

                start_date: item.start_date
            ||
            null
            ,

                end_date: item.end_date
            ||
            null
            ,

                depth: item.depth
            ||
            null
            ,

                casing_size: item.casing_size
            ||
            null
            ,

                slurry_volume: item.slurry_volume
            ||
            null
            ,

                slurry_density: item.slurry_density
            ||
            null
            ,

                cost: item.cost
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const jobs = await db.jobs.bulkCreate(jobsData, { transaction });

        return jobs;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const jobs = await db.jobs.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.job_name !== undefined) updatePayload.job_name = data.job_name;

        if (data.job_type !== undefined) updatePayload.job_type = data.job_type;

        if (data.start_date !== undefined) updatePayload.start_date = data.start_date;

        if (data.end_date !== undefined) updatePayload.end_date = data.end_date;

        if (data.depth !== undefined) updatePayload.depth = data.depth;

        if (data.casing_size !== undefined) updatePayload.casing_size = data.casing_size;

        if (data.slurry_volume !== undefined) updatePayload.slurry_volume = data.slurry_volume;

        if (data.slurry_density !== undefined) updatePayload.slurry_density = data.slurry_density;

        if (data.cost !== undefined) updatePayload.cost = data.cost;

        updatePayload.updatedById = currentUser.id;

        await jobs.update(updatePayload, {transaction});

        return jobs;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const jobs = await db.jobs.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of jobs) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of jobs) {
                await record.destroy({transaction});
            }
        });

        return jobs;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const jobs = await db.jobs.findByPk(id, options);

        await jobs.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await jobs.destroy({
            transaction
        });

        return jobs;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const jobs = await db.jobs.findOne(
            { where },
            { transaction },
        );

        if (!jobs) {
            return jobs;
        }

        const output = jobs.get({plain: true});

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

                if (filter.job_name) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'jobs',
                            'job_name',
                            filter.job_name,
                        ),
                    };
                }

            if (filter.start_dateRange) {
                const [start, end] = filter.start_dateRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    start_date: {
                    ...where.start_date,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    start_date: {
                    ...where.start_date,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.end_dateRange) {
                const [start, end] = filter.end_dateRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    end_date: {
                    ...where.end_date,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    end_date: {
                    ...where.end_date,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.depthRange) {
                const [start, end] = filter.depthRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    depth: {
                    ...where.depth,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    depth: {
                    ...where.depth,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.casing_sizeRange) {
                const [start, end] = filter.casing_sizeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    casing_size: {
                    ...where.casing_size,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    casing_size: {
                    ...where.casing_size,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.slurry_volumeRange) {
                const [start, end] = filter.slurry_volumeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    slurry_volume: {
                    ...where.slurry_volume,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    slurry_volume: {
                    ...where.slurry_volume,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.slurry_densityRange) {
                const [start, end] = filter.slurry_densityRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    slurry_density: {
                    ...where.slurry_density,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    slurry_density: {
                    ...where.slurry_density,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.costRange) {
                const [start, end] = filter.costRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    cost: {
                    ...where.cost,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    cost: {
                    ...where.cost,
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

            if (filter.job_type) {
                where = {
                    ...where,
                job_type: filter.job_type,
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
            const { rows, count } = await db.jobs.findAndCountAll(queryOptions);

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
                        'jobs',
                        'job_name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.jobs.findAll({
            attributes: [ 'id', 'job_name' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['job_name', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.job_name,
        }));
    }

};

