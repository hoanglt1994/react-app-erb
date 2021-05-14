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
        const services = require('../data/service.json');
        let servicesArray = [];
        services.forEach((service) => {
            servicesArray.push({
                service_code: service.serviceCode,
                service_name: service.serviceName,
                project_code: service.projectCode,
                client_code: service.clientCode,
                employee_code: service.employeeCode,
                client_employee_code: service.clientEmployeeCode,
                service_start_date: service.serviceStartDate,
                service_end_date: service.serviceEndDate,
                delete_flg: false,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('services', servicesArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('services', null);
    }),
};
//# sourceMappingURL=20210331110726-service.js.map