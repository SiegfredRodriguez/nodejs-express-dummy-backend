let contactRepo = require('../datasource/contact');
let uuid = require('uuid');

// OK return is created ID
function register(contact, onSuccess, onFailure) {
    const entity = {
        id: uuid.v4(),
        name: contact.name,
        gender: contact.gender,
        birthdate: contact.birthdate
    }

    contactRepo.register(entity, () => {
        onSuccess(entity.id);
    }, error => {
        logError(error);
        onFailure(error);
    });
}

function deleteContact(contactId, onSuccess, onFailure) {
    contactRepo.deleteContact(contactId, onSuccess, error => {
        logError(error)
        onFailure(error);
    });
}

function update(contactId, newFieldData, onSuccess, onFailure) {
    contactRepo.update(contactId, newFieldData, onSuccess, error => {
        logError(error);
        onFailure(error);
    });
}

function findContact(contactId, onSuccess, onFailure) {
    // If align DB model and business entity if they mismatched.
    // Lucky we don't need to in this example.
    contactRepo.find(contactId,
        onSuccess,
        error => {
            logError(error);
            onFailure(error);
        });
}

function getAllContacts(onSuccess, onFailure) {
    contactRepo.getAll()
        .then(onSuccess, onFailure);
}

function logError(error) {
    console.log(`ERR ${JSON.stringify(error)}`)
}

module.exports = {
    register: register,
    update: update,
    deleteContact: deleteContact,
    find: findContact,
    getAll: getAllContacts
};
