"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderDetailController_1 = __importDefault(require("../controller/OrderDetailController"));
const router = express_1.default.Router();
/**
 * @typedef OrderDetailAttributes
 * @property {number} index.required
 * @property {number} orderId.required
 * @property {string} note.required
 * @property {number} quantity
 * @property {string} unit
 * @property {number} unitPrice
 * @property {number} price
 * @property {string} remarks.required
 * @property {string} person
 * @property {boolean} invoiceFlag.required
 */
/**
 * @route PUT /orderDetail/updateInvoiceFlag
 * @operationId updateInvoiceFlag
 * @param {Array.<number>} id.body.required
 * @param {boolean} flag.query.required
 * @returns {Array.<string>} 200 - status of order update
 * @returns {Error}  default - Unexpected error
 */
router.put('/updateInvoiceFlag', OrderDetailController_1.default.updateInvoiceFlag);
/**
 * @route GET /orderDetail/getByOrderId
 * @operationId getOrderDetailByOrderId
 * @param {number} orderId.query.required
 * @returns {Array.<OrderDetailAttributes>} 200 - status get service document
 * @returns {Error}  default - Unexpected error
 */
router.get('/getByOrderId', OrderDetailController_1.default.getByOrderId);
module.exports = router;
//# sourceMappingURL=orderDetail.routes.js.map