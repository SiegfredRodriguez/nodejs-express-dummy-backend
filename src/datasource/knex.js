let environment = process.env.NODE_ENV || 'development';
let dbCredentials = require('../../config')[environment];

const knex = require('knex')(dbCredentials);

module.exports = knex;