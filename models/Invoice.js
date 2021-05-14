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
exports.Invoice = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Invoice extends sequelize_1.Model {
    static initModel(sequelize) {
        Invoice.init({
            invoiceId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'invoice_id',
            },
            invoiceCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [12, 12],
                },
                field: 'invoice_code',
            },
            invoiceDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.default.literal('current_timestamp'),
                field: 'invoice_date',
            },
            status: {
                type: sequelize_1.DataTypes.CHAR(3),
                allowNull: true,
            },
            paymentDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.default.literal('current_timestamp'),
                field: 'payment_date',
            },
            orderId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'orders',
                    key: 'order_id',
                },
                field: 'order_id',
            },
            deleteFlg: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                field: 'delete_flg',
                defaultValue: false,
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
            tableName: 'invoices',
            timestamps: false,
            indexes: [
                {
                    name: 'invoices_pkey',
                    unique: true,
                    fields: [{ name: 'invoice_id' }],
                },
                {
                    name: 'invoices_order_fkey',
                    fields: [{ name: 'order_id' }],
                },
            ],
        });
        return Invoice;
    }
}
exports.Invoice = Invoice;
//# sourceMappingURL=Invoice.js.map