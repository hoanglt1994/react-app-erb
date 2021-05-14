"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDocument = void 0;
const sequelize_1 = require("sequelize");
class OrderDocument extends sequelize_1.Model {
    static initModel(sequelize) {
        OrderDocument.init({
            orderId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'orders',
                    key: 'order_id',
                },
                field: 'order_id',
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
            tableName: 'order_documents',
            timestamps: false,
            indexes: [
                {
                    name: 'order_documents_pkey',
                    unique: true,
                    fields: [{ name: 'order_id' }, { name: 'document_id' }],
                },
                {
                    name: 'order_documents_ibfk_1',
                    fields: [{ name: 'document_id' }],
                },
            ],
        });
        return OrderDocument;
    }
}
exports.OrderDocument = OrderDocument;
//# sourceMappingURL=OrderDocument.js.map