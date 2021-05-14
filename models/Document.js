"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Document extends sequelize_1.Model {
    static initModel(sequelize) {
        Document.init({
            documentId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'document_id'
            },
            documentName: {
                type: sequelize_1.DataTypes.STRING(250),
                allowNull: false,
                field: 'document_name'
            },
            filePath: {
                type: sequelize_1.DataTypes.STRING(2083),
                allowNull: false,
                field: 'file_path'
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.default.literal('current_timestamp'),
                field: 'created_at'
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.default.literal('current_timestamp'),
                field: 'updated_at'
            },
            documentSaveName: {
                type: sequelize_1.DataTypes.STRING(250),
                allowNull: false,
                field: 'document_save_name'
            }
        }, {
            sequelize,
            tableName: 'documents',
            timestamps: false,
            indexes: [
                {
                    name: "documents_pkey",
                    unique: true,
                    fields: [
                        { name: "document_id" },
                    ]
                },
            ]
        });
        return Document;
    }
}
exports.Document = Document;
//# sourceMappingURL=Document.js.map