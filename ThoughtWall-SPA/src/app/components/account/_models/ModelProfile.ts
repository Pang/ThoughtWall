export interface IProfile {
    username: string;
    bio?: string;
    country?: string;
    dob?: Date;
}

export class ModelProfile implements IProfile {
    id: number;
    username: string;
    bio?: string;
    country?: string;
    dob?: Date;
}
