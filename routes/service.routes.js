"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ServiceController_1 = __importDefault(require("../controller/ServiceController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef ServiceAttributes
 * @property {string} serviceCode.required
 * @property {string} serviceName.required
 * @property {string} projectCode.required
 * @property {string} serviceStartDate.required
 * @property {string} serviceEndDate.required
 * @property {string} clientCode.required
 * @property {string} employeeCode.required
 * @property {string} clientEmployeeCode
 * @property {string} description
 */
/**
 * @typedef ServiceFindAttributes
 * @property {number} serviceId.required
 * @property {string} serviceCode.required
 * @property {string} serviceName.required
 * @property {string} projectCode.required
 * @property {string} projectName.required
 * @property {string} serviceStartDate.required
 * @property {string} serviceEndDate.required
 * @property {string} clientCode.required
 * @property {string} clientName.required
 * @property {string} employeeCode.required
 * @property {string} clientEmployeeCode.required
 * @property {string} clientEmployeeName.required
 * @property {string} departmentName.required
 * @property {string} phoneNumber.required
 * @property {string} email.required
 */
/**
 * @typedef ServiceUpdateAttributes
 * @property {string} serviceCode.required
 * @property {string} serviceName.required
 * @property {string} projectCode.required
 * @property {string} serviceStartDate.required
 * @property {string} serviceEndDate.required
 * @property {string} clientCode.required
 * @property {string} employeeCode.required
 * @property {string} clientEmployeeCode
 * @property {string} description
 */
/**
 * @route GET /service
 * @operationId serviceGetAll
 * @returns {Array.<ServiceAttributes>} 200 - list of service
 * @returns {Error}  default - Unexpected error
 */
router.get('/', ServiceController_1.default.getAll);
/**
 * @route GET /service/getServiceCode
 * @operationId getServiceCode
 * @param {string} serviceCode.query
 * @returns {Array.<ServiceAttributes>} 200 - list of service
 * @returns {Error}  default - Unexpected error
 */
router.get('/getServiceCode', ServiceController_1.default.getServiceCode);
/**
 * @route GET /service/getServiceById
 * @operationId getServiceById
 * @param {number} serviceId.query.required
 * @returns {Array.<ServiceFindAttributes>} 200 - Information of service
 * @returns {Error}  default - Unexpected error
 */
router.get('/getServiceById', ServiceController_1.default.getServiceById);
/**
 * @route POST /service
 * @operationId serviceCreate
 * @param {ServiceAttributes.model} service.body.required - the new service
 * @returns {object} 200 - new service info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', ServiceController_1.default.createService);
/**
 * @route PUT /service/{id}
 * @operationId serviceUpdate
 * @param {number} id.path.required
 * @param {ServiceUpdateAttributes.model} service.body.required - the new service
 * @returns {Array.<string>} 200 - status of service update
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', ServiceController_1.default.updateService);
/**
 * @route DELETE /service/{id}
 * @operationId deleteService
 * @param {string} id.path.required
 * @returns {Array.<string>} 200 - status of service delete
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', ServiceController_1.default.deleteService);
module.exports = router;
//# sourceMappingURL=service.routes.js.map