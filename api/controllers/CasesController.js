/**
 * CasesController
 *
 * @description :: Server-side logic for managing cases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var XLSX = require('xlsx');
var fs = require('fs');

module.exports = {
	search: function(req,res) {
		//console.log(sails.config);
		ActivityMonitorService.markActivity(req.user, 2, 'case search', function() {
			User.find({organization: req.user.organization})
				.exec(function(err, result) {
					if (err) console.log(err);
					witness = result;
				})

			Cases.find()
			.populate('witness')
			.exec(function(err, result) {
				if (err) console.log(err);
				//console.log(result);
				result.forEach(function(cases) {
					if (cases.enrollment_date) {
						cases.enrollment_date = CommonService.changeDateFormat(cases.enrollment_date);
					}
					if (cases.interview_date) {
						cases.interview_date = CommonService.changeDateFormat(cases.interview_date);
					}
					if (cases.interview_time) {
						cases.interview_time = CommonService.splitTime(cases.interview_time);
					};
					
				}) 

				return res.view('cases/cases_search', {data: result, witness: witness, count: result.length});
		          
			})
		})
	}, 
	search_api: function(req, res) {

		var input = req.allParams();
		var case_list;
		//console.log(input);
		Cases.find()
			.populate('witness')
			.exec(function(err, result) {
				if (err) console.log(err);
				case_list = result;
				//console.log(result);
				if (input.sr_no != "") {
					case_list = case_list.filter(function(obj) {
				    	return (obj.sr_no == input.sr_no);
					});
					//console.log(case_list);
				}
				// if (input.date != "") {
				// 	case_list = case_list.filter(function(obj) {
				//     	return (CommonService.changeDateFormat(obj.enrollment_date) == input.date);
				// 	});
				// 	//console.log(case_list);
				// }
				if (input.witness != 0) {
					case_list = case_list.filter(function(obj) {
						if (typeof obj.witness != 'undefined') {
					    	return (obj.witness.id == input.witness);
					    }
					});
					//console.log(case_list);
				}

				case_list.forEach(function(cases) {
					if (cases.enrollment_date) {
						cases.enrollment_date = CommonService.changeDateFormat(cases.enrollment_date);
					}
					if (cases.interview_date) {
						cases.interview_date = CommonService.changeDateFormat(cases.interview_date);
					}
					if (cases.interview_time) {
						cases.interview_time = CommonService.splitTime(cases.interview_time);
					};
					//console.log(cases);
				}) 

				return res.view('cases/cases_search', {data: case_list, count: case_list.length});
			})
	},
	cases_print: function(req, res) {

		ActivityMonitorService.markActivity(req.user, 2, 'case print', function() {
			var input = req.allParams();
			//console.log(input.ref_no);
			ref_no = input.ref_no;
			//witness_list = CommonService.generateWitness(req.user.organization);

			
			// console.log(following_days);

			Cases.find({ref_no: ref_no})
				.exec(function (err, record) {
					//console.log(record);
					
					User.find({organization: req.user.organization})
						.exec(function(err, witness_list) {
						
						following_days = CommonService.generateFollowingDates(5, function(following_days) {
							following_days.forEach(function(following_day) {
								following_day['full_date'] = following_day['date'] + "/" + following_day['month'] + "/" + following_day['year'];
							});
							//console.log(following_days);
							
							return res.view('cases/cases_print', {case_data: record, witness_list: witness_list,following_days: following_days});
						});
						
					})
					
					
				})
		})
		
	},
	import_data_api: function(req, res) {

		req.file('file_upload').upload(function (err, files) {
	      	if (err) return res.serverError(err);

			var workbook = XLSX.readFile(files[0].fd);

			var first_sheet_name = workbook.SheetNames[0];

			/* Get worksheet */
			var worksheet = workbook.Sheets[first_sheet_name];
			
			var json_worksheet = XLSX.utils.sheet_to_json(worksheet);
			//console.log(req.user.organization);

			json_worksheet.forEach(function(cases) {

				if (typeof cases['Service Recipient No.'] != 'undefined' && typeof cases['Case Ref. No.'] != 'undefined') {
					if (cases['Service Recipient No.'] == 0 && cases['Case Ref. No.'] == 0) {
						return;
					}
				};

				var organization = req.user.organization;
				var witness;
				var indi_case = {organization: req.user.organization};

				if (typeof cases['Date/Status'] != 'undefined' && cases['Date/Status'].indexOf('/') != -1) {
					// Active cases. status = 0.
					indi_case['status'] = 0;

					//console.log(cases['Date/Status'] + ' ' + cases['Case Ref. No.']);
					if (typeof cases['Date/Status'] != 'undefined') {
						indi_case['interview_date'] = CommonService.changeExcelDate(cases['Date/Status']);
						//console.log(indi_case['interview_date']);
					}
					if (typeof cases['Time'] != 'undefined') {
						indi_case['interview_time'] = cases['Time'].replace(':','');
						//console.log(indi_case['interview_time']);
					}
					if (typeof cases['Name in Chinese'] != 'undefined') {
						indi_case['chinese_name'] = cases['Name in Chinese'];
						//console.log(chinese_name);
					}

					if (typeof cases['Name in English'] != 'undefined') {
						indi_case['english_name'] = cases['Name in English'];
						//console.log(cases['Name in English']);
					} else {
						console.log(cases['Date/Status'] + "The record have problem! No English Name");
						return;
					}

					if (typeof cases['Service Recipient No.'] != 'undefined') {
						indi_case['sr_no'] = cases['Service Recipient No.'];
						// console.log(sr_no);
					} else {
						// Not enroll yet
					}

					if (typeof cases['Case Ref. No.'] != 'undefined') {
						var ref_no = cases['Case Ref. No.'];
						indi_case['ref_no'] = cases['Case Ref. No.'];
						//console.log(ref_no);
					} else {
						console.log(cases['Date/Status'] + "The record have problem! No Case Ref. No.");
						return;
					}

					if (typeof cases['Fixed WPI (1)'] != 'undefined') {
						indi_case['wpi_first'] = cases['Fixed WPI (1)'];
					}

					if (typeof cases['Fixed WPI (2)'] != 'undefined') {
						indi_case['wpi_second'] = cases['Fixed WPI (2)'];
					}

					if (typeof cases['Date of Enrollment'] != 'undefined') {
						indi_case['enrollment_date'] = CommonService.changeExcelDate(cases['Date of Enrollment']);
						//console.log(indi_case['enrollment_date']);
					}

					if (typeof cases['EW/EO'] != 'undefined') {
					
						User.find({display_name: cases['EW/EO']}).exec(function (err, result){
						  if (err) {
						    return res.negotiate(err);
						  }
						  
						  if (typeof result[0] !== 'undefined' && result[0] !== null) {
						  	//console.log(result[0].id);
						  	 indi_case['witness'] = result[0].id;
						  } else {

						  	//console.log("no witness!")
						  }

						  Cases.find({ref_no: ref_no})
								.exec(function (err, record) {
									
									if (record.length == 0) {
										  
										ActivityMonitorService.markActivity(req.user, 3, '', function() {
											Cases.create(indi_case).exec(function createCB(err, created){
											  // console.log(err);
											  // console.log(created);
											});
										});
										
									} else {
										// Update record here.
										// Firstly check if the fileds "Date/Status" and "Time" have been changed.
									
										if (CommonService.compareExcelSqlDate(indi_case.interview_date, record[0].interview_date) || indi_case.interview_time != record[0].interview_time) {
											ActivityMonitorService.markActivity(req.user, 4, '', function() {
												Cases.update({ref_no: ref_no}, indi_case).exec(function afterwards(err, updated){
											})

											  if (err) {
											    // handle error here- e.g. `res.serverError(err);`
											    return;
											  }

											  //console.log(updated);
											});
										};
									}
							})

						});

				} else {
					// Witness equal to undefined.
					//Cases that with no witness.
					Cases.find({ref_no: ref_no})
							.exec(function (err, record) {
								
								if (record.length == 0) {
									  
									ActivityMonitorService.markActivity(req.user, 3, '', function() {
										Cases.create(indi_case).exec(function createCB(err, created){
										  // console.log(err);
										  // console.log(created);
										});
									})
									
								} else {
									// update record here.
									// Firstly check if the fileds "Date/Status" and "Time" have been changed.
									
										if (CommonService.compareExcelSqlDate(indi_case.interview_date, record[0].interview_date) || indi_case.interview_time != record[0].interview_time) {
											ActivityMonitorService.markActivity(req.user, 4, '', function() {
												Cases.update({ref_no: ref_no}, indi_case).exec(function afterwards(err, updated){
											})

											  if (err) {
											    // handle error here- e.g. `res.serverError(err);`
											    return;
											  }

											  //console.log(updated);
											});
										};
								}
						})

				}
					

				} else {

					// Inactive cases. status = 1.
					indi_case['status'] = 1;
					//console.log(cases['Date/Status'])

					if (typeof cases['Date/Status'] != 'undefined') {
						indi_case['remark'] = cases['Date/Status'];
					}

					if (typeof cases['Name in English'] != 'undefined') {
						indi_case['english_name'] = cases['Name in English'];
						//console.log(english_name);
					} else {
						console.log("The record have problem! No English Name")
					}

					if (typeof cases['Case Ref. No.'] != 'undefined') {
						var ref_no = cases['Case Ref. No.'];
						indi_case['ref_no'] = cases['Case Ref. No.'];
						//console.log(ref_no);
					} else {
						console.log("The record have problem! No Case Ref. No.")
					}

					if (typeof cases['Date of Enrollment'] != 'undefined') {
						indi_case['enrollment_date'] = CommonService.changeExcelDate(cases['Date of Enrollment']);
						//console.log(indi_case['enrollment_date']);
					}

					if (typeof cases['Service Recipient No.'] != 'undefined') {
						indi_case['sr_no'] = cases['Service Recipient No.'];
						// console.log(sr_no);
					}

					Cases.find({ref_no: ref_no})
								.exec(function (err, record) {
									
									if (record.length == 0) {

										ActivityMonitorService.markActivity(req.user, 3, '', function() {
											Cases.create(indi_case).exec(function createCB(err, created){
											  // console.log(err);
											  // console.log(created);
											});
										})
										
									} else {
										// update record here.
										//console.log("The record for ref_no = " + record[0].ref_no + " already exist.");
									}
							})

				}

			})

		fs.unlink(files[0].fd);

		return res.redirect('cases/import_message');

		});
	},
	import_data: function(req, res) {
		//console.log(process.cwd());
		PermissionService.checkUserPermissions(req.user, 2, function() {
			ActivityMonitorService.markActivity(req.user, 2, 'case upload', function() {
				return res.view('cases/cases_data_import');
			});
		});
	},
	import_message: function(req, res) {
		return res.view('cases/import_message');
	}
	
};

