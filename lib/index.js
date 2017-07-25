"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gephi_1 = require("./gephi");
function henry(config) {
    return {
        gephi: gephi_1.gephi(config),
    };
}
exports.default = henry;
