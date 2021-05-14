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
class InvoiceController {
    constructor() {
        this.createInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const header = {
                invoiceCode: req.body.invoiceCode,
                invoiceDate: req.body.invoiceDate ? req.body.invoiceDate : null,
                status: req.body.status.trim(),
                paymentDate: req.body.paymentDate ? req.body.paymentDate : null,
                orderId: req.body.orderId,
                deleteFlg: false,
            };
            const order = init_models_1.Order.findAll({ attributes: ['orderId'], where: { orderId: header.orderId } });
            if (!order) {
                res.status(400);
            }
            const details = req.body.details;
            if (details.remarks === '4') {
                const employee = init_models_1.Employee.findAll({ attributes: ['employeeCode'], where: { employeeCode: details.person.trim() } });
                if (!employee) {
                    res.status(400);
                }
            }
            yield init_models_1.Invoice.create(header)
                .then((invoice) => {
                if (details.length > 0) {
                    const createDetail = details.forEach((value) => {
                        init_models_1.InvoiceDetail.create({
                            index: value.index,
                            invoiceId: invoice.invoiceId,
                            note: value.note,
                            person: value.person,
                            price: value.price,
                            quantity: value.quantity,
                            remarks: value.remarks,
                            unit: value.unit,
                            unitPrice: value.unitPrice,
                            orderDetailId: value.orderDetailId,
                            deleteFlg: false,
                            createdAt: undefined,
                            updatedAt: undefined,
                        })
                            .then((invoiceDetail) => {
                            res.status(200).send(invoiceDetail);
                        })
                            .catch(() => res.status(400));
                    });
                    if (createDetail) {
                        res.status(200).send(invoice);
                    }
                }
                else {
                    res.status(200).send(invoice);
                }
                res.status(200).send(invoice);
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
        this.getInvoiceById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const invoiceId = req.query.invoiceId;
            yield init_models_1.Invoice.findOne({
                where: { invoiceId: invoiceId, deleteFlg: false },
            }).then((invoice) => {
                if (invoice !== null) {
                    init_models_1.Order.findOne({ where: { orderId: invoice.orderId } }).then((order) => {
                        if (order !== null) {
                            let orderData;
                            orderData = { orderId: order.orderId, orderCode: order.orderCode, orderStatus: order.status ? order.status : '' };
                            init_models_1.Estimate.findOne({ where: { estimateId: order.estimateId } }).then((estimate) => {
                                if (estimate !== null) {
                                    orderData = Object.assign(Object.assign({}, orderData), { Estimate: { estimateId: estimate.estimateId, estimateCode: estimate.estimateCode, estimateStatus: estimate.status ? estimate.status : '' } });
                                    init_models_1.Service.findByPk(estimate === null || estimate === void 0 ? void 0 : estimate.serviceId, { attributes: ['serviceCode', 'serviceName', 'projectCode', 'clientCode', 'serviceStartDate', 'serviceEndDate'] }).then((service) => {
                                        if (service !== null) {
                                            init_models_1.Project.findByPk(service.projectCode, { attributes: ['projectName'] }).then((project) => {
                                                init_models_1.Client.findByPk(service.clientCode, { attributes: ['clientName'] }).then((client) => {
                                                    init_models_1.InvoiceDetail.findAll({ where: { invoiceId: invoice.invoiceId }, order: [['index', 'ASC']] }).then((invoiceDetails) => {
                                                        var _a, _b, _c, _d;
                                                        const findData = {
                                                            projectCode: service.projectCode,
                                                            projectName: project === null || project === void 0 ? void 0 : project.projectName,
                                                            serviceStartDate: service.serviceStartDate,
                                                            serviceEndDate: service.serviceEndDate,
                                                            serviceId: estimate.serviceId,
                                                            serviceCode: service.serviceCode,
                                                            serviceName: service.serviceName,
                                                            clientCode: service.clientCode,
                                                            clientName: client === null || client === void 0 ? void 0 : client.clientName,
                                                            orderId: order.orderId,
                                                            orderCode: (_a = order.orderCode) === null || _a === void 0 ? void 0 : _a.trim(),
                                                            estimateId: order.estimateId,
                                                            invoiceId: invoice.invoiceId,
                                                            invoiceCode: (_b = invoice.invoiceCode) === null || _b === void 0 ? void 0 : _b.trim(),
                                                            status: invoice.status,
                                                            paymentDate: invoice.paymentDate,
                                                            invoiceDate: invoice.invoiceDate,
                                                            details: invoiceDetails,
                                                            orderNumber: (_c = order.orderNumber) === null || _c === void 0 ? void 0 : _c.trim(),
                                                            orderName: (_d = order.orderName) === null || _d === void 0 ? void 0 : _d.trim(),
                                                            Order: orderData,
                                                        };
                                                        res.send(findData);
                                                    });
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    res.send({ message: `invoiceId「${invoiceId} 」does not existed.` });
                }
            });
        });
        this.invoiceCheckCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const invoiceCode = req.query.invoiceCode.trim();
            yield init_models_1.Invoice.findOne({ where: { invoiceCode: invoiceCode } })
                .then((invoice) => {
                if (invoice !== null) {
                    res.status(200).send({ invoiceCode: invoice.invoiceCode });
                }
                else
                    res.send(null);
            })
                .catch(() => res.send(null));
        });
        this.updateInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const invoiceId = req.params.id;
            const header = {
                invoiceCode: req.body.invoiceCode,
                invoiceDate: req.body.invoiceDate ? req.body.invoiceDate : null,
                status: req.body.status.trim(),
                paymentDate: req.body.paymentDate ? req.body.paymentDate : null,
                orderId: req.body.orderId,
            };
            const details = req.body.details;
            init_models_1.Invoice.update(Object.assign(Object.assign({}, header), { updatedAt: new Date() }), {
                where: { invoiceId: invoiceId },
            })
                .then((invoice) => {
                if (req.body.deleteDetails.length > 0) {
                    req.body.deleteDetails.forEach((detail) => {
                        init_models_1.InvoiceDetail.destroy({ where: { invoiceDetailId: detail } });
                    });
                }
                details.forEach((value) => {
                    if (value.invoiceDetailId) {
                        init_models_1.InvoiceDetail.findAll({ where: { invoiceDetailId: value.invoiceDetailId } }).then(() => {
                            init_models_1.InvoiceDetail.update({
                                index: Number(value.index),
                                invoiceId: invoiceId,
                                note: value.note,
                                person: value.person,
                                price: value.price,
                                quantity: value.quantity,
                                remarks: value.remarks,
                                unit: value.unit,
                                unitPrice: value.unitPrice,
                                createdAt: undefined,
                                updatedAt: new Date(),
                            }, { where: { invoiceDetailId: value.invoiceDetailId } })
                                .then((invoiceDetail) => {
                                if (invoiceDetail[0] === 1) {
                                    res.send({
                                        message: 'Invoice Detail was updated successfully.',
                                    });
                                }
                                else {
                                    res.send({
                                        message: `Cannot update Invoice Detail with orderDetailId=${details.invoiceDetailId}.`,
                                    });
                                }
                            })
                                .catch(() => res.status(400));
                        });
                    }
                    else {
                        init_models_1.InvoiceDetail.create({
                            index: Number(value.index),
                            invoiceId: value.invoiceId,
                            note: value.note,
                            person: value.person,
                            price: value.price,
                            quantity: value.quantity,
                            remarks: value.remarks,
                            unit: value.unit,
                            unitPrice: value.unitPrice,
                            orderDetailId: value.orderDetailId,
                            deleteFlg: false,
                            createdAt: undefined,
                            updatedAt: undefined,
                        })
                            .then((invoiceDetail) => {
                            res.status(200).send(invoiceDetail);
                        })
                            .catch(() => res.status(400));
                    }
                });
                if (invoice[0] === 1) {
                    res.send({
                        message: 'Invoice was updated successfully.',
                    });
                }
                else {
                    res.send({
                        message: `Cannot update Invoice with orderId=${invoiceId}.`,
                    });
                }
            })
                .catch(() => {
                res.status(500).send({
                    message: 'Error updating Invoice with invoiceId=' + invoiceId,
                });
            });
        });
        this.deleteInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.Invoice.findByPk(req.params.id).then((invoice) => {
                if (invoice !== null) {
                    init_models_1.Invoice.update({ deleteFlg: true }, { where: { invoiceId: req.params.id } }).then(() => {
                        res.send({
                            message: 'Invoice was deleted successfully.',
                        });
                    });
                }
            });
        });
    }
}
const PC = new InvoiceController();
exports.default = PC;
//# sourceMappingURL=InvoiceController.js.map