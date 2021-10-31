// using Manager constructor 
const Manager = require('../lib/Manager');

// creating manager object  
test('creates an Manager object', () => {
    const manager = new Manager('jagy', 1001, 'jagytest@gmail', 88820111111);

    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// gets role from getRole()
test('gets role of employee', () => {
    const manager = new Manager('jagy', 1001, 'jagytest@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
});