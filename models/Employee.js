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
exports.Employee = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Employee extends sequelize_1.Model {
    static initModel(sequelize) {
        Employee.init({
            employeeCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                primaryKey: true,
                field: 'employee_code',
            },
            employeeName: {
                type: sequelize_1.DataTypes.STRING(120),
                allowNull: false,
                field: 'employee_name',
            },
            departmentName: {
                type: sequelize_1.DataTypes.STRING(120),
                allowNull: true,
                field: 'department_name',
            },
            email: {
                type: sequelize_1.DataTypes.STRING(125),
                allowNull: true,
            },
            postalCode: {
                type: sequelize_1.DataTypes.CHAR(10),
                allowNull: true,
                field: 'postal_code',
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING(18),
                allowNull: true,
                field: 'phone_number',
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
            tableName: 'employees',
            timestamps: false,
            indexes: [
                {
                    name: 'employees_pkey',
                    unique: true,
                    fields: [{ name: 'employee_code' }],
                },
                {
                    name: 'employee_name',
                    fields: [{ name: 'employee_name' }],
                },
            ],
        });
        return Employee;
    }
}
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map