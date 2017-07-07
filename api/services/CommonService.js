//Common Service
module.exports = {

	changeDateFormat: function(date_object) {
		//TODO:check whether its a date object
		date_object = date_object.getFullYear() + "-" + (date_object.getMonth() + 1) + "-" + date_object.getDate();
		return date_object;
	},
	changeExcelDate: function(excel_date) {
		var date_array = excel_date.split("/");
		//console.log(date_array);
		//console.log(cases['Date of Enrollment']);
		if (date_array.length == 3) {

			var year = date_array[2];
			
			if (year.length == 2) {
				// enrollment date = mm/dd/yy
				year = '20' + year;
				month = (parseInt(date_array[0]) - 1).toString();
				day = date_array[1];

			} else if (year.length == 4) {
				// enrollment date = dd/mm/yyyy
				month = (parseInt(date_array[1]) - 1).toString();
				day = date_array[0];

			};
			//console.log(year + '-' + month + '-' + day)

		 	return new Date(year, month, day);//.toISOString().slice(0, 19).replace('T', ' ');

		} else {
			// error that not year, month and day elements.
		}
	}, 
	generateWitness: function(organization) {
		User.find({organization: organization}).exec(function(err, record) {
			//console.log(record);
			witness_list = record;
			return witness_list;
		})
	},
	generateFollowingDates: function(number, cb) {
		
		//console.log(currentDate + ' ' + nextDate + ' ' + nextnextDate);
		days = new Array();
		for (var i = 0; i < number; i++) {
			days[i] = new Object();
			days[i]['date'] = new Date(new Date().getTime() + 24 * (i) * 60 * 60 * 1000);
			days[i]['weekday'] = days[i]['date'].getDay();
			//days[i]['date'] = days[i]['date'].getDate() + "/" + (days[i]['date'].getMonth() + 1) + "/" + days[i]['date'].getFullYear();
			days[i]['month'] = days[i]['date'].getMonth() + 1;
			days[i]['year'] = days[i]['date'].getFullYear();
			days[i]['date'] = days[i]['date'].getDate();
			
			PublicHoliday.find({month:days[i]['month'], year:days[i]['year'], day: days[i]['date']})
					 	 .exec(function(err, result) {
						 	if (err) console.log(err);

						 	if (result.length == 1) { 
						 		public_holiday = new Object();
							 	public_holiday['chinese_name'] = result[0]['chinese_name'];
							 	public_holiday['english_name'] = result[0]['english_name'];
							 	public_holiday['date'] = result[0]['day'];
						 		
						 		days.forEach(function(day) {
						 			if (day['date'] == public_holiday['date']) {
						 				day['public_holiday'] = public_holiday;
						 			};
						 		});
						 		//console.log(days);
						 		//cb(days);
						 	}
						 	
						 	loop_number++;

						 	if (loop_number == number) cb(days);
					 		
						 });
			days[i]['number'] = i + 1;
			if (i + 1 == number) loop_number = 0;
		};
		
		
	},
	convertDayNum2Name: function(day_num) {
		var day_name;
		if (day_num == 0) {
			day_name = '星期日';
		} else if (day_num == 1) {
			day_name = '星期一';
		} else if (day_num == 2) {
			day_name = '星期二';
		} else if (day_num == 3) {
			day_name = '星期三';
		} else if (day_num == 4) {
			day_name = '星期四';
		} else if (day_num == 5) {
			day_name = '星期五';
		} else if (day_num == 6) {
			day_name = '星期六';
		}
		return day_name;
	},
	splitDate: function(whole_date) {
		splited_date = whole_date.split("-");
		interview_date = {};	
		interview_date['year'] = splited_date[0];
		interview_date['month'] = splited_date[1];
		interview_date['day'] = splited_date[2];

		return interview_date;
	},
	getUserInfo: function(user_record) {
		user = {};
		if (user_record.engFullName != 'undefined') {
			user['eng_name'] = user_record.engFullName;
		};
		if (user_record.chinFullName != 'undefined') {
			user['chin_name'] = user_record.chinFullName;
		};
		user['position'] = user_record.position;
		return user;
	}, 
	splitTime: function(whole_time) {
		if (whole_time != 'null') {
			interview_time = {};
			if (whole_time.length == 3) {
				interview_time['hour'] = whole_time.substr(0,1);
				interview_time['minutes'] = whole_time.substr(1);
				interview_time['half_day'] = 0;
				//console.log(interview_time);
				return interview_time;
			} else if (whole_time.length == 4) {

				interview_time['hour'] = whole_time.substr(0,2);

				if (interview_time['hour'] > 11) {

					interview_time['half_day'] = 1;

					if (interview_time['hour'] > 12) {
						interview_time['hour'] = interview_time['hour'] - 12;
					};

				} else if (interview_time['hour'] <= 11) {
					interview_time['half_day'] = 0;
				}
				interview_time['minutes'] = whole_time.substr(2);
				//console.log(interview_time);
				return interview_time;
			} else {
				//error handle
			}
		}
	},
	splitPrintDate: function(whole_date) {
		splited_date = whole_date.split("/");
		print_date = {};	
		print_date['year'] = splited_date[2];
		print_date['month'] = splited_date[1];
		print_date['day'] = splited_date[0];

		return print_date;
	},
	compareExcelSqlDate: function(excel_date, sql_date) {
		excel_date = new Date(new Date(excel_date).getTime() + (3600000 * 8) ).getTime();
		sql_date = new Date(sql_date).getTime();

		if (excel_date != sql_date) {
			return true;
		} else {
			return false;
		}
	}

};