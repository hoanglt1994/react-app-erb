"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectController_1 = __importDefault(require("../controller/ProjectController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef ProjectAttributes
 * @property {string} projectCode.required
 * @property {string} projectName.required
 */
/**
 * @typedef ServiceInfoAttributes
 * @property {number} serviceId.required
 * @property {string} serviceCode.required
 * @property {string} serviceName.required
 */
/**
 * @typedef ProjectServiceAttributes
 * @property {string} projectCode.required
 * @property {string} projectName.required
 * @property {Array.<ServiceInfoAttributes>} Services.required
 */
/**
 * @route GET /project
 * @operationId projectGetAll
 * @returns {Array.<ProjectAttributes>} 200 - list of project
 * @returns {Error}  default - Unexpected error
 */
router.get('/', ProjectController_1.default.getAll);
/**
 * @route POST /project
 * @param {ProjectAttributes.model} project.body.required - the new project
 * @returns {object} 200 - new project info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', ProjectController_1.default.create);
/**
 * @route GET /project/getProjectByCode
 * @operationId getProjectByCode
 * @param {string} projectCode.query.required
 * @returns {Array.<ProjectAttributes>} 200 - Information of service
 * @returns {Error}  default - Unexpected error
 */
router.get('/getProjectByCode', ProjectController_1.default.getByCode);
/**
 * @route GET /project/getProjectAndService
 * @operationId getProjectAndService
 * @returns {Array.<ProjectServiceAttributes>} 200 - list of project and services
 * @returns {Error}  default - Unexpected error
 */
router.get('/getProjectAndService', ProjectController_1.default.getProjectAndService);
module.exports = router;
//# sourceMappingURL=project.routes.js.map