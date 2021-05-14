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
        const clients = require('../data/client.json');
        let clientsArray = [];
        clients.forEach((client) => {
            clientsArray.push({
                client_code: client.clientCode,
                client_name: client.clientName,
                phone_number: client.phoneNumber,
                email: client.email,
                address: client.address,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('clients', clientsArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('clients', null);
    }),
};
//# sourceMappingURL=20210222073859-client.js.map