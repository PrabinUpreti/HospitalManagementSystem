<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TestDetail;
use App\Test;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TestDetailController extends Controller
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
            $testid = $request->input('selectedTest');
            $age_group = $request->input('age');
            $gender = $request->input('gender');
            $lbound = $request->input('lbound');
            $ubound = $request->input('ubound');
            $unit = $request->input('unit');
            $rate = $request->input('rate');
               $testDetails = TestDetail::create([
                    'test_id' => $testid,
                    'age_group'=>$age_group,
                    'gender'=>$gender,
                    'lower_bound'=>$lbound,
                    'upper_bound'=>$ubound,
                    'rate'=>$rate,
                    'unit'=>$unit,
                 ]);
                 return $testDetails;
         }
     
         /**
          * Display the specified resource.
          *
          * @param  int  $id
          * @return \Illuminate\Http\Response
          */
         public function show($id)
         {
            $gettestDetails = Test::find($id)->TestDetail;
            return $gettestDetails;
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
             
            $testid = $request->input('selectedTest');
            $age_group = $request->input('age');
            $gender = $request->input('gender');
            $lbound = $request->input('lbound');
            $ubound = $request->input('ubound');
            $unit = $request->input('unit');
            $rate = $request->input('rate');
            DB::table('test_details')
                ->where('id','=', $id)
                ->update([
                    'test_id' => $testid,
                    'lower_bound'=>$lbound,
                    'upper_bound'=>$ubound,
                    'rate'=>$rate,
                    'unit'=>$unit,
                ]);
            return response()->Json(array([
                'age'=>$age_group,
                'gender'=>$gender,
                'lbound'=>$lbound,
                'ubound'=>$ubound,
                'unit'=>$unit,
                'rate'=>$rate,
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
             return DB::table('test_details')
                    ->where('id','=',$id)
                    ->delete();
         }
}
