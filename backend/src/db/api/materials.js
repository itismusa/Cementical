
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class MaterialsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const materials = await db.materials.create(
            {
                id: data.id || undefined,

        material_name: data.material_name
        ||
        null
            ,

        material_type: data.material_type
        ||
        null
            ,

        price: data.price
        ||
        null
            ,

        supplier: data.supplier
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return materials;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const materialsData = data.map((item, index) => ({
                id: item.id || undefined,

                material_name: item.material_name
            ||
            null
            ,

                material_type: item.material_type
            ||
            null
            ,

                price: item.price
            ||
            null
            ,

                supplier: item.supplier
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const materials = await db.materials.bulkCreate(materialsData, { transaction });

        return materials;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const materials = await db.materials.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.material_name !== undefined) updatePayload.material_name = data.material_name;

        if (data.material_type !== undefined) updatePayload.material_type = data.material_type;

        if (data.price !== undefined) updatePayload.price = data.price;

        if (data.supplier !== undefined) updatePayload.supplier = data.supplier;

        updatePayload.updatedById = currentUser.id;

        await materials.update(updatePayload, {transaction});

        return materials;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const materials = await db.materials.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of materials) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of materials) {
                await record.destroy({transaction});
            }
        });

        return materials;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const materials = await db.materials.findByPk(id, options);

        await materials.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await materials.destroy({
            transaction
        });

        return materials;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const materials = await db.materials.findOne(
            { where },
            { transaction },
        );

        if (!materials) {
            return materials;
        }

        const output = materials.get({plain: true});

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

                if (filter.material_name) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'materials',
                            'material_name',
                            filter.material_name,
                        ),
                    };
                }

                if (filter.supplier) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'materials',
                            'supplier',
                            filter.supplier,
                        ),
                    };
                }

            if (filter.priceRange) {
                const [start, end] = filter.priceRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    price: {
                    ...where.price,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    price: {
                    ...where.price,
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

            if (filter.material_type) {
                where = {
                    ...where,
                material_type: filter.material_type,
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
            const { rows, count } = await db.materials.findAndCountAll(queryOptions);

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
                        'materials',
                        'material_name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.materials.findAll({
            attributes: [ 'id', 'material_name' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['material_name', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.material_name,
        }));
    }

};

