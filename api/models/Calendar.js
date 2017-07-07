/**
 * Calendar.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	title: {
	    type: 'string',
	    required: true,
	    unique: false
	},
  	location: {
	    type: 'integer',
	    required: true,
	    unique: false
	},
  	start: {
	    type: 'datetime',
	    required: true,
	    unique: false
	},
  	end: {
	    type: 'datetime',
	    required: true,
	    unique: false
	},
  	room_booked: {
	    type: 'integer',
	    required: false,
	    unique: false
	},
  	allDay: {
	    type: 'boolean',
	    required: true,
	    unique: false
	},
  	color: {
	    type: 'string',
	    required: false,
	    unique: false
	},
  	remark: {
	    type: 'string',
	    required: false,
	    unique: false
	}
  }
};

