import { Observable } from '@reactivex/rxjs';
import fetch from 'node-fetch';
import * as qs from 'query-string';
import reponseToRX from 'response-to-rx';
import { TextDecoder } from 'text-encoding';

import { IHenryConfig } from './index';

export type GephiOptions = {
  limit: number;
  subject: string;
  predicate: string;
  object: string;
};

export type GephiNode = {
  [index: string]: {
    label: string;
    size: number;
    x: string;
    y: string;
  }
};

export type GephiEdge = {
  [index: string]: {
    source: string;
    label: string;
    pred: string;
    target: string;
  }
};

export type GephiAddEdge = {
  ae: GephiEdge;
};

export type GephiAddNode = {
  an: GephiNode;
};

export type GephiOperation = GephiAddNode | GephiAddEdge;

export type GephiStream = Observable<GephiOperation>;

export function gephi(config: IHenryConfig) {
  const { host } = config;

  function getQuads(options: GephiOptions): GephiStream {
    const { limit, subject, predicate, object } = options;
    const queryString = qs.stringify({
      mode: 'raw',
      limit,
      obj: object,
      pred: predicate,
      sub: subject
    });

    const url = `${host}/gephi/gs?${queryString}`;

    const observable = Observable.fromPromise(fetch(url).then(response => {
      return reponseToRX(response);
    })).flatMap(stream => stream);

    const decoder = new TextDecoder('utf-8');

    // observable.map(buffer => new TextDecoder('utf-8').decode(buffer)).scan((memo, string) => {
    //   const splits = (memo.stack + string).split("\n");
    //   const lines = splits.slice(0, splits.length - 1);
    //   const stack = splits[splits.length - 1];
    //   return { lines, stack };
    // }, { stack: '', lines: []}).flatMap(({lines}) => Observable.from(lines)).map(JSON.parse)

    return observable
      // .map(uint8array => decoder.decode(uint8array) as string)
      .scan((memo, str) => {
        const splits = (memo.stack + str).split('\n');
        const lines = splits.slice(0, splits.length - 1);
        const stack = splits[splits.length - 1];
        return { lines, stack };
      }, { stack: '', lines: []})
      .flatMap(({ lines }) => Observable.from(lines))
      .map(line => {
        // console.log(line);
        return JSON.parse(line);
      });
      // .flatMap(str => str.split('\n'))
      // .scan(({ result, stack }, value) => {
      //   try {
      //     return { result: JSON.parse(stack + value), stack: '' };
      //   } catch (error) {
      //     return { result: null, stack: stack + value };
      //   }
      // }, { result: null, stack: '' })
      // .map(({ result }) => result)
      // .filter(result => !!result)
      // .bufferTime(1000)
      // .scan(({ nodes: nodesMemo, edges: edgesMemo }, entries) => {
      //   return entries.reduce(({ nodes, edges}, { ae, an, ce, cn, de, dn }) => {
      //     if (ae) {
      //       return { nodes, edges: Object.assign(edges, ae) };
      //     }
      //
      //     if (ce) {
      //       return { nodes, edges: Object.assign(edges, ce) };
      //     }
      //
      //     if (an) {
      //       return { edges, nodes: Object.assign(nodes, an) };
      //     }
      //
      //     if (cn) {
      //       return { edges, nodes: Object.assign(nodes, cn) };
      //     }
      //
      //     return { nodes, edges };
      //   }, { nodes: { ...nodesMemo }, edges: { ...edgesMemo } });
      // }, { nodes: [], edges: [] });
  }

  return getQuads;
}
