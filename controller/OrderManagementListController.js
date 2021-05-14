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
const OrderManagementListService = require('../services/orderManagementList.service');
class OrderManagementListController {
    constructor() {
        this.getOrderManagementList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const findData = [];
            try {
                const dataGet = yield OrderManagementListService.getOrderManagementList(req.query);
                dataGet.forEach((item, i) => {
                    var _a;
                    const parentEstimate = item.Estimates && item.Estimates.length > 0 ? item.Estimates[0] : { estimateId: 0, estimateCode: '', estimateDate: '', status: '' };
                    const data = {
                        serviceId: item.serviceId,
                        serviceCode: item.serviceCode,
                        serviceName: item.serviceName,
                        projectCode: item.projectCode,
                        clientCode: item.clientCode,
                        serviceStartDate: item.serviceStartDate,
                        serviceEndDate: item.serviceEndDate,
                        estimateId: parentEstimate.estimateId,
                        estimateCode: parentEstimate.estimateCode,
                        estimateDate: parentEstimate.estimateDate,
                        estimateStatus: parentEstimate.status ? parentEstimate.status : '',
                        estimateTotalPrice: 0,
                        orderId: 0,
                        orderCode: '',
                        orderDate: '',
                        orderStatus: '',
                        orderTotalPrice: 0,
                        invoiceId: 0,
                        invoiceCode: '',
                        invoiceDate: '',
                        invoiceStatus: '',
                        invoiceTotalPrice: 0,
                    };
                    findData.push(data);
                    if (item.Estimates && item.Estimates.length > 0) {
                        if (item.Estimates.length === 1) {
                            const es = item.Estimates;
                            const estimatePrice = (_a = es[0].EstimateDetails) === null || _a === void 0 ? void 0 : _a.reduce((sum, e) => sum + Number(e.price), 0);
                            const orderPrice = es[0].Order && es[0].Order.OrderDetails ? es[0].Order.OrderDetails.reduce((sum, e) => sum + Number(e.price), 0) : 0;
                            findData[i] = Object.assign(Object.assign({}, findData[i]), { estimateId: es[0].estimateId, estimateCode: es[0].estimateCode, estimateDate: es[0].estimateDate, estimateStatus: es[0].status ? es[0].status : '', estimateTotalPrice: estimatePrice });
                            if (es[0].Order) {
                                findData[i] = Object.assign(Object.assign({}, findData[i]), { orderId: es[0].Order.orderId, orderCode: es[0].Order.orderCode, orderDate: es[0].Order.orderDate, orderStatus: es[0].Order.status, orderTotalPrice: Number(orderPrice) });
                                if (es[0].Order.Invoices.length > 0) {
                                    const invoiceChild = [];
                                    const parentInvoice = es[0].Order.Invoices && es[0].Order.Invoices.length > 0 ? es[0].Order.Invoices[0] : { invoiceId: 0, invoiceCode: '', invoiceDate: '', invoiceStatus: '' };
                                    es[0].Order.Invoices.forEach((invoice) => {
                                        var _a;
                                        const invoicePrice = (_a = invoice.InvoiceDetails) === null || _a === void 0 ? void 0 : _a.reduce((sum, e) => sum + Number(e.price), 0);
                                        invoiceChild.push(Object.assign(Object.assign({}, data), { invoiceFlg: true, orderId: es[0].Order ? es[0].Order.orderId : 0, orderCode: es[0].Order ? es[0].Order.orderCode : '', orderDate: es[0].Order ? es[0].Order.orderDate : '', orderStatus: es[0].Order && es[0].Order.status ? es[0].Order.status : '', orderTotalPrice: orderPrice ? Number(orderPrice) : 0, estimateId: es[0].estimateId, estimateCode: es[0].estimateCode, estimateDate: es[0].estimateDate, estimateStatus: es[0].status ? es[0].status : '', estimateTotalPrice: estimatePrice, invoiceId: invoice.invoiceId, invoiceCode: invoice.invoiceCode, invoiceDate: invoice.invoiceDate, invoiceStatus: invoice.status ? invoice.status : '', invoiceTotalPrice: invoicePrice ? Number(invoicePrice) : 0 }));
                                    });
                                    const invoices = invoiceChild.sort((a, b) => {
                                        if (Number(a.invoiceCode) > Number(b.invoiceCode)) {
                                            return -1;
                                        }
                                        if (Number(a.invoiceCode) < Number(b.invoiceCode)) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                    const newInvoice = invoices.filter((items, i) => i !== 0);
                                    findData[i] = Object.assign(Object.assign(Object.assign({}, findData[i]), invoices[0]), { invoiceId: invoices[0].invoiceId, invoiceCode: invoices[0].invoiceCode, invoiceStatus: invoices[0].invoiceStatus, invoiceDate: invoices[0].invoiceDate, invoiceTotalPrice: invoices[0].invoiceTotalPrice, estimateFlg: false, expandEstimate: false, children: newInvoice });
                                    findData[i] = Object.assign(Object.assign({}, findData[i]), { orderFlg: false, expandInvoice: false, invoiceFlg: false });
                                }
                                else {
                                    findData[i] = Object.assign(Object.assign({}, findData[i]), { estimateFlg: false, expandEstimate: false });
                                    findData[i] = Object.assign(Object.assign({}, findData[i]), { orderFlg: false, expandInvoice: false, invoiceFlg: false });
                                }
                            }
                            else {
                                findData[i] = Object.assign(Object.assign({}, findData[i]), { estimateFlg: false, expandEstimate: false });
                                findData[i] = Object.assign(Object.assign({}, findData[i]), { orderFlg: false, expandInvoice: false, invoiceFlg: false });
                            }
                        }
                        else {
                            const estimateChild = [];
                            item.Estimates.forEach((es, ie) => {
                                var _a;
                                const estimatePrice = (_a = es.EstimateDetails) === null || _a === void 0 ? void 0 : _a.reduce((sum, e) => sum + Number(e.price), 0);
                                const orderPrice = es.Order && es.Order.OrderDetails ? es.Order.OrderDetails.reduce((sum, e) => sum + Number(e.price), 0) : 0;
                                if (es.Order && es.Order.Invoices) {
                                    const invoiceChild = [];
                                    const parentInvoice = es.Order.Invoices && es.Order.Invoices.length > 0 ? es.Order.Invoices[0] : { invoiceCode: '', invoiceDate: '', status: '' };
                                    es.Order.Invoices.forEach((invoice) => {
                                        var _a;
                                        const invoicePrice = (_a = invoice.InvoiceDetails) === null || _a === void 0 ? void 0 : _a.reduce((sum, e) => sum + Number(e.price), 0);
                                        invoiceChild.push(Object.assign(Object.assign({}, data), { invoiceFlg: true, orderId: es.Order ? es.Order.orderId : 0, orderCode: es.Order ? es.Order.orderCode : '', orderDate: es.Order ? es.Order.orderDate : '', orderStatus: es.Order && es.Order.status ? es.Order.status : '', orderTotalPrice: orderPrice ? Number(orderPrice) : 0, estimateId: es.estimateId, estimateCode: es.estimateCode, estimateDate: es.estimateDate, estimateStatus: es.status ? es.status : '', estimateTotalPrice: estimatePrice, invoiceId: invoice.invoiceId, invoiceCode: invoice.invoiceCode, invoiceDate: invoice.invoiceDate, invoiceStatus: invoice.status ? invoice.status : '', invoiceTotalPrice: invoicePrice ? Number(invoicePrice) : 0 }));
                                    });
                                    const invoices = invoiceChild.sort((a, b) => {
                                        if (Number(a.invoiceCode) > Number(b.invoiceCode)) {
                                            return -1;
                                        }
                                        if (Number(a.invoiceCode) < Number(b.invoiceCode)) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                    const newInvoice = invoices.filter((items, i) => i !== 0);
                                    estimateChild.push(Object.assign(Object.assign(Object.assign({}, data), invoices[0]), { estimateId: es.estimateId, estimateCode: es.estimateCode, estimateDate: es.estimateDate, estimateStatus: es.status, estimateTotalPrice: estimatePrice, orderId: es.Order ? es.Order.orderId : 0, orderCode: es.Order ? es.Order.orderCode : '', orderDate: es.Order ? es.Order.orderDate : '', orderStatus: es.Order && es.Order.status ? es.Order.status : '', orderTotalPrice: orderPrice ? Number(orderPrice) : 0, estimateFlg: true, orderFlg: true, expandInvoice: false, children: newInvoice }));
                                    delete estimateChild[ie].invoiceFlg;
                                }
                                else {
                                    estimateChild.push(Object.assign(Object.assign({}, data), { estimateId: es.estimateId, estimateCode: es.estimateCode, estimateDate: es.estimateDate, estimateStatus: es.status, estimateTotalPrice: estimatePrice, estimateFlg: true, orderFlg: true, expandInvoice: false }));
                                }
                                const sortEstimate = estimateChild.sort((a, b) => {
                                    if (Number(a.estimateCode) > Number(b.estimateCode)) {
                                        return -1;
                                    }
                                    else if (Number(a.estimateCode) < Number(b.estimateCode)) {
                                        return 1;
                                    }
                                    else {
                                        return 0;
                                    }
                                });
                                let sub = [];
                                const newEstimate = sortEstimate.filter((e, i) => {
                                    if (e.children && e.children.length > 0 && i === 0) {
                                        e.children.forEach((child, j) => {
                                            if (e.children) {
                                                return (e.children[j] = Object.assign(Object.assign({}, e.children[j]), { orderFlg: true }));
                                            }
                                        });
                                        sub = e.children;
                                    }
                                    return i !== 0;
                                });
                                findData[i] = Object.assign(Object.assign(Object.assign({}, findData[i]), sortEstimate[0]), { estimateFlg: false, expandEstimate: false, children: newEstimate, subChildren: sub || [] });
                                if (newEstimate.length > 0) {
                                    delete findData[i].orderFlg;
                                }
                                else {
                                    findData[i] = Object.assign(Object.assign({}, findData[i]), { orderFlg: false });
                                }
                                delete findData[i].expandInvoice;
                                delete findData[i].invoiceFlg;
                            });
                        }
                    }
                });
                return res.status(200).json(findData);
            }
            catch (e) {
                return res.status(400).json({ status: 400, message: e.message });
            }
        });
    }
}
const PC = new OrderManagementListController();
exports.default = PC;
//# sourceMappingURL=OrderManagementListController.js.map