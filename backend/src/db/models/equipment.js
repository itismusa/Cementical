const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const equipment = sequelize.define(
    'equipment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

equipment_name: {
        type: DataTypes.TEXT,

      },

equipment_type: {
        type: DataTypes.ENUM,

        values: [

"Pump",

"Mixer",

"Blender"

        ],

      },

performance_rating: {
        type: DataTypes.DECIMAL,

      },

maintenance_schedule: {
        type: DataTypes.DATE,

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

  equipment.associate = (db) => {

    db.equipment.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.equipment.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return equipment;
};

