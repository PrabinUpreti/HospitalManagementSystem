<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Test;
use App\TestType;

class TestController extends Controller
{
    
        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
         public function index()
         {
            // $gettest = DB::table('tests')->get();
            // return $gettest;
            // $gettest = Test::orderBy("created_at" , "desc")->get();
            // return $gettest;
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
            $testTypeIdInInt = $request->input('selecttesttype');
            $testName = $request->input('TestName');
            $testDescription = $request->input('TestDescription');
               $test = Test::create([
                    'test_type_id' => $testTypeIdInInt,
                    'name'=>$testName,
                    'description'=>$testDescription,
                 ]);
                 return $test;
         }
     
         /**
          * Display the specified resource.
          *
          * @param  int  $id
          * @return \Illuminate\Http\Response
          */
         public function show($id)
         {
             $gettest = TestType::find($id)->Test;
             return $gettest;
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
            $name =   $request->input('TestName');
            $description =   $request->input('TestDescription');
            Test::where('id',$id)->update(array(
               'name' =>  $name,
               'description' =>  $description
               ));
           return response()->json([
               'name' => $name,
               'description' => $description
           ]);
         }
     
         /**
          * Remove the specified resource from storage.
          *
          * @param  int  $id
          * @return \Illuminate\Http\Response
          */
         public function destroy($id)
         {
            Test::find($id)->delete();
            return($id);
         }
    
}
