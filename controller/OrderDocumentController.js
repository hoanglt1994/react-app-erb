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
class OrderDocumentController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            req.body.documents.forEach((item) => {
                const attr = {
                    orderId: req.body.orderId,
                    documentId: item,
                };
                init_models_1.OrderDocument.create(attr)
                    .then(() => {
                    res.status(200).send({
                        message: 'order document was deleted successfully.',
                    });
                })
                    .catch((err) => {
                    res.status(500).send({
                        message: err.message || 'fail to create order document',
                    });
                });
            });
        });
        this.getOrderDocuments = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const orderDocuments = yield init_models_1.OrderDocument.findAll({ attributes: ['documentId'], where: { orderId: req.params.id } });
            const arrDocId = orderDocuments ? orderDocuments.map((doc) => doc.documentId).filter(Boolean) : [];
            req.documents = arrDocId;
            next();
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.OrderDocument.destroy({ where: { documentId: req.params.id } })
                .then((document) => {
                res.status(200).send({ document });
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message,
                });
            });
        });
    }
}
const PC = new OrderDocumentController();
exports.default = PC;
//# sourceMappingURL=OrderDocumentController.js.map