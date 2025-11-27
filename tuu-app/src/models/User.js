class User {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.email = data.email || '';
        this.phoneNumber = data.phoneNumber || '';
        this.role = data.role || ''; // 'STUDENT', 'TUTOR', 'ADMIN'
        this.profileImage = data.profileImage || null;
    }

    isValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    isValidPhone() {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(this.phoneNumber);
    }

    // Basic validation
    isValid() {
        return (
            this.name &&
            this.isValidEmail() &&
            this.isValidPhone() &&
            this.role
        );
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phoneNumber: this.phoneNumber,
            role: this.role,
            profileImage: this.profileImage
        };
    }

    static fromJSON(json) {
        return new User(json);
    }
}

export default User;