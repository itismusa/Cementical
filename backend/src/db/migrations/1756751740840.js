module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.createTable('users', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('equipment', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('jobs', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('materials', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('reports', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.addColumn(
                      'users',
                      'firstName',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'lastName',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'phoneNumber',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'email',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'disabled',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'password',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'emailVerified',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationToken',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'passwordResetToken',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'passwordResetTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'provider',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'equipment',
                      'equipment_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'equipment',
                      'equipment_type',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Pump','Mixer','Blender'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'equipment',
                      'performance_rating',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'equipment',
                      'maintenance_schedule',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'job_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'assigned_engineerId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'users',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'assigned_supervisorId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'users',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'job_type',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Conventional','Horizontal','High-pressure/High-temperature','Offshore','Remedial'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'start_date',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'end_date',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'depth',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'casing_size',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'slurry_volume',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'slurry_density',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'jobs',
                      'cost',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'materials',
                      'material_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'materials',
                      'material_type',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Cement','Additive'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'materials',
                      'price',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'materials',
                      'supplier',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'reports',
                      'report_title',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'reports',
                      'jobId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'jobs',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'reports',
                      'authorId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'users',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'reports',
                      'created_date',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.removeColumn(
                        'reports',
                        'created_date',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'reports',
                        'authorId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'reports',
                        'jobId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'reports',
                        'report_title',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'materials',
                        'supplier',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'materials',
                        'price',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'materials',
                        'material_type',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'materials',
                        'material_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'cost',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'slurry_density',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'slurry_volume',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'casing_size',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'depth',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'end_date',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'start_date',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'job_type',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'assigned_supervisorId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'assigned_engineerId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'jobs',
                        'job_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'equipment',
                        'maintenance_schedule',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'equipment',
                        'performance_rating',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'equipment',
                        'equipment_type',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'equipment',
                        'equipment_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'provider',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetTokenExpiresAt',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetToken',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationTokenExpiresAt',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationToken',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'emailVerified',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'password',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'disabled',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'email',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'phoneNumber',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'lastName',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'firstName',
                        { transaction }
                    );

                    await queryInterface.dropTable('reports', { transaction });

                    await queryInterface.dropTable('materials', { transaction });

                    await queryInterface.dropTable('jobs', { transaction });

                    await queryInterface.dropTable('equipment', { transaction });

                    await queryInterface.dropTable('users', { transaction });

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
