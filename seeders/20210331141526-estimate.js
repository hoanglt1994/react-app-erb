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
        const estimates = require('../data/estimate.json');
        let estimatesArray = [];
        estimates.forEach((estimate) => {
            estimatesArray.push({
                estimate_code: estimate.estimateCode,
                service_id: estimate.serviceId,
                status: estimate.status,
                estimate_date: estimate.estimateDate,
                delete_flg: false,
                order_flg: estimate.orderFlg,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('estimates', estimatesArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('estimates', null);
    }),
};
//# sourceMappingURL=20210331141526-estimate.js.map