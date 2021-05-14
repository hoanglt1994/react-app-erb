"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClientEmployeeController_1 = __importDefault(require("../controller/ClientEmployeeController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef ClientEmployeeAttributes
 * @property {string} clientEmployeeCode.required
 * @property {string} clientEmployeeName.required
 * @property {string} clientCode.required
 * @property {string} departmentName.required
 * @property {string} phoneNumber.required
 * @property {string} email.required
 */
/**
 * @route GET /clientEmployee/getByClientCode
 * @operationId clientEmployeeGetByClientCode
 * @param {string} clientCode.query
 * @returns {Array.<ClientEmployeeAttributes>} 200 - list of clientEmployee
 * @returns {Error}  default - Unexpected error
 */
router.get('/getByClientCode', ClientEmployeeController_1.default.getClientEmployeesByClientCode);
/**
 * @route POST /clientEmployee/create
 * @param {ClientEmployeeAttributes.model} clientEmployee.body.required - the new clientEmployee
 * @operationId createClientEmployee
 * @returns {object} 200 - new clientEmployee info
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', ClientEmployeeController_1.default.postClientEmployee);
module.exports = router;
//# sourceMappingURL=clientEmployee.routes.js.map