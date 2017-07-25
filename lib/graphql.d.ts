import { Response } from "node-fetch";
import { IHenryConfig } from './index';
export declare type GraphQLOptions = {
    queryBody: string;
};
export declare type GraphQLResult = Response;
export declare function graphql(config: IHenryConfig): ({queryBody}: GraphQLOptions) => Promise<Response>;
