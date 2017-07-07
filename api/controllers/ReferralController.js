/**
 * ReferralController
 *
 * @description :: Server-side logic for managing Referrals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view: function(req,res) {		
		ActivityMonitorService.markActivity(req.user, 2, 'referral view', function() {
			Referral.find()
				.exec(function(err, result) {
					if (err) console.log(err);
				//	res.json(result);
					result.forEach(function(referral) {
						referral.date_of_birth = CommonService.changeDateFormat(referral.date_of_birth);
						referral.referral_date = CommonService.changeDateFormat(referral.referral_date);
						//console.log(referral);
					}) 
					return res.view('homepage', {data: result})
			          // res.view({
			          //   layout: "layout",
			          //   posts: result
			          // });    
			})
		})
		
	},
	add: function(req,res) {
		return res.view('referral/add_referral');
	}
};

