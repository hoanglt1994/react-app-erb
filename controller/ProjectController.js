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
class ProjectController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.Project.findAll().then((projects) => res.status(200).send(projects));
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const attr = {
                projectCode: req.body.projectCode.trim(),
                projectName: req.body.projectName.trim(),
            };
            yield init_models_1.Project.create(attr)
                .then((project) => {
                res.status(200).send({ project });
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
        this.getByCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.Project.findByPk(req.query.projectCode, { attributes: ['projectCode', 'projectName'] }).then((project) => res.status(200).send(project));
        });
        this.getProjectAndService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.Project.findAll({
                attributes: ['projectCode', 'projectName'],
                include: [
                    {
                        model: init_models_1.Service,
                        attributes: ['serviceId', 'serviceCode', 'serviceName'],
                    },
                ],
            }).then((projects) => res.status(200).send(projects));
        });
    }
}
const PC = new ProjectController();
exports.default = PC;
//# sourceMappingURL=ProjectController.js.map