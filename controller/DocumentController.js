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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const db = require('../models');
const init_models_1 = require("../models/init-models");
init_models_1.initModels(db.sequelize);
class DocumentController {
    constructor() {
        this.upload = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const attr = {
                documentName: req.file.originalname,
                filePath: req.file.path,
                documentSaveName: req.body.note,
            };
            yield init_models_1.Document.create(attr)
                .then((document) => {
                res.status(200).send({ document });
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Required fields is missing',
                });
            });
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield init_models_1.Document.findOne({ where: { documentId: req.params.id } });
            yield init_models_1.Document.destroy({ where: { documentId: req.params.id } });
            req.document = doc;
            next();
        });
        this.getDocuments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const documents = req.documents;
            for (let i = 0; i < documents.length; i++) {
                let item = documents[i];
                yield init_models_1.Document.findOne({ attributes: { exclude: ['createdAt', 'updatedAt'] }, where: { documentId: item } }).then((document) => {
                    if (document) {
                        data.push(document);
                    }
                });
            }
            if (data) {
                res.status(200).send(data);
            }
        });
        this.getDocumentInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const docInfo = yield init_models_1.Document.findOne({ where: { documentId: req.params.id } });
            if (docInfo) {
                req.docInfo = docInfo;
                next();
            }
        });
        this.downloadDocument = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dirPath = path.join(__dirname, '../../');
            res.download(dirPath + req.docInfo.filePath, req.docInfo.fileName);
        });
    }
}
const PC = new DocumentController();
exports.default = PC;
//# sourceMappingURL=DocumentController.js.map