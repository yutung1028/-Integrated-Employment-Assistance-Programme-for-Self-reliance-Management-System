/**
 * UserstatusController
 *
 * @description :: Server-side logic for managing userstatuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	homepage: function(req,res) {
		Userstatus.find()
				.exec(function(err, result) {
					if (err) console.log(err);
					
					return res.view('user_status', {data: result, user: req.user});
				})
		
	},
	addStatus: function(req,res){
		var data_from_client = req.params.all();
		
		if(req.isSocket && req.method === 'POST'){

			// This is the message from connected client
			// So add new conversation
			Userstatus.create(data_from_client)
				.exec(function(error,data_from_client){
					Userstatus.publishCreate({id: data_from_client.id, display_name:data_from_client.display_name, message : data_from_client.message , status:data_from_client.status,createdAt: data_from_client.createdAt});
				}); 
		}
		else if(req.isSocket){
			Userstatus.watch(req.socket);
			
			console.log( 'User subscribed to ' + req.socket.id );
		}
	}
};

