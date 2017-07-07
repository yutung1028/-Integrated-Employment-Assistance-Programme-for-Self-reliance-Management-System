/**
 * CalendarController
 *
 * @description :: Server-side logic for managing calendars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');

module.exports = {
	mainpage: function(req, res) {
		Calendar.find()
			.exec(function(err, result) {
				if (err) console.log(err);
				res.view('calendar', {events: result})
			})
	},
	events_data: function(req, res) {
		Calendar.find()
				.exec(function(err, result) {
					if (err) console.log(err);
					//console.log(result);
					res.json(result);
				})
	},
	add_wpi_booking: function(req, res) {
		//console.log(req.allParams());

		var input = req.allParams();

		var event_name = input.eng_name + ' 面談';
		var start_datetime = input.start_date + ' ' + input.start_time;
		var end_datetime = input.start_date + ' ' + input.end_time;
		var room = input.room_booked;
		var event_remark = input.remark;
		Calendar.create({title: event_name, location: 2, start: start_datetime, end: end_datetime, allDay: false, room_booked: room, remark: event_remark})
				.exec(function createCB(err, created) {
					console.log(created);
				})
		res.redirect('/calendar');
	},
	add_booking: function(req, res) {
		return res.view('cal_booking');
	},
	cal_message: function(req, res) {
		return res.view('cal_message');
	},
	output_doc: function(req, res) {
		//Load the docx file as a binary
		var appRoot = process.cwd();
		var content = fs
		    .readFileSync(appRoot + "/assets/forms/10a.doc", "binary");

		var doc = new Docxtemplater(content);

		//set the templateVariables
		// doc.setData({
		//     "first_name":"Hipp",
		//     "last_name":"Edgar",
		//     "phone":"0652455478",
		//     "description":"New Website"
		// });

		//apply them (replace all occurences of {first_name} by Hipp, ...)
		doc.render();

		var buf = doc.getZip()
		             .generate({type:"nodebuffer"});

		fs.writeFileSync(__dirname+"/IEAPS-10a - Job Seeker's Diary & Workplan (Chi).doc",buf);

		res.download(__dirname + "/IEAPS-10a - Job Seeker's Diary & Workplan (Chi).doc", function() {
			fs.unlink(__dirname + "/IEAPS-10a - Job Seeker's Diary & Workplan (Chi).doc", function(err) {
			   if (err) {
			       return console.error(err);
			   }
			   console.log("File deleted successfully!");
			});
		});
	}
};

