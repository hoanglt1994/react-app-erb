"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderManagementList = void 0;
const Service_1 = require("../models/Service");
const Estimate_1 = require("../models/Estimate");
const EstimateDetail_1 = require("../models/EstimateDetail");
const Order_1 = require("../models/Order");
const OrderDetail_1 = require("../models/OrderDetail");
const Invoice_1 = require("../models/Invoice");
const InvoiceDetail_1 = require("../models/InvoiceDetail");
const sequelize_1 = require("sequelize");
function getOrderManagementList(searchVal) {
    const projectCodeParams = searchVal.projectCode ? searchVal.projectCode : { [sequelize_1.Op.ne]: null };
    const serviceCodeParams = searchVal.serviceCode ? searchVal.serviceCode : { [sequelize_1.Op.ne]: null };
    const clientCodeParams = searchVal.clientCode ? searchVal.clientCode : { [sequelize_1.Op.ne]: null };
    const serviceStartDate = searchVal.serviceStartDate ? { [sequelize_1.Op.gte]: searchVal.serviceStartDate } : { [sequelize_1.Op.ne]: null };
    const serviceEndDate = searchVal.serviceEndDate ? { [sequelize_1.Op.lte]: searchVal.serviceEndDate } : { [sequelize_1.Op.ne]: null };
    try {
        return Service_1.Service.findAll({
            attributes: ['serviceId', 'serviceCode', 'serviceName', 'projectCode', 'clientCode', 'serviceStartDate', 'serviceEndDate'],
            order: [['serviceCode', 'DESC']],
            where: {
                [sequelize_1.Op.and]: {
                    projectCode: projectCodeParams,
                    serviceCode: serviceCodeParams,
                    clientCode: clientCodeParams,
                    serviceStartDate: serviceStartDate,
                    serviceEndDate: serviceEndDate,
                    deleteFlg: { [sequelize_1.Op.not]: true },
                },
            },
            include: [
                {
                    model: Estimate_1.Estimate,
                    attributes: ['estimateId', 'estimateCode', 'estimateDate', 'status'],
                    where: { deleteFlg: { [sequelize_1.Op.not]: true } },
                    required: false,
                    include: [
                        { model: EstimateDetail_1.EstimateDetail, attributes: ['price'], required: false },
                        {
                            model: Order_1.Order,
                            attributes: ['orderId', 'orderCode', 'orderDate', 'status'],
                            where: { deleteFlg: { [sequelize_1.Op.not]: true } },
                            include: [
                                { model: OrderDetail_1.OrderDetail, attributes: ['price'], required: false },
                                {
                                    model: Invoice_1.Invoice,
                                    attributes: ['invoiceId', 'invoiceCode', 'invoiceDate', 'status'],
                                    required: false,
                                    where: { deleteFlg: { [sequelize_1.Op.not]: true } },
                                    include: [{ model: InvoiceDetail_1.InvoiceDetail, attributes: ['price'], required: false }],
                                },
                            ],
                            required: false,
                        },
                    ],
                },
            ],
        });
    }
    catch (e) {
        throw Error('Error while Paginating Order Management List');
    }
}
exports.getOrderManagementList = getOrderManagementList;
//# sourceMappingURL=orderManagementList.service.js.map