const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super (name, id, email);
        this.officeNumber = officeNumber;
    }
getRole() {
    return 'Manager';
}
getOfficeNumber() {
    return this.officeNumber;
}
};

const manager = new Manager('Bob', 123, 'bob@gmail.com', 404);

const role = manager.getRole();
console.log(role);

module.exports = Manager;