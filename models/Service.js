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
exports.Service = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Service extends sequelize_1.Model {
    static initModel(sequelize) {
        Service.init({
            serviceId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'service_id',
            },
            serviceCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [9, 12],
                },
                field: 'service_code',
            },
            serviceName: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                field: 'service_name',
            },
            projectCode: {
                type: sequelize_1.DataTypes.CHAR(8),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [8, 8],
                },
                references: {
                    model: 'projects',
                    key: 'project_code',
                },
                field: 'project_code',
            },
            clientCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [12, 12],
                },
                references: {
                    model: 'clients',
                    key: 'client_code',
                },
                field: 'client_code',
            },
            employeeCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [12, 12],
                },
                references: {
                    model: 'employees',
                    key: 'employee_code',
                },
                field: 'employee_code',
            },
            clientEmployeeCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: true,
                references: {
                    model: 'client_employees',
                    key: 'client_employee_code',
                },
                field: 'client_employee_code',
            },
            serviceStartDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'service_start_date',
            },
            serviceEndDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'service_end_date',
            },
            description: {
                type: sequelize_1.DataTypes.STRING(250),
                allowNull: true,
            },
            deleteFlg: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                field: 'delete_flg',
                defaultValue: false,
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
            tableName: 'services',
            timestamps: false,
            indexes: [
                {
                    name: 'services_pkey',
                    unique: true,
                    fields: [{ name: 'service_id' }],
                },
                {
                    name: 'client_code',
                    fields: [{ name: 'client_code' }],
                },
                {
                    name: 'employee_code',
                    fields: [{ name: 'employee_code' }],
                },
                {
                    name: 'client_employee_code',
                    fields: [{ name: 'client_employee_code' }],
                },
                {
                    name: 'service_name',
                    fields: [{ name: 'service_name' }],
                },
                {
                    name: 'services_projects_fkey',
                    fields: [{ name: 'project_code' }],
                },
            ],
        });
        return Service;
    }
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map