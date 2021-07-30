import { ModelComment } from './ModelComment';

export interface IThread {
    username: string;
    title: string;
    body: string;
    comments?: ModelComment[];
    timestamp: Date;
}

export class ModelThread implements IThread {
    id: number;
    username: string;
    title: string;
    body: string;
    comments?: ModelComment[];
    timestamp: Date;
}
