import { GephiOptions, GephiStream } from './gephi';
export interface IHenryConfig {
    host: string;
}
export declare type Henry = {
    gephi: (options: GephiOptions) => GephiStream;
};
export default function henry(config: IHenryConfig): Henry;
