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
exports.Order = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Order extends sequelize_1.Model {
    static initModel(sequelize) {
        Order.init({
            orderId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'order_id',
            },
            orderCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [12, 12],
                },
                field: 'order_code',
            },
            estimateId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: 'estimates',
                    key: 'estimate_id',
                },
                field: 'estimate_id',
            },
            status: {
                type: sequelize_1.DataTypes.CHAR(3),
                allowNull: true,
            },
            orderDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                field: 'order_date',
            },
            orderNumber: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: true,
                comment: '注文番号',
                field: 'order_number',
            },
            orderName: {
                type: sequelize_1.DataTypes.CHAR(255),
                allowNull: true,
                comment: '注文件名',
                field: 'order_name',
            },
            description: {
                type: sequelize_1.DataTypes.STRING(250),
                allowNull: true,
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
            tableName: 'orders',
            timestamps: false,
            indexes: [
                {
                    name: 'orders_pkey',
                    unique: true,
                    fields: [{ name: 'estimate_id' }],
                },
                {
                    name: 'order_estimate_fkey',
                    fields: [{ name: 'estimate_id' }],
                },
            ],
        });
        return Order;
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map