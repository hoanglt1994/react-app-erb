'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * Role's seed
         *
         * Example:
         * await queryInterface.bulkInsert('roles', [{
         *   roleId: 1,
         *   roleName: '営業担当者'
         * }], {});
         */
        const roles = require('../data/role.json');
        let rolesArray = [];
        roles.forEach((role) => {
            rolesArray.push({
                role_id: role.roleId,
                role_name: role.roleName,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('roles', rolesArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * Role's revert seed.
         *
         * Example:
         * await queryInterface.bulkDelete('roles', null, {});
         */
        return queryInterface.bulkDelete('roles', null);
    }),
};
//# sourceMappingURL=20210222033838-role.js.map