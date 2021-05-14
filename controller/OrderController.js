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
class OrderController {
    constructor() {
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const header = {
                orderCode: req.body.orderCode,
                estimateId: req.body.estimateId,
                status: req.body.status.trim(),
                orderDate: req.body.orderDate ? req.body.orderDate : null,
                orderNumber: req.body.orderNumber.trim(),
                orderName: req.body.orderName.trim(),
                description: req.body.description.trim(),
                deleteFlg: false,
            };
            const estimate = init_models_1.Estimate.findAll({ attributes: ['estimateId'], where: { estimateId: header.estimateId } });
            if (!estimate) {
                res.status(400);
            }
            const details = req.body.details;
            if (details.remarks === '4') {
                const employee = init_models_1.Employee.findAll({ attributes: ['employeeCode'], where: { employeeCode: details.person.trim() } });
                if (!employee) {
                    res.status(400);
                }
            }
            yield init_models_1.Order.create(header)
                .then((order) => {
                if (details.length > 0) {
                    const createDetail = details.forEach((value) => {
                        init_models_1.OrderDetail.create({
                            index: value.index,
                            orderId: order.orderId,
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
                            .then((orderDetail) => {
                            res.status(200).send(orderDetail);
                        })
                            .catch(() => res.status(400));
                    });
                    init_models_1.Estimate.update({ orderFlg: true }, {
                        where: { estimateId: header.estimateId },
                    })
                        .then(() => {
                        res.status(200);
                    })
                        .catch((err) => {
                        res.status(500).send({
                            message: err.message,
                        });
                    });
                    if (createDetail) {
                        res.status(200).send({ order });
                    }
                }
                else {
                    res.status(200).send(order);
                }
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
        this.getOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const orderId = req.query.orderId;
            yield init_models_1.Order.findOne({
                where: { orderId: orderId, deleteFlg: false },
            }).then((order) => {
                if (order !== null) {
                    const invoices = [];
                    init_models_1.Invoice.findAll({
                        where: { orderId: order.orderId, deleteFlg: false },
                        attributes: ['invoiceId', 'invoiceCode', 'status', 'invoiceDate'],
                        order: [['invoiceDate', 'DESC']],
                    }).then((is) => {
                        is.forEach((i) => {
                            var _a;
                            if (((_a = i.status) === null || _a === void 0 ? void 0 : _a.trim()) !== '')
                                invoices.push({ id: i.invoiceId, code: i.invoiceCode, status: i.status });
                        });
                    });
                    init_models_1.Estimate.findOne({ where: { estimateId: order.estimateId } }).then((estimate) => {
                        if (estimate !== null) {
                            init_models_1.Service.findByPk(estimate === null || estimate === void 0 ? void 0 : estimate.serviceId, { attributes: ['serviceCode', 'serviceName', 'projectCode', 'clientCode', 'serviceStartDate', 'serviceEndDate'] }).then((service) => {
                                if (service !== null) {
                                    init_models_1.Project.findByPk(service.projectCode, { attributes: ['projectName'] }).then((project) => {
                                        init_models_1.Client.findByPk(service.clientCode, { attributes: ['clientName'] }).then((client) => {
                                            init_models_1.OrderDetail.findAll({ where: { orderId: order.orderId }, order: [['index', 'ASC']] }).then((orderDetails) => {
                                                var _a, _b;
                                                const findData = {
                                                    projectCode: service.projectCode,
                                                    projectName: project === null || project === void 0 ? void 0 : project.projectName,
                                                    serviceStartDate: service.serviceStartDate,
                                                    serviceEndDate: service.serviceEndDate,
                                                    serviceCode: service.serviceCode,
                                                    serviceName: service.serviceName,
                                                    clientCode: service.clientCode,
                                                    clientName: client === null || client === void 0 ? void 0 : client.clientName,
                                                    status: order.status,
                                                    orderId: order.orderId,
                                                    orderCode: (_a = order.orderCode) === null || _a === void 0 ? void 0 : _a.trim(),
                                                    estimateId: order.estimateId,
                                                    orderDate: order.orderDate,
                                                    orderNumber: order.orderNumber,
                                                    orderName: order.orderName,
                                                    description: order.description,
                                                    details: orderDetails,
                                                    estimate: ((_b = estimate.status) === null || _b === void 0 ? void 0 : _b.trim()) !== '' ? { estimateId: estimate.estimateId, estimateCode: estimate.estimateCode, estimateStatus: estimate.status } : {},
                                                    invoices: invoices,
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
                else {
                    res.send({ message: `orderId「${orderId}」 does not existed.` });
                }
            });
        });
        this.orderCheckCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const orderCode = (_a = req.query.orderCode) === null || _a === void 0 ? void 0 : _a.trim();
            yield init_models_1.Order.findOne({ where: { orderCode: orderCode } })
                .then((order) => {
                if (order !== null) {
                    res.status(200).send({ orderCode: order.orderCode });
                }
                else
                    res.send(null);
            })
                .catch(() => res.send(null));
        });
        this.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            const header = {
                orderCode: req.body.orderCode.trim(),
                estimateId: req.body.estimateId,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                status: req.body.status.trim(),
                orderDate: req.body.orderDate ? req.body.orderDate : null,
                orderNumber: req.body.orderNumber.trim(),
                orderName: req.body.orderName.trim(),
                description: req.body.description.trim(),
            };
            const details = req.body.details;
            init_models_1.Order.update(Object.assign(Object.assign({}, header), { updatedAt: new Date() }), {
                where: { orderId: orderId },
            })
                .then((order) => {
                if (req.body.deleteDetails.length > 0) {
                    req.body.deleteDetails.forEach((detail) => {
                        init_models_1.OrderDetail.destroy({ where: { orderDetailId: detail } });
                    });
                }
                details.forEach((value) => {
                    if (value.orderDetailId) {
                        init_models_1.OrderDetail.findAll({ where: { orderDetailId: value.orderDetailId } }).then(() => {
                            init_models_1.OrderDetail.update({
                                index: Number(value.index),
                                orderId: orderId,
                                note: value.note,
                                person: value.person,
                                price: value.price,
                                quantity: value.quantity,
                                remarks: value.remarks,
                                unit: value.unit,
                                unitPrice: value.unitPrice,
                                createdAt: undefined,
                                updatedAt: new Date(),
                            }, { where: { orderDetailId: value.orderDetailId } })
                                .then((orderDetail) => {
                                if (orderDetail[0] === 1) {
                                    res.send({
                                        message: 'Order Detail was updated successfully.',
                                    });
                                }
                                else {
                                    res.send({
                                        message: `Cannot update Order Detail with orderDetailId=${details.orderDetailId}.`,
                                    });
                                }
                            })
                                .catch(() => res.status(400));
                        });
                    }
                    else {
                        init_models_1.OrderDetail.create({
                            index: Number(value.index),
                            orderId: value.orderId,
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
                            .then((orderDetail) => {
                            res.status(200).send(orderDetail);
                        })
                            .catch(() => res.status(400));
                    }
                });
                if (order[0] === 1) {
                    res.send({
                        message: 'Order was updated successfully.',
                    });
                }
                else {
                    res.send({
                        message: `Cannot update Order with orderId=${orderId}.`,
                    });
                }
            })
                .catch(() => {
                res.status(500).send({
                    message: 'Error updating Order with orderId=' + orderId,
                });
            });
        });
        this.deleteOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const whereCondition = req.params && req.params.id ? req.params.id : req;
            let condition = {};
            if (req.params && req.params.id) {
                condition = { orderId: whereCondition };
            }
            else {
                condition = { estimateId: whereCondition };
            }
            const deleteOrder = () => init_models_1.Order.update({ deleteFlg: true }, { where: condition }).then(() => {
                res.send({
                    message: 'Order was deleted successfully.',
                });
            });
            yield init_models_1.Order.findOne({ where: condition }).then((order) => {
                if (order !== null) {
                    init_models_1.Invoice.findAll({ where: { orderId: order.orderId } }).then((invoices) => {
                        if (invoices.length > 0) {
                            invoices.forEach((invoice) => {
                                init_models_1.Invoice.update({ deleteFlg: true }, { where: { invoiceId: invoice.invoiceId } }).then(() => deleteOrder());
                            });
                        }
                        else {
                            deleteOrder();
                        }
                    });
                }
            });
        });
    }
}
const PC = new OrderController();
exports.default = PC;
//# sourceMappingURL=OrderController.js.map