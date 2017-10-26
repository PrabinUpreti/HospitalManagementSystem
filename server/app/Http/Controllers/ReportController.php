<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Report;
use App\Patient;
use App\Test;
use DB;
use App\Testbooking;
use App\Department;
class ReportController extends Controller
{
       public function postReportData(Request $request){   
                      $answers = $request->input('reports');
                      for($i=0; $i < count($answers); $i++){
                         $Report_update=DB::table('reports')
                            ->where('id',$answers[$i]['id'])
                            ->update(['result'=>$answers[$i]['result']]); 
                       }
                       return response()->Json([
                           'status'=>'Report Submitted Successfully !'
                       ]);
                  }
    public function ReportData(){
        $datas =patient::join('testbookings','patients.id','=','testbookings.patient_id')
                        ->join('reports','testbookings.id', '=', 'reports.testbooking_id')
                        ->orderBy('testbooking_id', 'asc')
                        ->get();
                          return response()->json(['datas'=>$datas]);    
     }

 public function getReportData($id){
        $datas =patient::join('testbookings','patients.id','=','testbookings.patient_id')
                          ->join('reports','testbookings.id', '=', 'reports.testbooking_id')
                          ->join('tests','reports.test_id','=','tests.id')
                          ->join('test_details','tests.id','=','test_details.test_id')
                          ->join('test_types','test_types.id','=','tests.test_type_id') 
                          ->join('departments','departments.id','=','test_types.department_id')
                          ->join('doctor_lists','doctor_lists.id','=','testbookings.doctor_list_id')
                          ->orderBy('reports.testbooking_id', 'asc')
                          ->where('testbooking_id', $id)
                          ->select('patients.*','patients.id as patients_id','patients.gender as patient_gender','departments.name as department_name','test_types.name as test_type_name','reports.id as report_id','reports.*','reports.id as reports_id','test_details.*','tests.name as test_name','doctor_lists.name as doctor_name')
                          ->get();
                          return response()->json(['datas'=>$datas]);
    }
}