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
            //  echo("hello i am in server");
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
}
