import { GraphQLOptions } from './graphql';
export interface IHenryConfig {
    host: string;
}
export declare type Henry = {
    graphql: (options: GraphQLOptions) => Promise<Response>;
};
export default function henry(config: IHenryConfig): Henry;
