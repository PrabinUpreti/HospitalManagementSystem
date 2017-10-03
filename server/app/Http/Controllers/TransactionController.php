<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Patient;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TransactionController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index(){
        // $getdepartment = Department::orderBy("created_at" , "desc")->get();
        // return $getdepartment;
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function create(){
        // 
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request){
            // $departmentName = $request->input('DepartmentName');
            // $departmentDescription = $request->input('DepartmentDescription');
            
            //    $department = Department::create([
            //         'name'=>$departmentName,
            //         'description'=>$departmentDescription,
            //      ]);    
            //      return $department;
    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function show($id){

        $dataFromPatient = DB::table('patients')
        ->join('testbookings', 'patients.id', '=', 'testbookings.patient_id')
        ->join('reports', 'testbookings.id', '=', 'reports.testbooking_id')
        ->join('test_details', 'reports.test_id', '=', 'test_details.test_id')
        ->select( 'testbookings.id as testbook_id', 'test_details.gender as genderdetails','reports.id as reports_id','test_details.id as test_details_id','testbookings.*','reports.*','test_details.*', 'patients.*')->where('reg_no', $id)
        ->get();
        return $dataFromPatient;
    }

    /**
    * Show the form for editing the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function edit($id){
        //
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, $id){
        // $name =   $request->input('DepartmentName');
        // $description =   $request->input('DepartmentDescription');
        // Department::where('id',$id)->update(array(
        //     'name' =>  $name,
        //     'description' =>  $description
        //     ));
        // return response()->json([
        //     'name' => $name,
        //     'description' => $description
        // ]);

    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function destroy($id){
        // Department::find($id)->delete();
        // return($id);
    }

}
