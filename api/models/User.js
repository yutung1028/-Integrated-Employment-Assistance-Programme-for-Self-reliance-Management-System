/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt-nodejs');

module.exports = {

    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        display_name: {
            type: 'string',
            maxLength: 10,
            required: true
        },
        chinFullName: {
            type: 'string',
            required: false
        },
        engFullName: {
            type: 'string',
            required: false
        },
        organization: {
            type: 'integer',
            required: true,
            model: 'organization'
        },
        position: {
            type: 'string',
            required: false
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },
        cases: {
          collection: 'cases',
          via: 'witness'
        },
        userPermission: {
          collection: 'userPermissionMap',
          via: 'user_id'
        },
        userActivity: {
          collection: 'activityMonitor',
          via: 'user_id'
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};

