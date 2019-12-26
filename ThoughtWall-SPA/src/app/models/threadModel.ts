export interface ThreadModel {
    id: number;
    user?: any;
    username: string;
    title: string;
    body: string;
    timeStamp: Date;
    comments: any[];
}