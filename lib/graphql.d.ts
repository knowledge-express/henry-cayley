import { IHenryConfig } from './index';
export declare type GraphQLOptions = {
    queryBody: string;
};
export declare function graphql(config: IHenryConfig): ({queryBody}: GraphQLOptions) => Promise<Response>;
