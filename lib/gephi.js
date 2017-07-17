"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
const node_fetch_1 = require("node-fetch");
const qs = require("query-string");
const response_to_rx_1 = require("response-to-rx");
const text_encoding_1 = require("text-encoding");
function gephi(config) {
    const { host } = config;
    function getQuads(options) {
        const { limit, subject, predicate, object } = options;
        const queryString = qs.stringify({
            mode: 'raw',
            limit,
            obj: object,
            pred: predicate,
            sub: subject
        });
        const url = `${host}/gephi/gs?${queryString}`;
        const observable = rxjs_1.Observable.fromPromise(node_fetch_1.default(url).then(response => {
            return response_to_rx_1.default(response);
        })).flatMap(stream => stream);
        const decoder = new text_encoding_1.TextDecoder('utf-8');
        return observable
            .scan((memo, str) => {
            const splits = (memo.stack + str).split('\n');
            const lines = splits.slice(0, splits.length - 1);
            const stack = splits[splits.length - 1];
            return { lines, stack };
        }, { stack: '', lines: [] })
            .flatMap(({ lines }) => rxjs_1.Observable.from(lines))
            .map(line => {
            return JSON.parse(line);
        });
    }
    return getQuads;
}
exports.gephi = gephi;
