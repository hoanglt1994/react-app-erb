"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../models');
const init_models_1 = require("../models/init-models");
init_models_1.initModels(db.sequelize);
init_models_1.initModels(db.sequelize);
class InvoiceDetailController {
    constructor() {
        this.updateDeleteFlag = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.InvoiceDetail.update({ deleteFlg: true }, {
                where: { invoiceId: req.params.id },
            });
            init_models_1.InvoiceDetail.findAll({ where: { deleteFlg: true, invoiceId: req.params.id } }).then((invoiceDetail) => {
                res.status(200).send(invoiceDetail);
            });
        });
    }
}
const PC = new InvoiceDetailController();
exports.default = PC;
//# sourceMappingURL=invoiceDetailController.js.map