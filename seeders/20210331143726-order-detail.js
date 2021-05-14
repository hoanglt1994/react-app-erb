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
        const orderDetails = require('../data/order-detail.json');
        let orderDetailsArray = [];
        orderDetails.forEach((orderDetail) => {
            orderDetailsArray.push({
                index: orderDetail.index,
                order_id: orderDetail.orderId,
                note: orderDetail.note,
                quantity: orderDetail.quantity,
                unit: orderDetail.unit,
                unit_price: orderDetail.unitPrice,
                price: orderDetail.price,
                remarks: orderDetail.remarks,
                person: orderDetail.person,
                invoice_flg: orderDetail.invoiceFlg,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('order_details', orderDetailsArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('order_details', null);
    }),
};
//# sourceMappingURL=20210331143726-order-detail.js.map