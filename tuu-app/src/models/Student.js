import User from './User';

class Student extends User {
    constructor(data = {}) {
        super(data);
        this.role = 'STUDENT';
        this.grade = data.grade || '';
        this.subjects = data.subjects || [];
        this.preferredTeachingMode = data.preferredTeachingMode || 'both'; // 'online', 'inPerson', 'both'
        this.location = data.location || {
            address: '',
            city: '',
            state: '',
            country: '',
            pincode: ''
        };
    }

    isValid() {
        return (
            super.isValid() &&
            this.grade &&
            this.subjects.length > 0
        );
    }

    toJSON() {
        return {
            ...super.toJSON(),
            grade: this.grade,
            subjects: this.subjects,
            preferredTeachingMode: this.preferredTeachingMode,
            location: this.location
        };
    }

    static fromJSON(json) {
        return new Student(json);
    }
}

export default Student;