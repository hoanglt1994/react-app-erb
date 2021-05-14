"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EstimateDocumentController_1 = __importDefault(require("../controller/EstimateDocumentController"));
const DocumentController_1 = __importDefault(require("../controller/DocumentController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef EstimateDocumentAttributes
 * @property {number} estimateId.required
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
 * @route POST /estimateDocument
 * @operationId createEstimateDocument
 * @param {EstimateDocumentAttributes.model} estimateDocument.body.required
 * @returns {object} 200 - new estimate document
 * @returns {Error}  default - Unexpected error
 */
router.post('/', EstimateDocumentController_1.default.create);
/**
 * @route GET /estimateDocument/{id}
 * @operationId getEstimateDocuments
 * @param {number} id.path.required
 * @returns {Array.<DocumentAttributes>} 200 - status of get document
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', EstimateDocumentController_1.default.getEstimateDocuments, DocumentController_1.default.getDocuments);
/**
 * @route DELETE /estimateDocument/{id}
 * @operationId deleteEstimateDocument
 * @param {number} id.path.required
 * @param {number} estimateId.query.required
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', EstimateDocumentController_1.default.delete);
module.exports = router;
//# sourceMappingURL=estimateDocument.routes.js.map