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
class WorkReportController {
    constructor() {
        this.createWorkReport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const workReport = {
                workReportId: req.body.workReportId,
                invoiceId: req.body.invoiceId,
                title: req.body.title ? req.body.title : null,
                workingTime: req.body.workingTime,
                workInfo: req.body.workInfo ? req.body.workInfo : null,
                relatedDocument: req.body.relatedDocument ? req.body.relatedDocument : null,
            };
            yield init_models_1.WorkReport.create(workReport)
                .then((workReport) => {
                res.status(200).send({ workReport });
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
        this.getWorkReportById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // req.query.workReportId
            //   -> 新規登録: invoiceCode
            //   -> 更新: workReportId
            const workReportId = req.query.workReportId;
            yield init_models_1.WorkReport.findOne({
                where: { workReportId: workReportId },
            })
                .then((workReport) => {
                // 更新時データ取得
                if (workReport !== null) {
                    init_models_1.Invoice.findOne({
                        where: { invoiceId: workReport.invoiceId },
                    }).then((invoice) => {
                        if (invoice !== null) {
                            init_models_1.Order.findOne({
                                where: { orderId: invoice.orderId },
                            }).then((order) => {
                                if (order !== null) {
                                    init_models_1.Estimate.findOne({
                                        where: { estimateId: order.estimateId },
                                    }).then((estimate) => {
                                        if (estimate !== null) {
                                            init_models_1.Service.findByPk(estimate === null || estimate === void 0 ? void 0 : estimate.serviceId, { attributes: ['clientCode', 'serviceStartDate', 'serviceEndDate'] }).then((service) => {
                                                if (service !== null) {
                                                    init_models_1.Client.findByPk(service.clientCode, { attributes: ['clientName'] }).then((client) => {
                                                        if (client !== null) {
                                                            init_models_1.InvoiceDetail.findAll({
                                                                where: { invoiceId: invoice.invoiceId },
                                                                order: [['index', 'ASC']],
                                                            }).then((invoiceDetails) => {
                                                                if (invoiceDetails !== null) {
                                                                    let members = [];
                                                                    // 請求の全メンバー取得
                                                                    invoiceDetails.map((detail) => {
                                                                        if (detail.person !== null) {
                                                                            members.push(String(detail.person));
                                                                        }
                                                                    });
                                                                    const findData = {
                                                                        workReportId: workReport.workReportId,
                                                                        invoiceId: workReport.invoiceId,
                                                                        title: workReport.title,
                                                                        orderNumber: order.orderNumber,
                                                                        orderName: order.orderName,
                                                                        serviceStartDate: service.serviceStartDate,
                                                                        serviceEndDate: service.serviceEndDate,
                                                                        clientCode: client.clientCode,
                                                                        clientName: client.clientName,
                                                                        members: members,
                                                                        workingTime: workReport.workingTime,
                                                                        workInfo: workReport.workInfo,
                                                                        relatedDocument: workReport.relatedDocument,
                                                                    };
                                                                    res.status(200).send(findData);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                    // 新規作成時データ取得
                }
                else {
                    init_models_1.Invoice.findOne({
                        where: { invoiceId: workReportId },
                    }).then((invoice) => {
                        if (invoice !== null) {
                            init_models_1.Order.findOne({
                                where: { orderId: invoice.orderId },
                            }).then((order) => {
                                if (order !== null) {
                                    init_models_1.Estimate.findOne({
                                        where: { estimateId: order.estimateId },
                                    }).then((estimate) => {
                                        if (estimate !== null) {
                                            init_models_1.Service.findByPk(estimate === null || estimate === void 0 ? void 0 : estimate.serviceId, { attributes: ['clientCode', 'serviceStartDate', 'serviceEndDate'] }).then((service) => {
                                                if (service !== null) {
                                                    init_models_1.Client.findByPk(service.clientCode, { attributes: ['clientName'] }).then((client) => {
                                                        if (client !== null) {
                                                            init_models_1.InvoiceDetail.findAll({
                                                                where: { invoiceId: invoice.invoiceId },
                                                                order: [['index', 'ASC']],
                                                            }).then((invoiceDetails) => {
                                                                if (invoiceDetails !== null) {
                                                                    let members = [];
                                                                    // 請求の全メンバー取得
                                                                    invoiceDetails.map((detail) => {
                                                                        if (detail.person !== null) {
                                                                            members.push(String(detail.person));
                                                                        }
                                                                    });
                                                                    // workReport関係存在なし
                                                                    const findData = {
                                                                        orderNumber: order.orderNumber,
                                                                        orderName: order.orderName,
                                                                        serviceStartDate: service.serviceStartDate,
                                                                        serviceEndDate: service.serviceEndDate,
                                                                        clientCode: client.clientCode,
                                                                        clientName: client.clientName,
                                                                        members: members,
                                                                    };
                                                                    res.status(200).send(findData);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            })
                .catch(() => res.send(null));
        });
        this.updateWorkReport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const workReportId = req.params.id;
            const workReport = {
                title: req.body.title ? req.body.title : null,
                workingTime: req.body.workingTime,
                workInfo: req.body.workInfo ? req.body.workInfo : null,
                relatedDocument: req.body.relatedDocument ? req.body.relatedDocument : null,
                updatedAt: new Date(),
            };
            yield init_models_1.WorkReport.update(workReport, {
                where: { workReportId: workReportId },
            })
                .then((workReport) => {
                res.status(200).send({ workReport });
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
    }
}
const PC = new WorkReportController();
exports.default = PC;
//# sourceMappingURL=WorkReportController.js.map