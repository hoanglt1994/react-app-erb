"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Project extends sequelize_1.Model {
    static initModel(sequelize) {
        Project.init({
            projectCode: {
                type: sequelize_1.DataTypes.CHAR(8),
                allowNull: false,
                primaryKey: true,
                field: 'project_code',
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            projectName: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                field: 'project_name',
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.default.literal('current_timestamp'),
                field: 'created_at',
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.default.literal('current_timestamp'),
                field: 'updated_at',
            },
        }, {
            sequelize,
            tableName: 'projects',
            timestamps: false,
            indexes: [
                {
                    name: 'projects_pkey',
                    unique: true,
                    fields: [{ name: 'project_code' }],
                },
                {
                    name: 'project_pkey',
                    unique: true,
                    fields: [{ name: 'project_code' }],
                },
                {
                    name: 'project_name',
                    fields: [{ name: 'project_name' }],
                },
            ],
        });
        return Project;
    }
}
exports.Project = Project;
//# sourceMappingURL=Project.js.map