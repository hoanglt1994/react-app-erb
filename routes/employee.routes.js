"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmployeeController_1 = __importDefault(require("../controller/EmployeeController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef EmployeeAttributes
 * @property {string} employeeCode.required
 * @property {string} employeeName.required
 * @property {string} departmentName.required
 * @property {string} email.required
 * @property {string} postalCode.required
 * @property {string} phoneNumber.required
 */
/**
 * @route GET /employee/getAll
 * @operationId employeeGetAll
 * @returns {Array.<EmployeeAttributes>} 200 - list of employee
 * @returns {Error}  default - Unexpected error
 */
router.get('/getAll', EmployeeController_1.default.getAllEmployees);
/**
 * @route GET /employee/getSales
 * @operationId employeeGetSales
 * @returns {Array.<EmployeeAttributes>} 200 - list of employee
 * @returns {Error}  default - Unexpected error
 */
router.get('/getSales', EmployeeController_1.default.getSalesEmployees);
/**
 * @route POST /employee/create
 * @param {EmployeeAttributes.model} employee.body.required - the new employee
 * @operationId createEmployee
 * @returns {object} 200 - new employee info
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', EmployeeController_1.default.postEmployees);
module.exports = router;
//# sourceMappingURL=employee.routes.js.map