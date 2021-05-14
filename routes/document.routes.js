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
const express_1 = __importDefault(require("express"));
const DocumentController_1 = __importDefault(require("../controller/DocumentController"));
const multer_1 = __importDefault(require("multer"));
// import {deleteFile} from "../middleware/deleteFile";
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
var path = require('path');
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './api/storage/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer_1.default({
    storage,
});
const deleteFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield unlinkAsync(req.document.dataValues.filePath).then(() => {
        res.status(200);
    });
    res.end('ファイルの削除が完了しました。');
});
const router = express_1.default.Router();
/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * @route POST /upload
 * @operationId uploadFile
 * @param {file} file.formData
 * @param {string} note.formData.required
 * @returns {Error}  default - Unexpected error
 */
router.post('/', upload.single('file'), DocumentController_1.default.upload);
/**
 * @route DELETE /upload/{id}
 * @operationId deleteFile
 * @param {number} id.path.required
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', DocumentController_1.default.delete, deleteFile);
/**
 * @route GET /upload/{id}
 * @operationId downloadFile
 * @param {number} id.path.required
 * @returns {string} 200 - downloadFile
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', DocumentController_1.default.getDocumentInfo, DocumentController_1.default.downloadDocument);
module.exports = router;
//# sourceMappingURL=document.routes.js.map