'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const employees = require('../data/employee.json');
        let employeesArray = [];
        employees.forEach((employee) => {
            employeesArray.push({
                employee_code: employee.employeeCode,
                employee_name: employee.employeeName,
                department_name: employee.departmentName,
                email: employee.email,
                postal_code: employee.postalCode,
                phone_number: employee.phoneNumber,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('employees', employeesArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('employees', null);
    }),
};
//# sourceMappingURL=20210222073805-employee.js.map