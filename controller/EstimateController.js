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
const db = require('../models');
const init_models_1 = require("../models/init-models");
const OrderController_1 = __importDefault(require("./OrderController"));
init_models_1.initModels(db.sequelize);
class EstimateController {
    constructor() {
        this.createEstimate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const header = {
                estimateCode: req.body.estimateCode,
                serviceId: req.body.serviceId,
                status: req.body.status.trim(),
                estimateDate: req.body.estimateDate ? req.body.estimateDate : null,
                deleteFlg: false,
                orderFlg: false,
            };
            const service = init_models_1.Service.findAll({ attributes: ['serviceId'], where: { serviceId: header.serviceId } });
            if (!service) {
                res.status(400);
            }
            const details = req.body.details;
            if (details.remarks === '4') {
                const employee = init_models_1.Employee.findAll({ attributes: ['employeeCode'], where: { employeeCode: details.person.trim() } });
                if (!employee) {
                    res.status(400);
                }
            }
            yield init_models_1.Estimate.create(header)
                .then((estimate) => {
                if (details.length > 0) {
                    const createDetail = details.forEach((value) => {
                        init_models_1.EstimateDetail.create({
                            index: Number(value.index),
                            estimateId: estimate.estimateId,
                            note: value.note,
                            person: value.person,
                            price: value.price,
                            quantity: value.quantity,
                            remarks: value.remarks,
                            unit: value.unit,
                            unitPrice: value.unitPrice,
                            createdAt: undefined,
                            updatedAt: undefined,
                        })
                            .then(() => {
                            res.status(200).send();
                        })
                            .catch(() => res.status(400));
                    });
                    if (createDetail) {
                        res.status(200).send(estimate);
                    }
                }
                res.status(200).send(estimate);
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
        this.getEstimateById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const estimateId = req.query.estimateId;
            yield init_models_1.Estimate.findOne({ where: { estimateId: estimateId, deleteFlg: false } }).then((estimate) => {
                if (estimate !== null) {
                    let linkData;
                    init_models_1.Order.findOne({
                        attributes: ['orderId', 'orderCode', ['status', 'orderStatus']],
                        where: { estimateId: estimateId, deleteFlg: false },
                        include: [
                            {
                                model: init_models_1.Invoice,
                                where: { deleteFlg: false },
                                attributes: ['invoiceId', 'invoiceCode', ['status', 'invoiceStatus']],
                                order: ['invoiceDate', 'ASC'],
                                required: false,
                            },
                        ],
                    }).then((data) => {
                        linkData = data;
                    });
                    init_models_1.Service.findByPk(estimate === null || estimate === void 0 ? void 0 : estimate.serviceId, { attributes: ['serviceCode', 'serviceName', 'projectCode', 'clientCode', 'serviceStartDate', 'serviceEndDate'] }).then((service) => {
                        init_models_1.Project.findByPk(service === null || service === void 0 ? void 0 : service.projectCode, { attributes: ['projectName'] }).then((project) => {
                            init_models_1.Client.findByPk(service === null || service === void 0 ? void 0 : service.clientCode, { attributes: ['clientName'] }).then((client) => {
                                init_models_1.EstimateDetail.findAll({
                                    where: { estimateId: estimateId },
                                    order: [['index', 'ASC']],
                                }).then((details) => {
                                    var _a;
                                    if (estimate && details.length > 0) {
                                        const findData = {
                                            estimateId: estimate === null || estimate === void 0 ? void 0 : estimate.estimateId,
                                            estimateCode: (_a = estimate.estimateCode) === null || _a === void 0 ? void 0 : _a.trim(),
                                            serviceId: estimate === null || estimate === void 0 ? void 0 : estimate.serviceId,
                                            serviceCode: service === null || service === void 0 ? void 0 : service.serviceCode,
                                            serviceName: service === null || service === void 0 ? void 0 : service.serviceName,
                                            serviceStartDate: service === null || service === void 0 ? void 0 : service.serviceStartDate,
                                            serviceEndDate: service === null || service === void 0 ? void 0 : service.serviceEndDate,
                                            projectCode: service === null || service === void 0 ? void 0 : service.projectCode,
                                            projectName: project === null || project === void 0 ? void 0 : project.projectName,
                                            clientCode: service === null || service === void 0 ? void 0 : service.clientCode,
                                            clientName: client === null || client === void 0 ? void 0 : client.clientName,
                                            status: estimate === null || estimate === void 0 ? void 0 : estimate.status,
                                            estimateDate: estimate === null || estimate === void 0 ? void 0 : estimate.estimateDate,
                                            details: details,
                                            linkData: linkData,
                                            orderFlg: estimate.orderFlg,
                                        };
                                        res.status(200).send(findData);
                                    }
                                    res.status(200).send();
                                });
                            });
                        });
                    });
                }
                else {
                    res.send({
                        message: `estimateId 「${estimateId}」 does not existed.`,
                    });
                }
            });
        });
        this.estimateCheckCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const estimateCode = req.query.estimateCode.trim();
            yield init_models_1.Estimate.findOne({ where: { estimateCode: estimateCode } })
                .then((estimate) => {
                if (estimate !== null) {
                    res.status(200).send({ estimateCode: estimate.estimateCode });
                }
                else
                    res.send(null);
            })
                .catch(() => res.send(null));
        });
        this.updateEstimate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const estimateId = req.params.id;
            const header = {
                estimateCode: req.body.estimateCode.trim(),
                serviceId: req.body.serviceId,
                status: req.body.status.trim(),
                estimateDate: req.body.estimateDate ? req.body.estimateDate : null,
                deleteFlg: req.body.deleteFlg,
                orderFlg: req.body.orderFlg,
            };
            const details = req.body.details;
            init_models_1.Estimate.update(Object.assign(Object.assign({}, header), { updatedAt: new Date() }), {
                where: { estimateId: estimateId },
            })
                .then((estimate) => {
                if (req.body.deleteDetails.length > 0) {
                    req.body.deleteDetails.forEach((detail) => {
                        init_models_1.EstimateDetail.destroy({ where: { estimateDetailId: detail } });
                    });
                }
                details.forEach((value) => {
                    if (value.estimateDetailId) {
                        init_models_1.EstimateDetail.findAll({ where: { estimateDetailId: value.estimateDetailId } }).then(() => {
                            init_models_1.EstimateDetail.update({
                                index: Number(value.index),
                                estimateId: value.estimateId,
                                note: value.note,
                                person: value.person,
                                price: value.price,
                                quantity: value.quantity,
                                remarks: value.remarks,
                                unit: value.unit,
                                unitPrice: value.unitPrice,
                                createdAt: undefined,
                                updatedAt: new Date(),
                            }, { where: { estimateDetailId: value.estimateDetailId } })
                                .then((estimateDetail) => {
                                if (estimateDetail[0] === 1) {
                                    res.send({
                                        message: 'Estimate Detail was updated successfully.',
                                    });
                                }
                                else {
                                    res.send({
                                        message: `Cannot update Estimate Detail with estimateDetailId=${details.estimateDetailId}.`,
                                    });
                                }
                            })
                                .catch(() => res.status(400));
                        });
                    }
                    else {
                        init_models_1.EstimateDetail.create({
                            index: Number(value.index),
                            estimateId: value.estimateId,
                            note: value.note,
                            person: value.person,
                            price: value.price,
                            quantity: value.quantity,
                            remarks: value.remarks,
                            unit: value.unit,
                            unitPrice: value.unitPrice,
                            createdAt: undefined,
                            updatedAt: undefined,
                        })
                            .then(() => {
                            res.status(200).send();
                        })
                            .catch(() => res.status(400));
                    }
                });
                if (estimate[0] === 1) {
                    res.send({
                        message: 'Estimate was updated successfully.',
                    });
                }
                else {
                    res.send({
                        message: `Cannot update Estimate with estimateId=${estimateId}.`,
                    });
                }
            })
                .catch(() => {
                res.status(500).send({
                    message: 'Error updating Estimate with estimateId=' + estimateId,
                });
            });
        });
        this.deleteEstimate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const whereCondition = req.params && req.params.id ? req.params.id : req;
            let condition = {};
            if (req.params && req.params.id) {
                condition = { estimateId: whereCondition };
            }
            else {
                condition = { serviceId: whereCondition };
            }
            const deleteEstimate = () => init_models_1.Estimate.update({ deleteFlg: true }, { where: condition }).then(() => {
                res.send({
                    message: 'Estimate was deleted successfully.',
                });
            });
            yield init_models_1.Estimate.findAll({ where: condition }).then((estimates) => {
                if (estimates.length > 0) {
                    estimates.forEach((estimate) => {
                        OrderController_1.default.deleteOrder(estimate.estimateId, {}).then(() => deleteEstimate());
                    });
                }
                else {
                    deleteEstimate();
                }
            });
        });
    }
}
const PC = new EstimateController();
exports.default = PC;
//# sourceMappingURL=EstimateController.js.map