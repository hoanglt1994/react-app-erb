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
exports.Client = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Client extends sequelize_1.Model {
    static initModel(sequelize) {
        Client.init({
            clientCode: {
                type: sequelize_1.DataTypes.CHAR(12),
                allowNull: false,
                primaryKey: true,
                field: 'client_code',
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            clientName: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                field: 'client_name',
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING(18),
                allowNull: true,
                field: 'phone_number',
            },
            email: {
                type: sequelize_1.DataTypes.STRING(125),
                allowNull: true,
            },
            address: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
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
            tableName: 'clients',
            timestamps: false,
            indexes: [
                {
                    name: 'clients_pkey',
                    unique: true,
                    fields: [{ name: 'client_code' }],
                },
                {
                    name: 'client_name',
                    fields: [{ name: 'client_name' }],
                },
            ],
        });
        return Client;
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map