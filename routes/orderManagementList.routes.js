"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderManagementListController_1 = __importDefault(require("../controller/OrderManagementListController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @property {number} price OrderManagementListAttributes
 */
/**
 * @typedef OrderManagementListAttributes
 * @property {boolean} estimateFlg
 * @property {boolean} expandEstimate
 * @property {boolean} orderFlg
 * @property {boolean} invoiceFlg
 * @property {boolean} expandInvoice
 * @property {boolean} subExpandInvoice
 * @property {number} serviceId.required
 * @property {string} serviceCode.required
 * @property {string} serviceName.required
 * @property {string} projectCode.required
 * @property {string} clientCode.required
 * @property {string} serviceStartDate.required
 * @property {string} serviceEndDate.required
 * @property {number} estimateId.required
 * @property {string} estimateCode.required
 * @property {string} estimateDate.required
 * @property {string} estimateStatus.required
 * @property {number} estimateTotalPrice.required
 * @property {number} orderId.required
 * @property {string} orderCode.required
 * @property {string} orderDate.required
 * @property {string} orderStatus.required
 * @property {number} orderTotalPrice.required
 * @property {number} invoiceId.required
 * @property {string} invoiceCode.required
 * @property {string} invoiceDate.required
 * @property {string} invoiceStatus.required
 * @property {number} invoiceTotalPrice.required
 * @property {Array.<OrderManagementListAttributes>} children
 * @property {Array.<OrderManagementListAttributes>} subChildren
 */
/**
 * @route GET /orderManagementList
 * @returns {Array.<OrderManagementListAttributes>} 200 - list of services
 * @returns {Error}  default - Unexpected error
 */
router.get('/', OrderManagementListController_1.default.getOrderManagementList);
module.exports = router;
//# sourceMappingURL=orderManagementList.routes.js.map