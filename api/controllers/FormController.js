/**
 * FormController
 *
 * @description :: Server-side logic for managing forms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	initial_message: function(req, res) {
		return res.view('forms/initial_message');
	},
	tenachi: function(req, res) {
		var input = req.allParams();
		//console.log(input);
		cases = {};
		cases['eng_name'] = input.eng_name;
		cases['ref_no'] = input.ref_no;
		if (typeof input.sr_no != 'undefined') {
			cases['sr_no'] = input.sr_no;
		}
		if (typeof input.chin_name != 'undefined') {
			cases['chin_name'] = input.chin_name;
		}
		if (typeof input.print_date != 'undefined') {
			cases['print_date'] = CommonService.splitPrintDate(input.print_date);
			//console.log(cases['print_date']);
		};

		if (typeof input.interview_date != 'undefined') {
			cases['interview_date'] = CommonService.splitDate(input.interview_date);
			//console.log(interview_date);
		};
		if (input.interview_time) {
			cases['interview_time'] = CommonService.splitTime(input.interview_time);
			//console.log(interview_time);
		};
		User.find({id: input.witness}).exec(function(err, record) {
			if (typeof record[0] != 'undefined') {
				//console.log(record);
				cases['witness'] = CommonService.getUserInfo(record[0]);
			}
			//console.log(witness);
			return res.view('forms/10a-chi', cases);
		})
		
	},
	otwoachi: function(req, res) {
		var input = req.allParams();
		cases = {};
		cases['eng_name'] = input.eng_name;
		cases['ref_no'] = input.ref_no;
		if (typeof input.sr_no != 'undefined') {
			cases['sr_no'] = input.sr_no;
		}
		if (typeof input.chin_name != 'undefined') {
			cases['chin_name'] = input.chin_name;
		}
		if (typeof input.print_date != 'undefined') {
			cases['print_date'] = CommonService.splitPrintDate(input.print_date);
			//console.log(cases['print_date']);
		};

		if (typeof input.interview_date != 'undefined') {
			cases['interview_date'] = CommonService.splitDate(input.interview_date);
			//console.log(interview_date);
		};
		if (typeof input.interview_time != 'undefined') {
			cases['interview_time'] = CommonService.splitTime(input.interview_time);
			//console.log(interview_time);
		};
		User.find({id: input.witness}).exec(function(err, record) {
			if (typeof record[0] != 'undefined') {
				//console.log(record);
				cases['witness'] = CommonService.getUserInfo(record[0]);
			}
			//console.log(witness);
			return res.view('forms/o2a-chi', cases);
		})
		
	},
	foureng: function(req, res) {
		var input = req.allParams();
		cases = {};
		cases['eng_name'] = input.eng_name;
		cases['ref_no'] = input.ref_no;
		if (typeof input.sr_no != 'undefined') {
			cases['sr_no'] = input.sr_no;
		}
		if (typeof input.chin_name != 'undefined') {
			cases['chin_name'] = input.chin_name;
		}
		if (typeof input.print_date != 'undefined') {
			cases['print_date'] = CommonService.splitPrintDate(input.print_date);
			//console.log(cases['print_date']);
		};

		if (typeof input.interview_date != 'undefined') {
			cases['interview_date'] = CommonService.splitDate(input.interview_date);
			//console.log(interview_date);
		};
		if (typeof input.interview_time != 'undefined') {
			cases['interview_time'] = CommonService.splitTime(input.interview_time);
			//console.log(interview_time);
		};
		User.find({id: input.witness}).exec(function(err, record) {
			if (typeof record[0] != 'undefined') {
				//console.log(record);
				cases['witness'] = CommonService.getUserInfo(record[0]);
			}
			//console.log(witness);
			return res.view('forms/4-eng', cases);
		})
	}
};

