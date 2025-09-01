const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const materials = sequelize.define(
    'materials',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

material_name: {
        type: DataTypes.TEXT,

      },

material_type: {
        type: DataTypes.ENUM,

        values: [

"Cement",

"Additive"

        ],

      },

price: {
        type: DataTypes.DECIMAL,

      },

supplier: {
        type: DataTypes.TEXT,

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

  materials.associate = (db) => {

    db.materials.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.materials.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return materials;
};

