export class IBooking {
    constructor(
        public placeId: string,
        public userId: string,
        public placeTitle: string,
        public placeImage: string,
        public firstName: string,
        public lastname: string,
        public guestNumber: number,
        public bookedFrom: Date,
        public bookedTo: Date
    ) {}
}
