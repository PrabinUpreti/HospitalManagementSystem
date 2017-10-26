<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
      return $request->user();
});


// Route::post("connect",function (Request $request){

//     $http = new GuzzleHttp\Client;

//     $response = $http->post('http://server.hms.com/oauth/token', [
//         'form_params' => [
//             'grant_type' => 'password',
//             'client_id' => '2',
//             'client_secret' => '9WByWgBC5vgv1PBrftcQ7DWeGd7CV6UqcV9xMqA0',
//             'username'=>$request->input("email"),
//             'password'=>$request->input("password"),
//             //'redirect_uri' => 'http://example.com/callback',
//             //'code' => $request->code,
//         ],
//     ]);


//     return ["access_token"=>json_decode((string) $response->getBody(), true)['access_token'] ];

// });


// Route::post('/test','ClientController@postdata');

Route::post('/test-booking','TestbookingController@postTestBookingData');
Route::put('/test-booking/{id}','TestbookingController@putTestBookingData');
//Report 

Route::post('/reports','ReportController@postReportData');
Route::get('/reportdata','ReportController@ReportData');
Route::get('/report/{id}','ReportController@getReportData');

//Transaction

Route::get('/bill/{id}','TransactionController@getBillData');

//modify

Route::resource('/modify','DepartmentController');
Route::resource('/testtype','TestTypeController');
Route::resource('/test','TestController');
Route::resource('/testdetails','TestDetailController');
Route::resource('/doctor','DoctorListController');
Route::resource('/commoncodes','CommonCodeController');
Route::resource('/transaction','TransactionController');
Route::get('/transactions/{id}','TransactionController@getDetialsOfPatient');
Route::resource('/getPatientData','PatientController');


Route::post('/getDoctorReportDatas','DoctorListController@getDoctorReportDatas');

//DASHBOARD

Route::get('/dashboard', 'DashboardController@getpatient');

//VIEW-TRANSACTION

Route::get('/view-transaction', 'ViewTransaction@getpatient');
Route::get('/view-transaction/{id}', 'ViewTransaction@getpatientInvoicesAndledger');
Route::get('/transactionstestbooking/{id}','TransactionController@getDetialsOfTestbooking');

//TEST_BOOKING

Route::get('/testbooking-transaction/{id}','TestbookingTransactionController@getPatientTestbookingTest');
Route::post('/postinvoice', 'TestbookingTransactionController@postInvoice');

// Route::post('/modify','DepartmentController@postDepartment');
// Route::get('/modify','DepartmentController@getDepartment');

//User

Route::get('/menu','MenuController@Menucontroller');
Route::get('/user','UserContoller@userdata');
Route::post('/adduser','UserContoller@Adduserdata');
Route::post('/edituser/{id}','UserContoller@EditUser');
Route::post('/deleteuser/{id}','UserContoller@DeleteUser');
Route::post('/access_menu','Access_menu_Controller@Access_Menu');
Route::get('/menubar/{id}','Access_menu_Controller@Menubar');

