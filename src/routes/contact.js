let router = require('express').Router();
let validator = require('validator');
let utils = require('../util/utility');
let contactService = require('../service/contact-service');

const {NOT_FOUND, CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST, OK, NO_CONTENT} = require("http-status-codes");
const {ERR_STATUS} = require("../service/contact-service.constants");
const moment = require("moment");


router
    .post('/', contactModelValidator, registerContact)
    .patch('/:id', pathContactIdValidator, contactModelValidator, updateContact)
    .delete('/:id', pathContactIdValidator, deleteContact)
    .get('/', getContacts)
    .get('/:id', pathContactIdValidator, getContact)
    .get('/form/gender', getGenderChoices);


const GENDER_CHOICES = ['male', 'female'];
const DATE_FORMAT = 'mm-dd-yyyy';

function registerContact(req, res) {

    const contactData = {
        name: req.body.name,
        gender: req.body.gender,
        birthdate: req.body.birthdate
    };

    contactService.register(contactData, id => {
            contactService.find(id,
                result => res.status(CREATED).json(result),
                error => setInternalError(res, error.message)
            );
        },
        error => setInternalError(res, error.message)
    );

}

function updateContact(req, res) {
    let contactId = req.params.id;
    let fields = req.body;

    contactService.update(contactId, fields,
        () => {
            contactService.find(contactId,
                result => res.status(OK).json(result),
                error => setInternalError(res, error.message)
            );
        },
        error => {
            if (error.status === ERR_STATUS.NOT_FOUND) {
                res.status(NOT_FOUND).end();
            } else {
                setInternalError(res, error.message);
            }
        });
}

function deleteContact(req, res) {
    let id = req.params.id;

    contactService.deleteContact(id, () => {
        res.status(NO_CONTENT).end();
    }, error => {
        if (error.status === ERR_STATUS.NOT_FOUND) {
            res.status(NOT_FOUND).end();
        } else {
            setInternalError(res, error.message);
        }
    });
}

function getContacts(req, res) {
    contactService.getAll(
        result => {
            result = result.map(item => ({...item, birthdate: moment(item.birthdate).format('MM-DD-yyyy')}))
            res.json(result);
        },
        error => setInternalError(res, error.message)
    );
}

function getContact(req, res) {
    let id = req.params.id;

    contactService.find(id,
        data => {
            data.birthdate = moment(data.birthdate).format('MM-DD-yyyy');
            res.json(data);
        },
        error => {
            if (error.status === ERR_STATUS.NOT_FOUND) {
                res.status(NOT_FOUND).end();
            } else {
                setInternalError(res, error.message);
            }
        });
}

function getGenderChoices(req, res) {
    res.json({choices: GENDER_CHOICES});
}

const validId = (id) => validator.isUUID(id);
const validName = (name) => !validator.isEmpty(name, {ignore_whitespace: true});
const validGender = (gender) => GENDER_CHOICES.includes(gender.toLowerCase());
const validDate = (birthDate) => validator.isDate(birthDate, {format: DATE_FORMAT});

const bodyValidators = {
    id: (data) => {
        if (!utils.isValid(data, validId)) {
            throw `Invalid id ${data}`;
        }
    },
    name: (data) => {
        if (!utils.isValid(data, validName)) {
            throw `Invalid parameter name: ${data}`;
        }
    },
    gender: (data) => {
        if (!utils.isValid(data, validGender)) {
            throw `Invalid parameter gender: ${data}`;
        }
    },
    birthdate: (data) => {
        if (!utils.isValid(data, validDate)) {
            throw `Invalid parameter birthdate (format mm-dd-yyyy): ${data}`;
        }
    },
}

function contactModelValidator(req, res, next) {
    try {
        for (let key of Object.keys(req.body)) {
            let validator = bodyValidators[key];

            if (validator === undefined) {
                throw `Unknown field ${key}`;
            }

            validator(req.body[key]);
        }

        next();
    } catch (e) {
        setBadRequest(res, e);
    }
}

function pathContactIdValidator(req, res, next) {
    try {
        if (!utils.isValid(req.params.id, validId)) {
            throw `Invalid id ${req.params.id}`;
        }
        next();
    } catch (e) {
        setBadRequest(res, e);
    }
}

const setBadRequest = (res, message) => {
    res.status(BAD_REQUEST)
        .json({error: message})
}

const setInternalError = (res, message) => {
    res.status(INTERNAL_SERVER_ERROR)
        .json({error: message})
}


module.exports = router;

