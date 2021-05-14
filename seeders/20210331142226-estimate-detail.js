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
        const estimateDetails = require('../data/estimate-detail.json');
        let estimateDetailsArray = [];
        estimateDetails.forEach((estimateDetail) => {
            estimateDetailsArray.push({
                index: estimateDetail.index,
                estimate_id: estimateDetail.estimateId,
                note: estimateDetail.note,
                quantity: estimateDetail.quantity,
                unit: estimateDetail.unit,
                unit_price: estimateDetail.unitPrice,
                price: estimateDetail.price,
                remarks: estimateDetail.remarks,
                person: estimateDetail.person,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('estimate_details', estimateDetailsArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('estimate_details', null);
    }),
};
//# sourceMappingURL=20210331142226-estimate-detail.js.map