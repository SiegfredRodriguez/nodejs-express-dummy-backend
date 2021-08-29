let knex = require('./knex');
const {ERR_STATUS} = require("../service/contact-service.constants");

let CONTACT_TABLE = 'phonebook.contact';

function register(contact, onSuccess, onFailure) {
    return knex(CONTACT_TABLE).insert({
        id: contact.id,
        name: contact.name,
        gender: contact.gender,
        birthdate: contact.birthdate
    }).then(onSuccess, err => {
        onFailure({
            status: ERR_STATUS.DATA_STORE_EXCEPTION,
            message: err.toString()
        })
    });
}

// Experimentation on "Responsibility Positioning"
function update(contactId, newFieldData, onSuccess, onFailure) {
    knex(CONTACT_TABLE)
        .update(newFieldData)
        .where('id', contactId)
        .then(result => {
            if (result === 1) {
                onSuccess(result)
            } else {
                onFailure({
                    status: ERR_STATUS.NOT_FOUND,
                    message: `No contact with ID ${contactId} was found.`
                })
            }
        }, err => {
            onFailure({
                status: ERR_STATUS.DATA_STORE_EXCEPTION,
                message: err.toString()
            })
        });
}

// Dodging delete keyword.
function deleteContact(id, onSuccess, onFailure) {
    return knex(CONTACT_TABLE)
        .delete()
        .where('id', id)
        .then(result => {
            if (result === 1) {
                onSuccess(result)
            } else {
                onFailure({
                    status: ERR_STATUS.NOT_FOUND,
                    message: `No contact with ID ${id} was found.`
                })
            }
        }, err => {
            onFailure({
                status: ERR_STATUS.DATA_STORE_EXCEPTION,
                message: err.toString()
            })
        });
}

function find(contactId, onSuccess, onFailure) {
    return knex(CONTACT_TABLE).select()
        .where('id', contactId)
        .first()
        .then(
            result => {
                if (result === undefined) {
                    onFailure({
                        status: ERR_STATUS.NOT_FOUND,
                        message: `No contact with ID ${contactId} was found.`
                    });
                } else {
                    onSuccess(result);
                }
            },
            err => {
                onFailure({
                    status: ERR_STATUS.DATA_STORE_EXCEPTION,
                    message: err.toString()
                })
            });
}

function getAll() {
    return knex(CONTACT_TABLE).select();
}

module.exports = {
    register: register,
    update: update,
    deleteContact: deleteContact,
    find: find,
    getAll: getAll
}