class Tutor {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.email = data.email || '';
        this.phoneNumber = data.phoneNumber || '';
        this.qualification = data.qualification || '';
        this.experience = data.experience || 0;
        this.subjects = data.subjects || [];
        this.availability = data.availability || [];
        this.hourlyRate = data.hourlyRate || 0;
        this.rating = data.rating || 0;
        this.bio = data.bio || '';
        this.profileImage = data.profileImage || null;
        this.isVerified = data.isVerified || false;
        this.specializations = data.specializations || [];
        this.teachingMode = data.teachingMode || 'both'; // 'online', 'inPerson', 'both'
        this.location = data.location || {
            address: '',
            city: '',
            state: '',
            country: '',
            pincode: ''
        };
    }

    // Validation methods
    isValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    isValidPhone() {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(this.phoneNumber);
    }

    isValidHourlyRate() {
        return this.hourlyRate > 0;
    }

    // Convert to API format
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phoneNumber: this.phoneNumber,
            qualification: this.qualification,
            experience: this.experience,
            subjects: this.subjects,
            availability: this.availability,
            hourlyRate: this.hourlyRate,
            rating: this.rating,
            bio: this.bio,
            profileImage: this.profileImage,
            isVerified: this.isVerified,
            specializations: this.specializations,
            teachingMode: this.teachingMode,
            location: this.location
        };
    }

    // Create from API response
    static fromJSON(json) {
        return new Tutor(json);
    }

    // Basic validation of required fields
    isValid() {
        return (
            this.name &&
            this.isValidEmail() &&
            this.isValidPhone() &&
            this.qualification &&
            this.experience >= 0 &&
            this.subjects.length > 0 &&
            this.isValidHourlyRate()
        );
    }
}

export default Tutor;