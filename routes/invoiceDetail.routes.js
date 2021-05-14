"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InvoiceDetailController_1 = __importDefault(require("../controller/InvoiceDetailController"));
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @route PUT /invoiceDetail/{id}
 * @operationId updateInvDetailDelFlg
 * @param {number} id.path.required
 * @returns {Array} 200 - Information of deleted invoice detail
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', InvoiceDetailController_1.default.updateDeleteFlag);
module.exports = router;
//# sourceMappingURL=invoiceDetail.routes.js.map