export interface IComment {
    username: string;
    body: string;
    timestamp: Date;
}

export class ModelComment implements IComment {
    id: number;
    threadId: number;
    userId: number;
    username: string;
    body: string;
    timestamp: Date;
}
