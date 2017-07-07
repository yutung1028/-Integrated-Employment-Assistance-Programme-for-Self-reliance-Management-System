/**
 * ActivityMonitor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		activity_type: {
  			type: 'integer',
  			required: true
  		},
  		user_id: {
            type: 'integer',
            required: true,
            model: 'user'
        },
        page: {
        	type: 'string',
        	required: false
        }
  }
};

