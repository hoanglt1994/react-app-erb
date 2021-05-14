"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WorkReportController_1 = __importDefault(require("../controller/WorkReportController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef WorkReportCreateAttributes
 * @property {number} workReportId.required
 * @property {number} invoiceId.required
 * @property {string} title
 * @property {number} workingTime.required
 * @property {string} workInfo
 * @property {string} relatedDocument
 */
/**
 * @typedef WorkReportUpdateAttributes
 * @property {number} workReportId.required
 * @property {number} invoiceId.required
 * @property {string} title
 * @property {number} workingTime.required
 * @property {string} workInfo
 * @property {string} relatedDocument
 */
/**
 * @route POST /workReport
 * @param {WorkReportCreateAttributes.model} workReport.body.required - the new header workReport
 * @returns {object} 200 - new workReport info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', WorkReportController_1.default.createWorkReport);
/**
 * @route GET /workReport/getWorkReportById
 * @operationId getWorkReportById
 * @param {number} workReportId.query.required
 * @returns {Array} 200 -Information of workReport
 * @returns {Error}  default - Unexpected error
 */
router.get('/getWorkReportById', WorkReportController_1.default.getWorkReportById);
/**
 * @route PUT /workReport/{id}
 * @operationId workReportUpdate
 * @param {number} id.path.required
 * @param {WorkReportUpdateAttributes.model} workReport.body.required - the new workReport
 * @returns {Array.<string>} 200 - status of workReport update
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', WorkReportController_1.default.updateWorkReport);
module.exports = router;
//# sourceMappingURL=workReport.routes.js.map