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
class OrderDetailController {
    constructor() {
        this.updateInvoiceFlag = (req, res) => __awaiter(this, void 0, void 0, function* () {
            req.body.forEach((id) => {
                init_models_1.OrderDetail.update({ invoiceFlag: req.query.flag }, {
                    where: { orderDetailId: id },
                })
                    .then(() => {
                    res.status(200).send({
                        message: 'update successfully.',
                    });
                })
                    .catch((err) => {
                    res.status(500).send({
                        message: err.message,
                    });
                });
            });
        });
        this.getByOrderId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.OrderDetail.findAll({ where: { orderId: req.query.orderId } })
                .then((data) => {
                res.send(data);
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message,
                });
            });
        });
    }
}
const PC = new OrderDetailController();
exports.default = PC;
//# sourceMappingURL=OrderDetailController.js.map