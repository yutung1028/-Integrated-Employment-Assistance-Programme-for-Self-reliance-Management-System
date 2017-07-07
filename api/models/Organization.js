/**
 * Organization.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		chinese_name: {
            type: 'string',
            required: true
        },
        english_name: {
            type: 'string',
            required: true
        },
        users: {
          collection: 'user',
          via: 'organization'
        }
  }
};

