/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //'/login': 'UsersController.login',
  
  // '/': {
  //   view: 'homepage'
  // },
  
  'get /login': 'AuthController.login_view',

  'post /login': 'AuthController.login',

  '/logout': 'AuthController.logout',

  '/': 'ReferralController.view',

  '/referral/add': 'ReferralController.add',

  'GET /user': 'UserController.profile',

  'GET /status': 'UserstatusController.homepage',

  'GET /calendar': 'CalendarController.mainpage',

  'GET /events_data': 'CalendarController.events_data',

  'POST /add_wpi': 'CalendarController.add_wpi_booking',

  'GET /output_doc': 'CalendarController.output_doc',

  'GET /message': 'CalendarController.cal_message',

  'GET /add_booking': 'CalendarController.add_booking',

  'POST /10a-chi': 'FormController.tenachi',

  'POST /o2a-chi': 'FormController.otwoachi',

  'POST /4-eng': 'FormController.foureng',

  'GET /initial_message': 'FormController.initial_message',

  'GET /cases/search': 'CasesController.search',

  'POST /cases/search_api': 'CasesController.search_api',

  'POST /cases/print': 'CasesController.cases_print',

  'POST /cases/import_data_api': 'CasesController.import_data_api',

  'GET /cases/import_data': 'CasesController.import_data',

  'GET /cases/import_message': 'CasesController.import_message',

  'GET /testing': 'ImportPublicHolidayController.parseCal'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
