<?php

namespace App\Http\Controllers;
use App\Testbooking;
use App\Patient;
use App\Report;
use App\Invoice;
use App\PatientLadger;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

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

    $getInvoices = DB::table('invoices')
        ->leftJoin('patient_ladgers', 'patient_ladgers.invoice_id', '=', 'invoices.id')
        ->where('patient_ladgers.patient_id', $idForTestbooking)
        ->select('invoices.id as invoices_id','invoices.balance as invoices_balance','invoices.remark as invoices_remark','invoices.particular as invoices_particular','invoices.*', 'patient_ladgers.*')
        ->get();
        if(sizeof($getInvoices) > 0){
            $id = $getInvoices[sizeof($getInvoices)-1];
            // var_dump($id);
            if($id->balance){
                $updatebalance = $id->balance + $amount;
                $updateInvoice_balance = $amount;
                $invoice_Particular = "INV-UPDATED-AMT";
                $cash = 0;
                $total = $amount;
                $invoice_remark = "dr";
                $remark = "dr";
                $dr = $amount;
                $cr = 0;
                $checkData = 1;
            }
        }
        else{
            return"no more";
        }

    if($checkData == 1){

        $InvoiceId = Invoice::create([
            "testbooking_id" => $testbooking_id,
            "particular" => $invoice_Particular,
            "cash" => $cash,
            "balance" => $amount,
            "discount_amount" => 0,
            "discount_percentage" => 0,
            "remark" => $invoice_remark,
            'total' => $total
        ]);
    }
    else{
        return error()->Json([
            'status'=>"There is error in server"
        ]);
    }

    
    PatientLadger::create([
        "patient_id" => $idForTestbooking,
        "particular" => "PL-UPDATED-AMT",
        "invoice_id" => $InvoiceId->id,
        "dr" => $dr,
        "cr" => $cr,
        "balance" => $updatebalance,
        "remark" => $remark
    ]);

    //setTestBooking();



    return response()->json([
        "patientId"=>$patient->reg_no
    ]);
  }
  
}
