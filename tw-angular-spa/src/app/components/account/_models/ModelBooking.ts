import { ModelProfile } from './ModelProfile';

export interface Ibooking {
    id?: number;
    bookedWithUserId: number;
    requestedDT: Date;
}

export class ModelBooking implements Ibooking {
    id?: number;
    bookingOwnerId: number;
    bookedWithUserId: number;
    requestedDT: Date;
    statusId: number;
    bookingCreated: Date;
    bookingUpdated: Date;
    bookingOwner: ModelProfile;
    bookedWithUser: ModelProfile;
}

export class ModelBookingCreate implements Ibooking {
    id?: number;
    bookedWithUserId: number;
    requestedDT: Date;
}
