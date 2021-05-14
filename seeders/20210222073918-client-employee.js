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
        const clientEmployees = require('../data/client-employee.json');
        let clientEmployeesArray = [];
        clientEmployees.forEach((clientEmployee) => {
            clientEmployeesArray.push({
                client_employee_code: clientEmployee.clientEmployeeCode,
                client_employee_name: clientEmployee.clientEmployeeName,
                client_code: clientEmployee.clientCode,
                department_name: clientEmployee.departmentName,
                phone_number: clientEmployee.phoneNumber,
                email: clientEmployee.email,
            });
        });
        return queryInterface.bulkInsert('client_employees', clientEmployeesArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('client_employees', null);
    }),
};
//# sourceMappingURL=20210222073918-client-employee.js.map