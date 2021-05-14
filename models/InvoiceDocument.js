"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceDocument = void 0;
const sequelize_1 = require("sequelize");
class InvoiceDocument extends sequelize_1.Model {
    static initModel(sequelize) {
        InvoiceDocument.init({
            invoiceId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'invoices',
                    key: 'invoice_id',
                },
                field: 'invoice_id',
            },
            documentId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'documents',
                    key: 'document_id',
                },
                field: 'document_id',
            },
        }, {
            sequelize,
            tableName: 'invoice_documents',
            timestamps: false,
            indexes: [
                {
                    name: 'invoice_documents_pkey',
                    unique: true,
                    fields: [{ name: 'invoice_id' }, { name: 'document_id' }],
                },
                {
                    name: 'invoice_documents_ibfk_1',
                    fields: [{ name: 'document_id' }],
                },
            ],
        });
        return InvoiceDocument;
    }
}
exports.InvoiceDocument = InvoiceDocument;
//# sourceMappingURL=InvoiceDocument.js.map