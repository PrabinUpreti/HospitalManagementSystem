<?php

namespace App\Http\Controllers;
use App\Testbooking;
use Illuminate\Http\Request;

class TestbookingController extends Controller
{
    public function postTestBookingData(Request $request){
    	$record = $request -> all();
            $patientid = $record['patientId'];
            $patient_name = $record['patient_name'];
            $patient_address = $record['patient_address'];
            $age = $record['age'];
            $gender = $record['gender'];
            $year = $record['year'];
            $month = $record['month'];
            $day = $record['day'];
            $marital_status = $record['marital_status'];
            $phone = $record['phone'];
            $email = $record['email'];
            $identity_card = $record['identity_card'];
            $reff_by = $record['reff_by'];

        Testbooking::create([
               "patientid" => $patientid,
               "patient_name" => $patient_name,
               "patient_address" => $patient_address,
               "age" => $age,
               "gender" => $gender,
               "year" => $year,
               "month" => $month,
               "day" => $day,
               "marital_status" => $marital_status,
               "phone" => $phone,
               "email" => $email,
               "identity_card" => $identity_card,
               "reff_by" => $reff_by
            ]);


    	return response()->json([
    			"status"=>"Successfully Stored"
    		]);
  }
}
