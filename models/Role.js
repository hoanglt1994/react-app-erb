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
exports.Role = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Role extends sequelize_1.Model {
    static initModel(sequelize) {
        Role.init({
            roleId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'role_id'
            },
            roleName: {
                type: sequelize_1.DataTypes.STRING(120),
                allowNull: false,
                field: 'role_name'
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
            }
        }, {
            sequelize,
            tableName: 'roles',
            timestamps: false,
            indexes: [
                {
                    name: "roles_pkey",
                    unique: true,
                    fields: [
                        { name: "role_id" },
                    ]
                },
            ]
        });
        return Role;
    }
}
exports.Role = Role;
//# sourceMappingURL=Role.js.map