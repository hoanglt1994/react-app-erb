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
        const invoices = require('../data/invoice.json');
        let invoicesArray = [];
        invoices.forEach((invoice) => {
            invoicesArray.push({
                invoice_code: invoice.invoiceCode,
                invoice_date: invoice.invoiceDate,
                status: invoice.status,
                payment_date: invoice.paymentDate,
                order_id: invoice.orderId,
                delete_flg: false,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('invoices', invoicesArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('invoices', null);
    }),
};
//# sourceMappingURL=20210331144126-invoice.js.map