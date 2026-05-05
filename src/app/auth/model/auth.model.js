import { sequelize } from "../../../utils/db/index.js";
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    { timestamps: true, underscored: true },
);

const Role = sequelize.define(
    'roles',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        tableName: 'roles',
        timestamps: true,
        underscored: true
    }
)

const UserRole = sequelize.define(
    'user_roles',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        role_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },
    {
        tableName: 'user_roles',
        timestamps: true,
        underscored: true
    }
)

const CheatModel = sequelize.define('cheated',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Press Key'
        },
        attemp_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: 'cheated',
        timestamps: true,
        underscored: true
    }
)

UserModel.belongsToMany(Role, {
    through: UserRole,
    foreignKey: "user_id",
    otherKey: "role_id",
    as: "roles"
})

Role.belongsToMany(UserModel, {
    through: UserRole,
    foreignKey: "role_id",
    otherKey: "user_id",
    as: "users"
})

UserRole.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role'
})


UserRole.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
})

UserModel.hasMany(CheatModel, {
    foreignKey: "user_id",
    as: "cheats"
})

CheatModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "user"
})

export { UserRole, Role, CheatModel }
export default UserModel;