<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TestType;
use App\Department;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TestTypeController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index()
     {
         //
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
        $departmentIdInInt = $request->input('selectdepartment');
        $testTypeName = $request->input('TestTypeName');
        $testTypeDescription = $request->input('TestTypeDescription');
           $testType = TestType::create([
                'department_id' => $departmentIdInInt,
                'name'=>$testTypeName,
                'description'=>$testTypeDescription,
             ]);
             return $testType;
     }
 
     /**
      * Display the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function show($id)
     {
        $gettesttype = Department::find($id)->TestType;
        return $gettesttype;
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
        $name =   $request->input('TestTypeName');
        $description =   $request->input('TestTypeDescription');
        TestType::where('id',$id)->update(array(
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
        return DB::table('test_types')
        ->where('id','=', $id)
        ->delete();
     }

}
