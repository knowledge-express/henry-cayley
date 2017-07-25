"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whatwg_fetch_1 = require("whatwg-fetch");
function graphql(config) {
    const { host } = config;
    function query({ queryBody }) {
        const url = `${host}api/v1/query/graphql`;
        return whatwg_fetch_1.fetch(url, {
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
