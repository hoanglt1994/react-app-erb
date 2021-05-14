"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ServiceDocumentController_1 = __importDefault(require("../controller/ServiceDocumentController"));
const DocumentController_1 = __importDefault(require("../controller/DocumentController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef ServiceDocumentAttributes
 * @property {number} serviceId.required
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
 * @route POST /serviceDocument
 * @operationId createServiceDocument
 * @param {ServiceDocumentAttributes.model} serviceDocument.body.required
 * @returns {object} 200 - new service document
 * @returns {Error}  default - Unexpected error
 */
router.post('/', ServiceDocumentController_1.default.create);
/**
 * @route GET /serviceDocument/{id}
 * @operationId getServiceDocuments
 * @param {string} id.path.required
 * @returns {Array.<DocumentAttributes>} 200 - status get service document
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', ServiceDocumentController_1.default.getServiceDocuments, DocumentController_1.default.getDocuments);
/**
 * @route DELETE /serviceDocument/{id}
 * @operationId deleteServiceDocument
 * @param {number} id.path.required
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', ServiceDocumentController_1.default.delete);
module.exports = router;
//# sourceMappingURL=serviceDocument.routes.js.map