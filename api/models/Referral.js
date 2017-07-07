/**
 * Referral.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
	  	hkic_no: {
	            type: 'integer',
	            required: true,
	            unique: true
	    },
	    english_name: {
	            type: 'string',
	            required: true,
	            unique: false
	    },
	    chinese_name: {
	            type: 'string',
	            required: true,
	            unique: false
	    },
	    date_of_birth: {
	            type: 'date',
	            required: true,
	            unique: false
	    },
	    sex: {
	            type: 'integer',
	            required: true,
	            unique: false
	    },
	    martial_status: {
	            type: 'integer',
	            required: true,
	            unique: false
	    },
	    res_no: {
	            type: 'string',
	            required: true,
	            unique: false
	    },
	    mobile: {
	            type: 'string',
	            required: true,
	            unique: false
	    },
	    referral_date: {
	            type: 'date',
	            required: true,
	            unique: false
	    },
	    status: {
	            type: 'integer',
	            required: true,
	            unique: false
	    },
	    invite_letter: {
	            type: 'integer',
	            required: true,
	            unique: false
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
  }
};

