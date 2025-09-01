const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const jobs = sequelize.define(
    'jobs',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

job_name: {
        type: DataTypes.TEXT,

      },

job_type: {
        type: DataTypes.ENUM,

        values: [

"Conventional",

"Horizontal",

"High-pressure/High-temperature",

"Offshore",

"Remedial"

        ],

      },

start_date: {
        type: DataTypes.DATE,

      },

end_date: {
        type: DataTypes.DATE,

      },

depth: {
        type: DataTypes.DECIMAL,

      },

casing_size: {
        type: DataTypes.DECIMAL,

      },

slurry_volume: {
        type: DataTypes.DECIMAL,

      },

slurry_density: {
        type: DataTypes.DECIMAL,

      },

cost: {
        type: DataTypes.DECIMAL,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  jobs.associate = (db) => {

    db.jobs.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.jobs.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return jobs;
};

