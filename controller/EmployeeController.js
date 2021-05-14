"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const db = require('../models');
const models_1 = require("../models");
const init_models_1 = require("../models/init-models");
init_models_1.initModels(db.sequelize);
class EmployeeController {
    constructor() {
        this.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.Employee.findAll({ attributes: ['employeeCode', 'employeeName'], order: [['employeeCode', 'ASC']] }).then((employees) => {
                res.status(200).send(employees);
            });
        });
        this.getSalesEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield init_models_1.Employee.findAll({
                attributes: ['employeeCode', 'employeeName'],
                include: [{ model: init_models_1.Role, attributes: ['roleName'], where: { roleName: '営業担当者' } }],
            }).then((employees) => {
                res.status(200).send(employees);
            });
        });
        this.postEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            const attr = {
                employeeCode: req.body.employeeCode.trim() !== '' ? req.body.employeeCode.trim() : null,
                employeeName: req.body.employeeName.trim() !== '' ? req.body.employeeName.trim() : null,
                departmentName: req.body.departmentName.trim() !== '' ? req.body.departmentName.trim() : null,
                email: req.body.email.trim() !== '' ? req.body.email.trim() : null,
                postalCode: req.body.postalCode.trim() !== '' ? req.body.postalCode.trim() : null,
                phoneNumber: req.body.phoneNumber.trim() !== '' ? req.body.phoneNumber.trim() : null,
            };
            let curDate = moment_1.default(new Date()).format('YYYY-MM-DD HH:mm:ss');
            yield init_models_1.Employee.create(attr)
                .then((employee) => {
                console.log(attr);
                const role = init_models_1.Role.findAll({ attributes: ['roleId'], where: { roleId: req.body.roleId } });
                if (!role) {
                    res.status(400);
                }
                models_1.sequelize
                    .query(`insert into employee_roles ("createdAt","updatedAt","EmployeeCode", "RoleId") values ('${curDate}','${curDate}','${attr.employeeCode}','${req.body.roleId}')`, {
                    type: sequelize_1.QueryTypes.INSERT,
                })
                    .then((employeeRole) => {
                    res.status(200).send({ employeeRole });
                })
                    .catch((err) => {
                    res.status(500).send({
                        message: err.message || 'Required fields is missing',
                    });
                });
                res.status(200).send({ employee });
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
    }
}
const PC = new EmployeeController();
exports.default = PC;
//# sourceMappingURL=EmployeeController.js.map