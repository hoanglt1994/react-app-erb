"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = __importDefault(require("../controller/OrderController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
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
 * @property {boolean} invoiceFlag
 */
/**
 * @typedef OrderCreateAttributes
 * @property {string} orderCode.required
 * @property {number} estimateId.required
 * @property {string} status
 * @property {string} orderDate
 * @property {string} orderNumber
 * @property {string} orderName
 * @property {string} description
 * @property {Array.<OrderDetailAttributes>} details
 */
/**
 * @typedef OrderUpdateDetailAttributes
 * @property {number} orderDetailId.required
 * @property {number} index.required
 * @property {number} orderId.required
 * @property {string} note.required
 * @property {number} quantity
 * @property {string} unit
 * @property {number} unitPrice
 * @property {number} price
 * @property {string} remarks.required
 * @property {string} person
 * @property {boolean} invoiceFlag
 */
/**
 * @typedef OrderUpdateAttributes
 * @property {string} orderCode.required
 * @property {number} estimateId.required
 * @property {string} status
 * @property {string} orderDate
 * @property {string} orderNumber
 * @property {string} orderName
 * @property {string} description
 * @property {Array.<OrderUpdateDetailAttributes>} details
 * @property {Array<number>} deleteDetails
 */
/**
 * @route GET /order/getOrderById
 * @operationId getOrderById
 * @param {number} orderId.query.required
 * @returns {Array} 200 - Information of order
 * @returns {Error}  default - Unexpected error
 */
router.get('/getOrderById', OrderController_1.default.getOrderById);
/**
 * @route POST /order
 * @param {OrderCreateAttributes.model} order.body.required - the new header order
 * @returns {object} 200 - new order info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', OrderController_1.default.createOrder);
/**
 * @route GET /order/orderCheckCode
 * @operationId orderCheckCode
 * @param {string} orderCode.query.required
 * @returns {Array} 200 - Information of estimate
 * @returns {Error}  default - Unexpected error
 */
router.get('/orderCheckCode', OrderController_1.default.orderCheckCode);
/**
 * @route PUT /order/{id}
 * @operationId orderUpdate
 * @param {number} id.path.required
 * @param {OrderUpdateAttributes.model} order.body.required - the new order
 * @returns {Array.<string>} 200 - status of order update
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', OrderController_1.default.updateOrder);
/**
 * @route DELETE /order/{id}
 * @operationId deleteOrder
 * @param {number} id.path.required
 * @returns {Array.<string>} 200 - status of order delete
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', OrderController_1.default.deleteOrder);
module.exports = router;
//# sourceMappingURL=order.routes.js.map