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
        const workReports = require('../data/work-report.json');
        let workReportsArray = [];
        workReports.forEach((workReport) => {
            workReportsArray.push({
                work_report_id: workReport.workReportId,
                invoice_id: workReport.invoiceId,
                title: workReport.title,
                working_time: workReport.workingTime,
                work_info: workReport.workInfo,
                related_document: workReport.relatedDocument,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        return queryInterface.bulkInsert('work_reports', workReportsArray);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('work_reports', null);
    }),
};
//# sourceMappingURL=20210331145126-work-report.js.map