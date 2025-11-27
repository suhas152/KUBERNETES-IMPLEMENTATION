class Booking {
    constructor(data = {}) {
        this.id = data.id || null;
        this.studentId = data.studentId || null;
        this.tutorId = data.tutorId || null;
        this.subject = data.subject || '';
        this.startTime = data.startTime || null;
        this.endTime = data.endTime || null;
        this.status = data.status || 'PENDING'; // 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'
        this.mode = data.mode || 'online'; // 'online', 'inPerson'
        this.location = data.location || null;
        this.notes = data.notes || '';
        this.price = data.price || 0;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    isValidTimeRange() {
        if (!this.startTime || !this.endTime) return false;
        return new Date(this.startTime) < new Date(this.endTime);
    }

    isValidPrice() {
        return this.price > 0;
    }

    isValid() {
        return (
            this.studentId &&
            this.tutorId &&
            this.subject &&
            this.isValidTimeRange() &&
            this.isValidPrice()
        );
    }

    toJSON() {
        return {
            id: this.id,
            studentId: this.studentId,
            tutorId: this.tutorId,
            subject: this.subject,
            startTime: this.startTime,
            endTime: this.endTime,
            status: this.status,
            mode: this.mode,
            location: this.location,
            notes: this.notes,
            price: this.price,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    static fromJSON(json) {
        return new Booking(json);
    }
}

export default Booking;