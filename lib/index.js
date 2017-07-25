"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("./graphql");
function henry(config) {
    return {
        graphql: graphql_1.graphql(config),
    };
}
exports.default = henry;
