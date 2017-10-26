<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DoctorList;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Carbon\Carbon;

class DoctorListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index()
     {
        // $getDoctorList = DB::table('doctor_lists')->get();
        // return $getDoctorList;
        $getDoctorList = DoctorList::orderBy("created_at" , "desc")->get();
        return $getDoctorList;
     }
 
     /**
      * Show the form for creating a new resource.
      *
      * @return \Illuminate\Http\Response
      */
     public function create()
     {
        //
     }
 
     /**
      * Store a newly created resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @return \Illuminate\Http\Response
      */
     public function store(Request $request)
     {         
        $name = $request->input('doctor_name');
        $address = $request->input('doctor_address');
        $nationality = $request->input('identity_card');
        $gender = $request->input('gender');
        $marital_status = $request->input('marital_status');
        $month = $request->input('month');
        $day = $request->input('day');
        $year = $request->input('year');
        $phone = $request->input('phone');
        $email = $request->input('email');
        $prefix = $request->input('prefix');
        $commission = $request->input('commission');
           $doctor = DoctorList::create([
                'name' => $name,
                'address'=>$address,
                'phone'=>$phone,
                'registration_no'=>$nationality,
                'gender'=>$gender,
                'day'=>$day,
                'month'=>$month,
                'year'=>$year,
                'prefix'=>$prefix,
                'commission'=>$commission,
                'email'=>$email,
                'department'=>$marital_status,
             ]);
             return $doctor;
     }
 
     /**
      * Display the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function show($id)
     {
         //
     }
 
     /**
      * Show the form for editing the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function edit($id)
     {
         //
     }
 
     /**
      * Update the specified resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function update(Request $request, $id)
     {
    //     $name =   $request->input('TestName');
    //     $description =   $request->input('TestDescription');
    //     Test::where('id',$id)->update(array(
    //        'name' =>  $name,
    //        'description' =>  $description
    //        ));
    //    return response()->json([
    //        'name' => $name,
    //        'description' => $description
    //    ]);
     }
 
     /**
      * Remove the specified resource from storage.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function destroy($id)
     {
        // Test::find($id)->delete();
        // return($id);
     }

     public function getDoctorReportDatas(Request $request){
        $doctorId = $request->input('doctorId');
        $endDate = $request->input('endDate');
        $startDate = $request->input('startDate');
        // $starttime = DateTime::createFromFormat("YYYY-MM-DD", $startDate);
        // $endtime = DateTime::createFromFormat("YYYY-MM-DD", $endDate);
        // $setStartDate = $starttime->getTimestamp();
        // $setEndDate = $endtime->getTimestamp();
        $setStartDate = Carbon::createFromFormat('Y-m-d', $startDate)->timestamp;
        $setEndDate = Carbon::createFromFormat("Y-m-d", $endDate)->timestamp;


        $result = DB::table('invoices')
        ->leftJoin('testbookings', 'testbookings.id', '=', 'invoices.testbooking_id')
        ->whereBetween('invoices.created_at', [$startDate, $endDate])
        ->where('testbookings.doctor_list_id', '=', $doctorId)
        ->select('invoices.*')
        ->get();
         return $result;
     }
}
