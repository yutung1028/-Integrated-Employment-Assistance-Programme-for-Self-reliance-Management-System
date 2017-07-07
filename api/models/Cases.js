/**
 * Cases.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	sr_no: {
            type: 'integer',
            required: false,
            unique: false
    },
    ref_no: {
    		type: 'integer',
            required: true,
            unique: false
    },
    english_name: {
            type: 'string',
            required: true,
            unique: false
    },
    chinese_name: {
            type: 'string',
            required: false,
            unique: false
    },
    wpi_first: {
            type: 'integer',
            required: false,
            unique: false
    },
    wpi_second: {
            type: 'integer',
            required: false,
            unique: false
    },
    enrollment_date: {
            type: 'date',
            required: false,
            unique: false
    },
    interview_date: {
            type: 'date',
            required: false,
            unique: false
    },
    interview_time: {
            type: 'string',
            required: false,
            unique: false
    },
    witness: {
            type: 'integer',
            required: false,
            unique: false,
            model: 'user'
    },
    organization: {
            type: 'integer',
            required: true,
            unique: false
    },
    status: {
            type: 'integer',
            required: true
    },
    remark: {
            type: 'string',
            required: false
    },
    createdAt: {
            type: 'datetime',
            required: true,
            unique: false
    },
    updatedAt: {
            type: 'datetime',
            required: true,
            unique: false
    }
  },
  afterCreate: function(values, cb) {
    //console.log(values);
    cb();
  }
};

