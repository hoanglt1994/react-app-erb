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
exports.WorkReport = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class WorkReport extends sequelize_1.Model {
    static initModel(sequelize) {
        WorkReport.init({
            workReportId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'work_report_id',
            },
            invoiceId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: 'invoices',
                    key: 'invoice_id',
                },
                field: 'invoice_id',
            },
            title: {
                type: sequelize_1.DataTypes.STRING(267),
                allowNull: true,
                field: 'title',
            },
            workingTime: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: 'working_time',
            },
            workInfo: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                field: 'work_info',
            },
            relatedDocument: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                field: 'related_document',
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.default.literal('current_timestamp'),
                field: 'created_at',
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.default.literal('current_timestamp'),
                field: 'updated_at',
            },
        }, {
            sequelize,
            tableName: 'work_reports',
            timestamps: false,
            indexes: [
                {
                    name: 'work_reports_pkey',
                    unique: true,
                    fields: [{ name: 'work_report_id' }],
                },
            ],
        });
        return WorkReport;
    }
}
exports.WorkReport = WorkReport;
//# sourceMappingURL=WorkReport.js.map