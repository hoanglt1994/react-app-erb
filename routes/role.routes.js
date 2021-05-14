"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoleController_1 = __importDefault(require("../controller/RoleController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @typedef RoleAttributes
 * @property {number} roleId.required
 * @property {string} roleName.required
 */
/**
 * @route GET /role
 * @operationId roleGetAll
 * @returns {Array.<RoleAttributes>} 200 - list of role
 * @returns {Error}  default - Unexpected error
 */
router.get('/', RoleController_1.default.getAll);
/**
 * @route POST /role
 * @param {RoleAttributes.model} role.body.required - the new role
 * @returns {object} 200 - new role info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', RoleController_1.default.create);
module.exports = router;
//# sourceMappingURL=role.routes.js.map