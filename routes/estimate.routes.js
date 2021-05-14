"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EstimateController_1 = __importDefault(require("../controller/EstimateController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef EstimateDetailAttributes
 * @property {number} index.required
 * @property {number} estimateId.required
 * @property {string} note.required
 * @property {number} quantity
 * @property {string} unit
 * @property {number} unitPrice
 * @property {number} price
 * @property {string} remarks.required
 * @property {string} person
 */
/**
 * @typedef EstimateDetailUpdateAttributes
 * @property {number} estimateDetailId.required
 * @property {number} index.required
 * @property {number} estimateId.required
 * @property {string} note.required
 * @property {number} quantity
 * @property {string} unit
 * @property {number} unitPrice
 * @property {number} price
 * @property {string} remarks.required
 * @property {string} person
 */
/**
 * @typedef EstimateCreateAttributes
 * @property {string} estimateCode.required
 * @property {number} serviceId.required
 * @property {string} status
 * @property {string} estimateDate
 * @property {Array.<EstimateDetailAttributes>} details
 */
/**
 * @typedef EstimateUpdateAttributes
 * @property {string} estimateCode.required
 * @property {number} serviceId.required
 * @property {string} status
 * @property {string} estimateDate
 * @property {boolean} orderFlg.required
 * @property {boolean} deleteFlg.required
 * @property {Array.<EstimateDetailUpdateAttributes>} details
 * @property {Array<number>} deleteDetails
 */
/**
 * @route POST /estimate
 * @param {EstimateCreateAttributes.model} estimate.body.required - the new header estimate
 * @returns {object} 200 - new estimate info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', EstimateController_1.default.createEstimate);
/**
 * @route GET /estimate/getEstimateById
 * @operationId getEstimateById
 * @param {number} estimateId.query.required
 * @returns {Array} 200 - Information of estimate
 * @returns {Error}  default - Unexpected error
 */
router.get('/getEstimateById', EstimateController_1.default.getEstimateById);
/**
 * @route GET /estimate/estimateCheckCode
 * @operationId estimateCheckCode
 * @param {string} estimateCode.query.required
 * @returns {Array} 200 - Information of estimate
 * @returns {Error}  default - Unexpected error
 */
router.get('/estimateCheckCode', EstimateController_1.default.estimateCheckCode);
/**
 * @route PUT /estimate/{id}
 * @operationId estimateUpdate
 * @param {number} id.path.required
 * @param {EstimateUpdateAttributes.model} estimate.body.required - the new estimate
 * @returns {Array.<string>} 200 - status of estimate update
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', EstimateController_1.default.updateEstimate);
/**
 * @route DELETE /estimate/{id}
 * @operationId deleteEstimate
 * @param {number} id.path.required
 * @returns {Array.<string>} 200 - status of estimate delete
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', EstimateController_1.default.deleteEstimate);
module.exports = router;
//# sourceMappingURL=estimate.routes.js.map