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
exports.Estimate = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Estimate extends sequelize_1.Model {
    static initModel(sequelize) {
        Estimate.init({
            estimateId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'estimate_id',
            },
            estimateCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [12, 12],
                },
                field: 'estimate_code',
            },
            serviceId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'services',
                    key: 'service_id',
                },
                field: 'service_id',
            },
            status: {
                type: sequelize_1.DataTypes.CHAR(3),
                allowNull: true,
                defaultValue: '',
            },
            estimateDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                field: 'estimate_date',
            },
            deleteFlg: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                field: 'delete_flg',
                defaultValue: false,
            },
            orderFlg: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                field: 'order_flg',
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
            tableName: 'estimates',
            timestamps: false,
            indexes: [
                {
                    name: 'estimates_pkey',
                    unique: true,
                    fields: [{ name: 'estimate_id' }],
                },
                {
                    name: 'estimates_service_fkey',
                    fields: [{ name: 'service_id' }],
                },
            ],
        });
        return Estimate;
    }
}
exports.Estimate = Estimate;
//# sourceMappingURL=Estimate.js.map