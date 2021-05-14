"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InvoiceController_1 = __importDefault(require("../controller/InvoiceController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef InvoiceDetailAttributes
 * @property {number} index.required
 * @property {number} invoiceId.required
 * @property {string} note.required
 * @property {number} quantity
 * @property {string} unit
 * @property {number} unitPrice
 * @property {number} price
 * @property {string} remarks.required
 * @property {string} person
 * @property {number} orderDetailId
 */
/**
 * @typedef InvoiceCreateAttributes
 * @property {string} invoiceCode.required
 * @property {string} invoiceDate
 * @property {string} status
 * @property {string} paymentDate
 * @property {number} orderId.required
 * @property {Array.<InvoiceDetailAttributes>} details
 */
/**
 * @typedef InvoiceUpdateDetailAttributes
 * @property {number} invoiceDetailId.required
 * @property {number} index.required
 * @property {number} orderId.required
 * @property {string} note.required
 * @property {number} quantity
 * @property {string} unit
 * @property {number} unitPrice
 * @property {number} price
 * @property {string} remarks.required
 * @property {string} person
 */
/**
 * @typedef InvoiceUpdateAttributes
 * @property {string} invoiceCode.required
 * @property {string} invoiceDate
 * @property {string} status
 * @property {string} paymentDate
 * @property {number} orderId.required
 * @property {Array.<InvoiceUpdateDetailAttributes>} details
 * @property {Array<number>} deleteDetails
 */
/**
 * @route POST /invoice
 * @param {InvoiceCreateAttributes.model} invoice.body.required - the new header invoice
 * @returns {object} 200 - new invoice info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', InvoiceController_1.default.createInvoice);
/**
 * @route GET /invoice/getInvoiceById
 * @operationId getInvoiceById
 * @param {number} invoiceId.query.required
 * @returns {Array} 200 - Information of invoice
 * @returns {Error}  default - Unexpected error
 */
router.get('/getInvoiceById', InvoiceController_1.default.getInvoiceById);
/**
 * @route GET /invoice/invoiceCheckCode
 * @operationId invoiceCheckCode
 * @param {string} invoiceCode.query.required
 * @returns {Array} 200 - Information of invoice
 * @returns {Error}  default - Unexpected error
 */
router.get('/invoiceCheckCode', InvoiceController_1.default.invoiceCheckCode);
/**
 * @route PUT /invoice/{id}
 * @operationId invoiceUpdate
 * @param {number} id.path.required
 * @param {InvoiceUpdateAttributes.model} invoice.body.required - the new invoice
 * @returns {Array.<string>} 200 - status of invoice update
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', InvoiceController_1.default.updateInvoice);
/**
 * @route DELETE /invoice/{id}
 * @operationId deleteInvoice
 * @param {number} id.path.required
 * @returns {Array.<string>} 200 - status of order delete
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', InvoiceController_1.default.deleteInvoice);
module.exports = router;
//# sourceMappingURL=invoice.route.js.map