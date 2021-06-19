export interface IProfile {
    username: string;
    bookingsEnabled: boolean;
    bio?: string;
    country?: string;
    dob?: Date;
}

export class ModelProfile implements IProfile {
    id: number;
    username: string;
    bookingsEnabled: boolean;
    bio?: string;
    country?: string;
    dob?: Date;
}
