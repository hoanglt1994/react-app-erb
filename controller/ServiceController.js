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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const EstimateController_1 = __importDefault(require("./EstimateController"));
const db = require('../models');
const init_models_1 = require("../models/init-models");
init_models_1.initModels(db.sequelize);
class ServiceController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.Service.findAll({ attributes: ['serviceCode', 'serviceName'], order: [['serviceCode', 'ASC']] }).then((service) => res.status(200).send(service));
        });
        this.getServiceCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const serviceCode = req.query.serviceCode;
            const condition = serviceCode ? { serviceCode: { [sequelize_1.Op.like]: `${serviceCode}%` } } : undefined;
            yield init_models_1.Service.findAll({ attributes: ['serviceCode'], where: condition }).then((service) => {
                res.status(200).send(service);
            });
        });
        this.createService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const attr = {
                serviceCode: req.body.serviceCode.trim(),
                serviceName: req.body.serviceName.trim(),
                projectCode: req.body.projectCode.trim(),
                serviceStartDate: req.body.serviceStartDate,
                serviceEndDate: req.body.serviceEndDate,
                clientCode: req.body.clientCode.trim(),
                employeeCode: req.body.employeeCode.trim(),
                clientEmployeeCode: req.body.clientEmployeeCode !== '' ? req.body.clientEmployeeCode : null,
                description: req.body.description !== '' ? req.body.description : null,
                deleteFlg: false,
            };
            yield init_models_1.Project.findAll({ attributes: ['projectCode'], where: { projectCode: attr.projectCode } })
                .then()
                .catch(() => res.status(400));
            yield init_models_1.Client.findAll({ attributes: ['clientCode'], where: { clientCode: attr.clientCode } })
                .then()
                .catch(() => res.status(400));
            yield init_models_1.ClientEmployee.findAll({ attributes: ['clientEmployeeCode'], where: { clientEmployeeCode: attr.clientEmployeeCode } })
                .then()
                .catch(() => res.status(400));
            yield init_models_1.Employee.findAll({ attributes: ['employeeCode'], where: { employeeCode: attr.employeeCode } })
                .then()
                .catch(() => res.status(400));
            yield init_models_1.Service.create(attr)
                .then((service) => {
                res.status(200).send(service);
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
        this.getServiceById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.Service.findOne({ where: { serviceId: req.query.serviceId, deleteFlg: false } }).then((service) => {
                if (service !== null) {
                    init_models_1.ClientEmployee.findByPk(service === null || service === void 0 ? void 0 : service.clientEmployeeCode).then((clientEmployeeInfo) => {
                        init_models_1.Project.findByPk(service === null || service === void 0 ? void 0 : service.projectCode, { attributes: ['projectName'] }).then((project) => {
                            init_models_1.Client.findByPk(service === null || service === void 0 ? void 0 : service.clientCode, { attributes: ['clientName'] }).then((client) => {
                                const resData = {
                                    serviceId: service === null || service === void 0 ? void 0 : service.serviceId,
                                    serviceCode: service === null || service === void 0 ? void 0 : service.serviceCode,
                                    serviceName: service === null || service === void 0 ? void 0 : service.serviceName,
                                    projectCode: service === null || service === void 0 ? void 0 : service.projectCode,
                                    projectName: project === null || project === void 0 ? void 0 : project.projectName,
                                    clientCode: service === null || service === void 0 ? void 0 : service.clientCode,
                                    clientName: client === null || client === void 0 ? void 0 : client.clientName,
                                    employeeCode: service === null || service === void 0 ? void 0 : service.employeeCode,
                                    serviceStartDate: service === null || service === void 0 ? void 0 : service.serviceStartDate,
                                    serviceEndDate: service === null || service === void 0 ? void 0 : service.serviceEndDate,
                                    clientEmployeeCode: service === null || service === void 0 ? void 0 : service.clientEmployeeCode,
                                    clientEmployeeName: clientEmployeeInfo === null || clientEmployeeInfo === void 0 ? void 0 : clientEmployeeInfo.clientEmployeeName,
                                    departmentName: clientEmployeeInfo === null || clientEmployeeInfo === void 0 ? void 0 : clientEmployeeInfo.departmentName,
                                    phoneNumber: clientEmployeeInfo === null || clientEmployeeInfo === void 0 ? void 0 : clientEmployeeInfo.phoneNumber,
                                    email: clientEmployeeInfo === null || clientEmployeeInfo === void 0 ? void 0 : clientEmployeeInfo.email,
                                    description: service === null || service === void 0 ? void 0 : service.description,
                                };
                                res.status(200).send(resData);
                            });
                        });
                    });
                }
                else {
                    res.send({
                        message: `serviceId「${req.query.serviceId}」 does not existed.`,
                    });
                }
            });
        });
        this.updateService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const serviceId = req.params.id;
            init_models_1.Service.update(Object.assign(Object.assign({}, req.body), { updatedAt: new Date() }), {
                where: { serviceId: serviceId },
            })
                .then((service) => {
                if (service[0] === 1) {
                    res.send({
                        message: 'Service was updated successfully.',
                    });
                }
                else {
                    res.send({
                        message: `Cannot update Service with serviceId=${serviceId}. Maybe Service was not found or req.body is empty!`,
                    });
                }
            })
                .catch(() => {
                res.status(500).send({
                    message: 'Error updating Service with serviceId=' + serviceId,
                });
            });
        });
        this.deleteService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const deleteService = () => init_models_1.Service.update({ deleteFlg: true }, { where: { serviceId: req.params.id } }).then(() => {
                res.send({
                    message: 'Service was deleted successfully.',
                });
            });
            yield init_models_1.Service.findOne({ where: { serviceId: req.params.id } }).then((service) => {
                if (service !== null) {
                    EstimateController_1.default.deleteEstimate(req.params.id, {}).then(() => deleteService());
                }
            });
        });
    }
}
const PC = new ServiceController();
exports.default = PC;
//# sourceMappingURL=ServiceController.js.map