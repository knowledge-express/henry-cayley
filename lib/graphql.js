"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
function graphql(config) {
    const { host } = config;
    function query({ queryBody }) {
        const url = `${host}/api/v1/query/graphql`;
        return node_fetch_1.default(url, {
            method: "post",
            body: queryBody,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(response => response.json()).then((res) => {
            if ("errors" in res) {
                throw new Error(`CAYLEY: ${JSON.stringify(res.errors)}`);
            }
            if ("data" in res) {
                return res.data;
            }
        });
    }
    return query;
}
exports.graphql = graphql;
