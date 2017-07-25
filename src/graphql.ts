// import fetch, { Response } from "node-fetch";
import { fetch } from 'whatwg-fetch';

import { IHenryConfig } from './index';

export type GraphQLOptions = {
  queryBody: string;
};

export function graphql(config: IHenryConfig) {
  const { host } = config;

  function query({ queryBody }: GraphQLOptions): Promise<Response> {
    const url = `${host}api/v1/query/graphql`;
    return fetch(url, {
      method: "post",
      body: queryBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    }).then(response => response.json() as Promise<{ data: any, errors: any[] }>).then((res) => {
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
