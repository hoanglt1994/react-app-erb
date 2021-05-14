"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.InvoiceDocument = exports.EstimateDocument = exports.WorkReport = exports.Service = exports.ServiceDocument = exports.Role = exports.Project = exports.Order = exports.OrderDocument = exports.OrderDetail = exports.Invoice = exports.InvoiceDetail = exports.Estimate = exports.EstimateDetail = exports.Employee = exports.Document = exports.Client = exports.ClientEmployee = void 0;
const ClientEmployee_1 = require("./ClientEmployee");
Object.defineProperty(exports, "ClientEmployee", { enumerable: true, get: function () { return ClientEmployee_1.ClientEmployee; } });
const Client_1 = require("./Client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.Client; } });
const Document_1 = require("./Document");
Object.defineProperty(exports, "Document", { enumerable: true, get: function () { return Document_1.Document; } });
const Employee_1 = require("./Employee");
Object.defineProperty(exports, "Employee", { enumerable: true, get: function () { return Employee_1.Employee; } });
const EstimateDetail_1 = require("./EstimateDetail");
Object.defineProperty(exports, "EstimateDetail", { enumerable: true, get: function () { return EstimateDetail_1.EstimateDetail; } });
const Estimate_1 = require("./Estimate");
Object.defineProperty(exports, "Estimate", { enumerable: true, get: function () { return Estimate_1.Estimate; } });
const InvoiceDetail_1 = require("./InvoiceDetail");
Object.defineProperty(exports, "InvoiceDetail", { enumerable: true, get: function () { return InvoiceDetail_1.InvoiceDetail; } });
const Invoice_1 = require("./Invoice");
Object.defineProperty(exports, "Invoice", { enumerable: true, get: function () { return Invoice_1.Invoice; } });
const OrderDetail_1 = require("./OrderDetail");
Object.defineProperty(exports, "OrderDetail", { enumerable: true, get: function () { return OrderDetail_1.OrderDetail; } });
const OrderDocument_1 = require("./OrderDocument");
Object.defineProperty(exports, "OrderDocument", { enumerable: true, get: function () { return OrderDocument_1.OrderDocument; } });
const Order_1 = require("./Order");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return Order_1.Order; } });
const Project_1 = require("./Project");
Object.defineProperty(exports, "Project", { enumerable: true, get: function () { return Project_1.Project; } });
const Role_1 = require("./Role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return Role_1.Role; } });
const ServiceDocument_1 = require("./ServiceDocument");
Object.defineProperty(exports, "ServiceDocument", { enumerable: true, get: function () { return ServiceDocument_1.ServiceDocument; } });
const Service_1 = require("./Service");
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return Service_1.Service; } });
const WorkReport_1 = require("./WorkReport");
Object.defineProperty(exports, "WorkReport", { enumerable: true, get: function () { return WorkReport_1.WorkReport; } });
const EstimateDocument_1 = require("./EstimateDocument");
Object.defineProperty(exports, "EstimateDocument", { enumerable: true, get: function () { return EstimateDocument_1.EstimateDocument; } });
const InvoiceDocument_1 = require("./InvoiceDocument");
Object.defineProperty(exports, "InvoiceDocument", { enumerable: true, get: function () { return InvoiceDocument_1.InvoiceDocument; } });
function initModels(sequelize) {
    ClientEmployee_1.ClientEmployee.initModel(sequelize);
    Client_1.Client.initModel(sequelize);
    Document_1.Document.initModel(sequelize);
    Employee_1.Employee.initModel(sequelize);
    EstimateDetail_1.EstimateDetail.initModel(sequelize);
    Estimate_1.Estimate.initModel(sequelize);
    InvoiceDetail_1.InvoiceDetail.initModel(sequelize);
    Invoice_1.Invoice.initModel(sequelize);
    OrderDetail_1.OrderDetail.initModel(sequelize);
    OrderDocument_1.OrderDocument.initModel(sequelize);
    Order_1.Order.initModel(sequelize);
    Project_1.Project.initModel(sequelize);
    Role_1.Role.initModel(sequelize);
    ServiceDocument_1.ServiceDocument.initModel(sequelize);
    Service_1.Service.initModel(sequelize);
    WorkReport_1.WorkReport.initModel(sequelize);
    EstimateDocument_1.EstimateDocument.initModel(sequelize);
    InvoiceDocument_1.InvoiceDocument.initModel(sequelize);
    Employee_1.Employee.belongsToMany(Role_1.Role, { through: 'employee_roles', foreignKey: 'EmployeeCode', otherKey: 'RoleId', timestamps: true });
    Role_1.Role.belongsToMany(Employee_1.Employee, { through: 'employee_roles', foreignKey: 'RoleId', otherKey: 'EmployeeCode', timestamps: true });
    EstimateDetail_1.EstimateDetail.belongsTo(Estimate_1.Estimate, { foreignKey: 'estimateId' });
    Estimate_1.Estimate.hasMany(EstimateDetail_1.EstimateDetail, { foreignKey: 'estimateId' });
    EstimateDetail_1.EstimateDetail.belongsTo(Employee_1.Employee, { foreignKey: 'person' });
    Employee_1.Employee.hasMany(EstimateDetail_1.EstimateDetail, { foreignKey: 'person' });
    Estimate_1.Estimate.belongsTo(Service_1.Service, { foreignKey: 'serviceId' });
    Service_1.Service.hasMany(Estimate_1.Estimate, { foreignKey: 'serviceId' });
    InvoiceDetail_1.InvoiceDetail.belongsTo(Invoice_1.Invoice, { foreignKey: 'invoiceId' });
    Invoice_1.Invoice.belongsTo(Order_1.Order, { foreignKey: 'orderId' });
    Invoice_1.Invoice.hasMany(InvoiceDetail_1.InvoiceDetail, { foreignKey: 'invoiceId' });
    InvoiceDetail_1.InvoiceDetail.belongsTo(Employee_1.Employee, { foreignKey: 'person' });
    Employee_1.Employee.hasMany(InvoiceDetail_1.InvoiceDetail, { foreignKey: 'person' });
    Order_1.Order.hasMany(Invoice_1.Invoice, { foreignKey: 'orderId' });
    OrderDetail_1.OrderDetail.belongsTo(Order_1.Order, { foreignKey: 'orderId' });
    Order_1.Order.hasMany(OrderDetail_1.OrderDetail, { foreignKey: 'orderId' });
    OrderDetail_1.OrderDetail.belongsTo(Employee_1.Employee, { foreignKey: 'person' });
    Employee_1.Employee.hasMany(OrderDetail_1.OrderDetail, { foreignKey: 'person' });
    Service_1.Service.belongsTo(Project_1.Project, { foreignKey: 'projectCode' });
    Project_1.Project.hasMany(Service_1.Service, { foreignKey: 'projectCode' });
    Service_1.Service.belongsTo(Client_1.Client, { foreignKey: 'clientCode' });
    Client_1.Client.hasMany(Service_1.Service, { foreignKey: 'clientCode' });
    Service_1.Service.belongsTo(Employee_1.Employee, { foreignKey: 'employeeCode' });
    Employee_1.Employee.hasMany(Service_1.Service, { foreignKey: 'employeeCode' });
    Service_1.Service.belongsTo(ClientEmployee_1.ClientEmployee, { foreignKey: 'clientEmployeeCode' });
    ClientEmployee_1.ClientEmployee.hasMany(Service_1.Service, { foreignKey: 'clientEmployeeCode' });
    ClientEmployee_1.ClientEmployee.belongsTo(Client_1.Client, { foreignKey: 'clientCode' });
    Client_1.Client.hasMany(ClientEmployee_1.ClientEmployee, { foreignKey: 'clientCode' });
    WorkReport_1.WorkReport.belongsTo(Invoice_1.Invoice, { foreignKey: 'invoiceId' });
    Order_1.Order.belongsToMany(Document_1.Document, { through: 'order_documents', foreignKey: 'orderId', otherKey: 'documentId' });
    Document_1.Document.belongsToMany(Order_1.Order, { through: 'order_documents', foreignKey: 'documentId', otherKey: 'orderId' });
    OrderDocument_1.OrderDocument.belongsTo(Order_1.Order, { as: 'orderIdOrder', foreignKey: 'orderId' });
    Order_1.Order.hasMany(OrderDocument_1.OrderDocument, { as: 'orderDocuments', foreignKey: 'orderId' });
    OrderDocument_1.OrderDocument.belongsTo(Document_1.Document, { as: 'document', foreignKey: 'documentId' });
    Document_1.Document.hasMany(OrderDocument_1.OrderDocument, { as: 'orderDocuments', foreignKey: 'documentId' });
    Service_1.Service.belongsToMany(Document_1.Document, { through: 'service_documents', foreignKey: 'serviceId', otherKey: 'documentId' });
    Document_1.Document.belongsToMany(Service_1.Service, { through: 'service_documents', foreignKey: 'documentId', otherKey: 'serviceId' });
    ServiceDocument_1.ServiceDocument.belongsTo(Service_1.Service, { as: 'serviceIdService', foreignKey: 'serviceId' });
    Service_1.Service.hasMany(ServiceDocument_1.ServiceDocument, { as: 'serviceDocuments', foreignKey: 'serviceId' });
    ServiceDocument_1.ServiceDocument.belongsTo(Document_1.Document, { as: 'document', foreignKey: 'documentId' });
    Document_1.Document.hasMany(ServiceDocument_1.ServiceDocument, { as: 'serviceDocuments', foreignKey: 'documentId' });
    Estimate_1.Estimate.belongsToMany(Document_1.Document, { through: 'estimate_documents', foreignKey: 'estimateId', otherKey: 'documentId' });
    Document_1.Document.belongsToMany(Estimate_1.Estimate, { through: 'estimate_documents', foreignKey: 'documentId', otherKey: 'estimateId' });
    Invoice_1.Invoice.belongsToMany(Document_1.Document, { through: 'invoice_documents', foreignKey: 'invoiceId', otherKey: 'documentId' });
    Document_1.Document.belongsToMany(Invoice_1.Invoice, { through: 'invoice_documents', foreignKey: 'documentId', otherKey: 'invoiceId' });
    EstimateDocument_1.EstimateDocument.belongsTo(Estimate_1.Estimate, { as: 'estimateIdEstimate', foreignKey: 'estimateId' });
    Estimate_1.Estimate.hasMany(EstimateDocument_1.EstimateDocument, { as: 'estimateDocuments', foreignKey: 'estimateId' });
    EstimateDocument_1.EstimateDocument.belongsTo(Document_1.Document, { as: 'document', foreignKey: 'documentId' });
    Document_1.Document.hasMany(EstimateDocument_1.EstimateDocument, { as: 'estimateDocuments', foreignKey: 'documentId' });
    InvoiceDocument_1.InvoiceDocument.belongsTo(Invoice_1.Invoice, { as: 'invoiceIdInvoice', foreignKey: 'invoiceId' });
    Invoice_1.Invoice.hasMany(InvoiceDocument_1.InvoiceDocument, { as: 'invoiceDocuments', foreignKey: 'invoiceId' });
    InvoiceDocument_1.InvoiceDocument.belongsTo(Document_1.Document, { as: 'document', foreignKey: 'documentId' });
    Document_1.Document.hasMany(InvoiceDocument_1.InvoiceDocument, { as: 'invoiceDocuments', foreignKey: 'documentId' });
    Order_1.Order.belongsTo(Estimate_1.Estimate, { foreignKey: 'estimateId' });
    Estimate_1.Estimate.hasOne(Order_1.Order, { foreignKey: 'estimateId' });
    return {
        ClientEmployee: ClientEmployee_1.ClientEmployee,
        Client: Client_1.Client,
        Document: Document_1.Document,
        Employee: Employee_1.Employee,
        EstimateDetail: EstimateDetail_1.EstimateDetail,
        Estimate: Estimate_1.Estimate,
        InvoiceDetail: InvoiceDetail_1.InvoiceDetail,
        Invoice: Invoice_1.Invoice,
        OrderDetail: OrderDetail_1.OrderDetail,
        OrderDocument: OrderDocument_1.OrderDocument,
        Order: Order_1.Order,
        Project: Project_1.Project,
        Role: Role_1.Role,
        ServiceDocument: ServiceDocument_1.ServiceDocument,
        Service: Service_1.Service,
        WorkReport: WorkReport_1.WorkReport,
        EstimateDocument: EstimateDocument_1.EstimateDocument,
        InvoiceDocument: InvoiceDocument_1.InvoiceDocument,
    };
}
exports.initModels = initModels;
//# sourceMappingURL=init-models.js.map