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
        $updatedatas = DB::table('doctor_lists')
        ->where('id','=', $id)
        ->update([
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
        return response()->Json(array([
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
        ]));
     }
 
     /**
      * Remove the specified resource from storage.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function destroy($id)
     {
        return  DB::table('doctor_lists')
        ->where('id','=', $id)
        ->delete();
     }

     public function getDoctorReportDatas(Request $request){
        $doctorId = $request->input('doctorId');
        $endDate = $request->input('endDate');
        $startDate = $request->input('startDate');
        // return var_dump($startDate);
        // $starttime = DateTime::createFromFormat("YYYY-MM-DD", $startDate);
        // $endtime = DateTime::createFromFormat("YYYY-MM-DD", $endDate);
        // $setStartDate = $starttime->getTimestamp();
        // $setEndDate = $endtime->getTimestamp();
        // $setStartDate = Carbon::createFromFormat('Y-m-d', $startDate)->timestamp;
        // $setEndDate = Carbon::createFromFormat("Y-m-d", $endDate)->timestamp;


        $result = DB::table('invoices')
        ->leftJoin('testbookings', 'testbookings.id', '=', 'invoices.testbooking_id')
        ->leftJoin('patient_ladgers', 'patient_ladgers.invoice_id','=','invoices.id')
        ->leftJoin('doctor_lists', 'doctor_lists.id','=', 'testbookings.doctor_list_id')
        ->leftJoin('patients','patients.id','invoices.patient_id')
        ->whereBetween('invoices.created_at', [$startDate, $endDate])
        ->where('testbookings.doctor_list_id', '=', $doctorId)
        ->select('patient_ladgers.*','doctor_lists.*','invoices.testbooking_id','patients.patient_name')
        ->get();
         return $result;
     }
}
