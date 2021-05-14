"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClientController_1 = __importDefault(require("../controller/ClientController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef ClientAttributes
 * @property {string} clientCode.required
 * @property {string} clientName.required
 * @property {string} phoneNumber.required
 * @property {string} email.required
 * @property {string} address.required
 */
/**
 * @route GET /client
 * @operationId clientGetAll
 * @returns {Array.<ClientAttributes>} 200 - list of project
 * @returns {Error}  default - Unexpected error
 */
router.get('/', ClientController_1.default.getAll);
/**
 * @route POST /client
 * @param {ClientAttributes.model} client.body.required - the new client
 * @returns {object} 200 - new client info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', ClientController_1.default.create);
/**
 * @route GET /client/getClientByCode
 * @operationId getClientByCode
 * @param {string} clientCode.query.required
 * @returns {Array.<ClientAttributes>} 200 - Information of service
 * @returns {Error}  default - Unexpected error
 */
router.get('/getClientByCode', ClientController_1.default.getByCode);
module.exports = router;
//# sourceMappingURL=client.routes.js.map