"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEmployee = void 0;
const sequelize_1 = require("sequelize");
class ClientEmployee extends sequelize_1.Model {
    static initModel(sequelize) {
        ClientEmployee.init({
            clientEmployeeCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                primaryKey: true,
                field: 'client_employee_code',
            },
            clientEmployeeName: {
                type: sequelize_1.DataTypes.STRING(120),
                allowNull: false,
                field: 'client_employee_name',
            },
            clientCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                field: 'client_code',
            },
            departmentName: {
                type: sequelize_1.DataTypes.STRING(120),
                allowNull: true,
                field: 'department_name',
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING(18),
                allowNull: true,
                field: 'phone_number',
            },
            email: {
                type: sequelize_1.DataTypes.STRING(125),
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: 'client_employees',
            timestamps: false,
            indexes: [
                {
                    name: 'client_employees_pkey',
                    unique: true,
                    fields: [{ name: 'client_employee_code' }],
                },
            ],
        });
        return ClientEmployee;
    }
}
exports.ClientEmployee = ClientEmployee;
//# sourceMappingURL=ClientEmployee.js.map