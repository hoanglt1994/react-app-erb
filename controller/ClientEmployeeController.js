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
class ClientEmployeeController {
    constructor() {
        this.getClientEmployeesByClientCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const clientCode = req.query.clientCode;
            const condition = clientCode ? { clientCode: `${clientCode} ` } : undefined;
            console.log(req);
            yield init_models_1.ClientEmployee.findAll({ where: condition }).then((clientEmployees) => {
                res.status(200).send(clientEmployees);
            });
        });
        this.postClientEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const createValue = {
                clientEmployeeCode: req.body.clientEmployeeCode.trim() !== '' ? req.body.clientEmployeeCode.trim() : null,
                clientEmployeeName: req.body.clientEmployeeName.trim() !== '' ? req.body.clientEmployeeName.trim() : null,
                clientCode: req.body.clientCode.trim() !== '' ? req.body.clientCode.trim() : null,
                departmentName: req.body.departmentName.trim() !== '' ? req.body.departmentName.trim() : null,
                phoneNumber: req.body.phoneNumber.trim() !== '' ? req.body.phoneNumber.trim() : null,
                email: req.body.email.trim() !== '' ? req.body.email.trim() : null,
            };
            console.log(req);
            const client = init_models_1.Client.findAll({ attributes: ['clientCode'], where: { clientCode: req.body.clientCode } });
            if (!client) {
                res.status(400);
            }
            yield init_models_1.ClientEmployee.create(createValue)
                .then((clientEmployee) => res.status(200).send({ clientEmployee }))
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
    }
}
const PC = new ClientEmployeeController();
exports.default = PC;
//# sourceMappingURL=ClientEmployeeController.js.map