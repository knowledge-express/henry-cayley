import { gephi, GephiOptions, GephiStream } from './gephi';

export interface IHenryConfig {
  host: string;
}

export type Henry = {
  gephi: (options: GephiOptions) => GephiStream;
};

export default function henry(config: IHenryConfig): Henry {

  return {
    gephi: gephi(config),
  };
}
