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
        const invoiceDetails = require('../data/invoice-detail.json');
        let invoiceDetailsArray = [];
        invoiceDetails.forEach((invoiceDetail) => {
            invoiceDetailsArray.push({
                index: invoiceDetail.index,
                invoice_id: invoiceDetail.invoiceId,
                note: invoiceDetail.note,
                quantity: invoiceDetail.quantity,
                unit: invoiceDetail.unit,
                unit_price: invoiceDetail.unitPrice,
                price: invoiceDetail.price,
                remarks: invoiceDetail.remarks,
                person: invoiceDetail.person,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('invoice_details', invoiceDetailsArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('invoice_details', null);
    }),
};
//# sourceMappingURL=20210331144826-invoice-detail.js.map