<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Patient;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PatientController extends Controller
{
    
        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
         public function index()
         {
             return DB::table('patients')->orderBy('created_at', 'desc')->take(15)->get();
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
            // $patientid = $request->input('selectedTest');
            // $age_group = $request->input('age');
            // $gender = $request->input('gender');
            // $lbound = $request->input('lbound');
            // $ubound = $request->input('ubound');
            // $unit = $request->input('unit');
            // $rate = $request->input('rate');
            //    $testDetails = Patient::create([
            //         'test_id' => $testid,
            //         'age_group'=>$age_group,
            //         'gender'=>$gender,
            //         'lower_bound'=>$lbound,
            //         'upper_bound'=>$ubound,
            //         'rate'=>$rate,
            //         'unit'=>$unit,
            //      ]);
            //      return $testDetails;
         }
     
         /**
          * Display the specified resource.
          *
          * @param  int  $id
          * @return \Illuminate\Http\Response
          */
         public function show($id)
         {
            $Patient = DB::table('patients')
            ->where('patient_name','like', '%'.$id.'%')
            ->get();
            return $Patient;
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
             //
         $name =   $request->input('name');
         $address =   $request->input('address');
         $nationality =   $request->input('nationality');
         $gender =   $request->input('gender');
         $age =   $request->input('age');
         $mrts =   $request->input('marital_status');
         $phone =   $request->input('phone');
         $email =   $request->input('email');
         $updatedBy = $request->input('updatedBy');
         $response = DB::table('patients')
         ->where('id','=',$id)
         ->update([
             'patient_name'=>$name,
             'patient_address'=>$address,
             'nationality'=>$nationality,
             'gender'=>$gender,
             'age'=>$age,
             'marital_status'=>$mrts,
             'phone'=>$phone,
             'email'=>$email,
             'updated_by'=>$updatedBy
         ]);
        return response()->Json(array([
            'patient_name'=>$name,
            'patient_address'=>$address,
            'nationality'=>$nationality,
            'gender'=>$gender,
            'age'=>$age,
            'marital_status'=>$mrts,
            'phone'=>$phone,
            'email'=>$email,            
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
             //
         }

         public function getpatientFromDate(Request $request){

            $startDate = $request->input('startDate');
            $endDate = $request->input('endDate');

            $patient = DB::table('patients')
            ->whereBetween('patients.created_at', [$startDate, $endDate])
            ->get();
            return $patient;
        }
}
