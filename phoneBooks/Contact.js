const { getDaysUntilBirthday } = require("./getDaysUntilBirthday");

class Contact {
    firstName = "";
    lastName = "";
    email = "";
    phone = "";
    birthday = new Date();

    constructor(newContact) {
        this.firstName = newContact.first;
        this.lastName = newContact.last;
        this.email = newContact.email;
        this.phone = newContact.phone;
        this.birthday = newContact.birth;
    }

    leftBirthday() {
        return getDaysUntilBirthday(this.birthday);
    }

    updatePhone(newNumber) {
        this.phone = newNumber;
    }

    updateEmail(newEmail) {
        this.email = newEmail;
    }

    getInfo() {
        // Function to format a date as YYYY-MM-DD
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
    
        // Create a message with contact details
        const message = `Full name: ${this.lastName} ${this.firstName}\nPhone: ${this.phone}\nEmail: ${this.email}\nDate of Birth: ${formatDate(this.birthday)}\nDays till birthday: ${this.leftBirthday()}`;
        
        return message;
    }
    
}

module.exports = Contact;
