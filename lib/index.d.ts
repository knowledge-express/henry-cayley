import { GraphQLOptions, GraphQLResult } from './graphql';
export interface IHenryConfig {
    host: string;
}
export declare type Henry = {
    graphql: (options: GraphQLOptions) => Promise<GraphQLResult>;
};
export default function henry(config: IHenryConfig): Henry;
