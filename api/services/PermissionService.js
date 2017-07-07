//Permission Service

module.exports = {

	checkUserPermissions: function(user, permission , cb1, cb2) {
		//console.log(user.id);
		UserPermissionMap.find({user_id: user.id})
						 .exec(function(err, result) {
						 	if (err) console.log(err);
						 	//console.log(result);
						 	permissions_list = result[0].permissions.split(",");

						 	var hv_permission = false;

						 	permissions_list.forEach(function(indi_per) {
						 		if (indi_per == permission) hv_permission = true;
						 	});

						 	if (hv_permission == true) {
						 		cb1();
						 	} else if (hv_permission == false) {
						 		cb2();
						 	}

						 })
	}

};