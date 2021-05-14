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
exports.OrderDetail = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class OrderDetail extends sequelize_1.Model {
    static initModel(sequelize) {
        OrderDetail.init({
            orderDetailId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'order_detail_id',
            },
            index: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
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
            note: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            unit: {
                type: sequelize_1.DataTypes.CHAR(10),
                allowNull: true,
            },
            unitPrice: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                field: 'unit_price',
            },
            price: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            remarks: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            person: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: true,
                references: {
                    model: 'employees',
                    key: 'employee_code',
                },
            },
            invoiceFlag: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                field: 'invoice_flg',
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
            tableName: 'order_details',
            timestamps: false,
            indexes: [
                {
                    name: 'order_details_pkey',
                    unique: true,
                    fields: [{ name: 'order_detail_id' }],
                },
                {
                    name: 'order_id',
                    fields: [{ name: 'order_id' }],
                },
                {
                    name: 'order_details_person_fkey',
                    fields: [{ name: 'person' }],
                },
            ],
        });
        return OrderDetail;
    }
}
exports.OrderDetail = OrderDetail;
//# sourceMappingURL=OrderDetail.js.map