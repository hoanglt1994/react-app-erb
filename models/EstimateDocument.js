"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimateDocument = void 0;
const sequelize_1 = require("sequelize");
class EstimateDocument extends sequelize_1.Model {
    static initModel(sequelize) {
        EstimateDocument.init({
            estimateId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'estimates',
                    key: 'estimate_id',
                },
                field: 'estimate_id',
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
            tableName: 'estimate_documents',
            timestamps: false,
            indexes: [
                {
                    name: 'estimate_documents_pkey',
                    unique: true,
                    fields: [{ name: 'estimate_id' }, { name: 'document_id' }],
                },
                {
                    name: 'estimate_documents_ibfk_1',
                    fields: [{ name: 'document_id' }],
                },
            ],
        });
        return EstimateDocument;
    }
}
exports.EstimateDocument = EstimateDocument;
//# sourceMappingURL=EstimateDocument.js.map