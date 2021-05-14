"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDocument = void 0;
const sequelize_1 = require("sequelize");
class ServiceDocument extends sequelize_1.Model {
    static initModel(sequelize) {
        ServiceDocument.init({
            serviceId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'services',
                    key: 'service_id',
                },
                field: 'service_id',
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
            tableName: 'service_documents',
            timestamps: false,
            indexes: [
                {
                    name: 'service_documents_pkey',
                    unique: true,
                    fields: [{ name: 'service_id' }, { name: 'document_id' }],
                },
                {
                    name: 'service_documents_ibfk_1',
                    fields: [{ name: 'document_id' }],
                },
            ],
        });
        return ServiceDocument;
    }
}
exports.ServiceDocument = ServiceDocument;
//# sourceMappingURL=ServiceDocument.js.map