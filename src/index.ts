import { graphql, GraphQLOptions, GraphQLResult } from './graphql';

export interface IHenryConfig {
  host: string;
}

export type Henry = {
  graphql: (options: GraphQLOptions) => Promise<GraphQLResult>;
};

export default function henry(config: IHenryConfig): Henry {

  return {
    graphql: graphql(config),
  };
}
