"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderDocumentController_1 = __importDefault(require("../controller/OrderDocumentController"));
const DocumentController_1 = __importDefault(require("../controller/DocumentController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef OrderDocumentAttributes
 * @property {number} orderId.required
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
 * @route POST /orderDocument
 * @operationId createOrderDocument
 * @param {OrderDocumentAttributes.model} orderDocument.body.required
 * @returns {object} 200 - new order document
 * @returns {Error}  default - Unexpected error
 */
router.post('/', OrderDocumentController_1.default.create);
/**
 * @route GET /orderDocument/{id}
 * @operationId getOrderDocuments
 * @param {number} id.path.required
 * @returns {Array.<DocumentAttributes>} 200 - status of get document
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', OrderDocumentController_1.default.getOrderDocuments, DocumentController_1.default.getDocuments);
/**
 * @route DELETE /orderDocument/{id}
 * @operationId deleteOrderDocument
 * @param {number} id.path.required
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', OrderDocumentController_1.default.delete);
module.exports = router;
//# sourceMappingURL=orderDocument.routes.js.map