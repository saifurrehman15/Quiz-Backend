import { sequelize } from "../../../utils/db/index.js";
import { DataTypes } from 'sequelize';
import SubjectModel from "../../subjects/model/subject.model.js";
import UserModel from "../../users/model/user.model.js";

const QuizModel = sequelize.define('quizes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quiz_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quiz_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject_id: {
        type: DataTypes.BIGINT,
        required: true,
        references: { model: 'subjects', key: 'id' },
        onDelete: 'CASCADE'
    },
    active: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    quiz_key: {
        type: DataTypes.STRING,
    }
},
    { timestamps: true, underscored: true },
);

QuizModel.belongsTo(SubjectModel, { foreignKey: 'subject_id' })

const QuestionsModel = sequelize.define('questions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quiz_id: {
        type: DataTypes.BIGINT,
        required: true,
        references: { model: 'quizes', key: 'id' },
        onDelete: 'CASCADE'
    },
    options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
},
    { timestamps: true, underscored: true },
);

const QuizResult = sequelize.define('results', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quiz_id: {
        type: DataTypes.BIGINT,
        required: true,
        references: { model: 'quizes', key: 'id' },
        onDelete: 'CASCADE'
    },
    user_id: {
        type: DataTypes.BIGINT,
        required: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    total: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING,
    },
}, { timestamps: true, underscored: true },
)
// Quiz → Questions
QuizModel.hasMany(QuestionsModel, {
    foreignKey: 'quiz_id'
});

// Question → Quiz
QuestionsModel.belongsTo(QuizModel, {
    foreignKey: 'quiz_id'
});

// Quiz → Results
QuizModel.hasMany(QuizResult, {
    foreignKey: 'quiz_id'
});

// Result → Quiz
QuizResult.belongsTo(QuizModel, {
    foreignKey: 'quiz_id'
});

// User → Results
UserModel.hasMany(QuizResult, {
    foreignKey: 'user_id'
});

// Result → User
QuizResult.belongsTo(UserModel, {
    foreignKey: 'user_id'
});


export { QuestionsModel, QuizModel, QuizResult };