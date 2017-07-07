/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req,res) {
		Users.find()
			.where({ userName: 'winnieteng1234' })
			.exec(function(err, result) {
				if (err) console.log(err);
				//res.json(result);
				res.view('login', {user: result})
		          // res.view({
		          //   layout: "layout",
		          //   posts: result
		          // });    
			})
		
	}
};

