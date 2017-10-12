<?php

namespace App\Http\Controllers;
use App\Testbooking;
use App\Patient;
use App\Report;
use App\Invoice;
use App\PatientLadger;

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
            $testId = $record['testID'];
            $amount = $record['invoice'];

        $patient = Patient::create([
               "reg_no" => $patientid,
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
               "identity_number" => $identity_card,
               "nationality" => $identity_card  
            ]);

            $idForTestbooking = $patient->id;
            $testbooking = Testbooking::create([
                "patient_id" => $idForTestbooking,
                "doctor_list_id" =>$reff_by,
            ]);
            
            $testbooking_id = $testbooking->id;
            foreach($testId as $testid){
                Report::create([
                    "testbooking_id" => $testbooking_id,
                    "test_id" => $testid
                ]);
            }
            $InvoiceId = Invoice::create([
                "testbooking_id" => $testbooking_id,
                "particular" => "INV-TEST-BOOKED_AMT",
                "cash" => 0,
                "balance" => $amount,
                "discount_amount" => 0,
                "discount_percentage" => 0,
                "remark" => 'dr'
            ]);

            
            PatientLadger::create([
                "patient_id" => $idForTestbooking,
                "particular" => "PL-TEST-BOOKED_AMT",
                "invoice_id" => $InvoiceId->id,
                "dr" => $amount,
                "cr" => 0,
                "balance" => $amount,
                "remark" => 'dr'
            ]);

            //setTestBooking();
        


    	return response()->json([
    			"patientId"=>$patient->reg_no
    		]);
    }

  public function putTestBookingData(Request $request, $id){
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
    $testId = $record['testID'];
    $amount = $record['invoice'];

    Patient::find($id)->update([
       "reg_no" => $patientid,
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
       "identity_number" => $identity_card,
       "nationality" => $identity_card
    ]);
    $patient = Patient::find($id);

    $idForTestbooking = $patient->id;
    $testbooking = Testbooking::create([
        "patient_id" => $idForTestbooking,
        "doctor_list_id" =>$reff_by,
    ]);
    
    $testbooking_id = $testbooking->id;
    foreach($testId as $testid){
        Report::create([
            "testbooking_id" => $testbooking_id,
            "test_id" => $testid
        ]);
    }

    
    $InvoiceId = Invoice::create([
        "testbooking_id" => $testbooking_id,
        "particular" => "INV-TEST-BOOKED_AMT",
        "cash" => 0,
        "balance" => $amount,
        "discount_amount" => 0,
        "discount_percentage" => 0,
        "remark" => 'dr'
    ]);

    
    PatientLadger::create([
        "patient_id" => $idForTestbooking,
        "particular" => "PL-TEST-BOOKED_AMT",
        "invoice_id" => $InvoiceId->id,
        "dr" => $amount,
        "cr" => 0,
        "balance" => $amount,
        "remark" => 'dr'
    ]);

    //setTestBooking();



    return response()->json([
        "patientId"=>$patient->reg_no
    ]);
  }
  
}
