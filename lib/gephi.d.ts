import { Observable } from '@reactivex/rxjs';
import { IHenryConfig } from './index';
export declare type GephiOptions = {
    limit: number;
    subject: string;
    predicate: string;
    object: string;
};
export declare type GephiNode = {
    [index: string]: {
        label: string;
        size: number;
        x: string;
        y: string;
    };
};
export declare type GephiEdge = {
    [index: string]: {
        source: string;
        label: string;
        pred: string;
        target: string;
    };
};
export declare type GephiAddEdge = {
    ae: GephiEdge;
};
export declare type GephiAddNode = {
    an: GephiNode;
};
export declare type GephiOperation = GephiAddNode | GephiAddEdge;
export declare type GephiStream = Observable<GephiOperation>;
export declare function gephi(config: IHenryConfig): (options: GephiOptions) => Observable<GephiOperation>;
