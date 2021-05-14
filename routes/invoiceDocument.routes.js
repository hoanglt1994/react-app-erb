"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InvoiceDocumentController_1 = __importDefault(require("../controller/InvoiceDocumentController"));
const DocumentController_1 = __importDefault(require("../controller/DocumentController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef InvoiceDocumentAttributes
 * @property {number} invoiceId.required
 * @property {Array.<number>} documents.required
 */
/**
 * @typedef DocumentAttributes
 * @property {number} documentId.required
 * @property {string} documentName.required
 * @property {string} filePath.required
 * @property {string} documentSaveName.required
 */
/**
 * @route POST /invoiceDocument
 * @operationId createInvoiceDocument
 * @param {InvoiceDocumentAttributes.model} invoiceDocument.body.required
 * @returns {object} 200 - new invoice document
 * @returns {Error}  default - Unexpected error
 */
router.post('/', InvoiceDocumentController_1.default.create);
/**
 * @route GET /invoiceDocument/{id}
 * @operationId getInvoiceDocuments
 * @param {number} id.path.required
 * @returns {Array.<DocumentAttributes>} 200 - status of get document
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', InvoiceDocumentController_1.default.getInvoiceDocuments, DocumentController_1.default.getDocuments);
/**
 * @route DELETE /invoiceDocument/{id}
 * @operationId deleteInvoiceDocument
 * @param {number} id.path.required
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', InvoiceDocumentController_1.default.delete);
module.exports = router;
//# sourceMappingURL=invoiceDocument.routes.js.map