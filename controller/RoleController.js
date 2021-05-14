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
class RoleController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.Role.findAll({ attributes: ['roleId', 'roleName'] }).then((roles) => res.status(200).send(roles));
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            const attr = {
                roleId: req.body.roleId,
                roleName: req.body.roleName.trim(),
            };
            yield init_models_1.Role.create(attr)
                .then((role) => {
                res.status(200).send({ role });
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
    }
}
const PC = new RoleController();
exports.default = PC;
//# sourceMappingURL=RoleController.js.map