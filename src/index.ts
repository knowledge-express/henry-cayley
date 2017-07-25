import { graphql, GraphQLOptions } from './graphql';

export interface IHenryConfig {
  host: string;
}

export type Henry = {
  graphql: (options: GraphQLOptions) => Promise<Response>;
};

export default function henry(config: IHenryConfig): Henry {

  return {
    graphql: graphql(config),
  };
}
