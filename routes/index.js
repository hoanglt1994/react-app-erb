"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var projectRoute = require('./project.routes');
var clientRoute = require('./client.routes');
var clientEmployeeRoute = require('./clientEmployee.routes');
var employeeRoute = require('./employee.routes');
var testApi = require('../controller/test-api');
var uploadRoute = require('./document.routes');
var roleRoute = require('./role.routes');
var serviceRoute = require('./service.routes');
var estimateRoute = require('./estimate.routes');
var orderRoute = require('./order.routes');
var serviceDocumentRoute = require('./serviceDocument.routes');
var estimateDocumentRoute = require('./estimateDocument.routes');
var orderDocumentRoute = require('./orderDocument.routes');
var invoiceDocumentRoute = require('./invoiceDocument.routes');
var orderManagementListRoute = require('./orderManagementList.routes');
var invoiceRoute = require('./invoice.route');
var orderDetailRoute = require('./orderDetail.routes');
var workReportRoute = require('./workReport.routes');
var invoiceDetailRoute = require('./invoiceDetail.routes');
const router = express_1.default.Router();
router.use(testApi);
router.use('/project/', projectRoute);
router.use('/client/', clientRoute);
router.use('/clientEmployee/', clientEmployeeRoute);
router.use('/employee/', employeeRoute);
router.use('/upload/', uploadRoute);
router.use('/role/', roleRoute);
router.use('/service/', serviceRoute);
router.use('/estimate/', estimateRoute);
router.use('/order/', orderRoute);
router.use('/serviceDocument/', serviceDocumentRoute);
router.use('/estimateDocument/', estimateDocumentRoute);
router.use('/orderDocument/', orderDocumentRoute);
router.use('/invoiceDocument/', invoiceDocumentRoute);
router.use('/orderManagementList/', orderManagementListRoute);
router.use('/invoice/', invoiceRoute);
router.use('/orderDetail/', orderDetailRoute);
router.use('/workReport/', workReportRoute);
router.use('/invoiceDetail/', invoiceDetailRoute);
module.exports = router;
//# sourceMappingURL=index.js.map