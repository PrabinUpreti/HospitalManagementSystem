<?php

namespace App\Http\Controllers;
use App\Dashboard;
use App\Patient;
use App\DoctorList;
use App\Department;
use App\TestType;
use App\Test;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function getpatient(){
        $currentDate = date("Y-m-d");
        $countpatient = Patient::count();
        $countDoctor = DoctorList::count();
        $countTodayPatient = Patient::whereDate('created_at', $currentDate)->count();
        $countDepartment = Department::count();
        $countTest = Test::count();
        $countTestType = TestType::count();
        // print_r($countTestType);
        return response()->Json([
            'totalPatient'=>$countpatient,
            'totalDoctor'=>$countDoctor,
            'totalTodayPatient'=>$countTodayPatient,
            'totalDepartment'=>$countDepartment,
            'totalTest'=>$countTest,
            'totalTestType'=>$countTestType,            
        ]);
    }
}
