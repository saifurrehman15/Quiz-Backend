import { sequelize } from "../../../utils/db/index.js";
import { DataTypes } from 'sequelize';

const SubjectModel = sequelize.define('subjects', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    { timestamps: true, underscored: true },
);

export default SubjectModel;