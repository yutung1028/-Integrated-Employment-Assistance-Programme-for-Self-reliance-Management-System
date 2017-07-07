//Acivities Monitor Service

module.exports = {

	markActivity: function(user, activityType, page, cb) {
		if (sails.config.monitor.power != 'off' || activityType == '3' || activityType == '4') {
			//Activity Type:
			// 1. login
			// 2. read
			// 3. upload

			if (typeof user == 'undefined' || typeof activityType == 'undefined') {
				console.log("Error! Cannot create record in Activity Monitor.");
				return;
			};
			activity_record = {
				user_id: user.id,
				activity_type: activityType
			}
			if (typeof page != 'undefined' && page != '') {
				activity_record.page = page;
			};
			ActivityMonitor.create(activity_record)
							.exec(function (err, record){
			    if (err) console.log(err);
			    //console.log(record);
			    cb();
			});
		} else {
				cb();
	  	}
	} 
};