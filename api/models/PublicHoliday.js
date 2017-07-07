/**
 * PublicHoliday.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		english_name: {
            type: 'string',
            required: true
        },
        chinese_name: {
            type: 'string',
            required: true
        },
        day: {
            type: 'string',
            required: true
        },
        month: {
            type: 'string',
            required: true
        },
        year: {
            type: 'string',
            required: true
        },
        duration: {
            type: 'integer',
            required: true
        }
  }
};

