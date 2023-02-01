const knex = require('knex');

const knexfile = require('../../knexfile');

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = knex(configOptions);