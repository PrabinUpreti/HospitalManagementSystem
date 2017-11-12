<?php

namespace App\Http\Controllers;
use App\Testbooking;
use App\Patient;
use App\Report;
use App\Invoice;
use App\PatientLadger;
use App\EasyAccess;

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
            $testDetails = $record['testDetails'];
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

            foreach($testDetails as $testDetail){
                $json  = $testDetail;
                $jsons  =  json_encode($json);
                $json = json_decode($jsons, true);
                EasyAccess::create([
                    "testbooking_id" => $testbooking_id,
                    "patient_id" => $idForTestbooking,
                    "test_id" => $json['test_id'],
                    "age_group" => $json['age_group'],
                    "gender" => $json['gender'],
                    "lbound" => $json['lower_bound'],
                    "ubound" => $json['upper_bound'],
                    "rate" => $json['rate'],
                    "unit" => $json['unit'],
                ]);
            }



            $InvoiceId = Invoice::create([
                "testbooking_id" => $testbooking_id,
                "patient_id" => $idForTestbooking,
                "particular" => "INV-TEST-BOOKED_AMT",
                "cash" => 0,
                "balance" => $amount,
                "discount_amount" => 0,
                "discount_percentage" => 0,
                'returned_cash' => 0,
                'sub_total' =>$amount,
                'total_balance' => $amount,
                'print'=>0,
                "remark" => 'dr'
            ]);

            
            PatientLadger::create([
                "patient_id" => $idForTestbooking,
                "particular" => "PL-TEST-BOOKED_AMT",
                "invoice_id" => $InvoiceId->id,
                "dr" => $amount,
                "cr" => 0,
                'discount_amt'=>0,
                'discount_per'=>0,
                'returned_cash'=>0,
                "balance" => $amount,
                "remark" => 'dr',
                'print'=>0,
            ]);

            //setTestBooking();
        


    	return response()->json([
    			"patientId"=>$patient->reg_no
    		]);
    }

  public function putTestBookingData(Request $request, $id){
    $checkData;


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
    $testDetails = $record['testDetails'];
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
    // $jsons = json_decode($testDetails);
    foreach($testDetails as $testDetail){
        $json  = $testDetail;
        $jsons  =  json_encode($json);
        $json = json_decode($jsons, true);
        EasyAccess::create([
            "testbooking_id" => $testbooking_id,
            "patient_id" => $idForTestbooking,
            "test_id" => $json['test_id'],
            "age_group" => $json['age_group'],
            "gender" => $json['gender'],
            "lbound" => $json['lower_bound'],
            "ubound" => $json['upper_bound'],
            "rate" => $json['rate'],
            "unit" => $json['unit'],
        ]);
    }

    $getInvoices = DB::table('invoices')
        ->leftJoin('patient_ladgers', 'patient_ladgers.invoice_id', '=', 'invoices.id')
        ->where('patient_ladgers.patient_id', $idForTestbooking)
        ->select('invoices.id as invoices_id','invoices.balance as invoices_balance','invoices.remark as invoices_remark','invoices.particular as invoices_particular','invoices.*', 'patient_ladgers.*')
        ->get();
        if(sizeof($getInvoices) >= 1){
            $id = $getInvoices[sizeof($getInvoices)-1];
            // var_dump($id);
            if($id->balance > 0 && $id->remark =="dr"){
                $updatebalance = $id->balance + $amount;
                $updateInvoice_balance = $amount;
                $invoice_Particular = "INV-TEST-BOOKED_AMT";
                $cash = 0;
                $total = $amount;
                $invoice_remark = "dr";
                $remark = "dr";
                $dr = $amount;
                $cr = 0;
                $checkData = 1;
            }
            else if($id->balance > 0 && $id->remark =="cr"){
                $testUpdateBalance = $amount - $id->balance;
                if($testUpdateBalance < 0){
                    $updatebalance = -($testUpdateBalance);
                    $invoice_remark = "cr";
                    $remark = "cr";
                }
                else if($testUpdateBalance > 0){
                    $updatebalance = ($testUpdateBalance);
                    $invoice_remark = "dr";
                    $remark = "dr";
                }
                else{
                    $updatebalance = ($testUpdateBalance);
                    $invoice_remark = null;
                    $remark = null;
                }
                $updateInvoice_balance = $amount;
                $invoice_Particular = "INV-TEST-BOOKED_AMT";
                $cash = 0;
                $total = $amount;
                $dr = $amount;
                $cr = 0;
                $checkData = 1;
            }
            else{
                $updatebalance = $id->balance + $amount;
                $updateInvoice_balance = $amount;
                $invoice_Particular = "INV-TEST-BOOKED_AMT";
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
            "patient_id" => $idForTestbooking,
            "particular" => $invoice_Particular,
            "cash" => $cash,
            "balance" => $amount,
            "discount_amount" => 0,
            "discount_percentage" => 0,
            'returned_cash' => 0,
            'sub_total' =>$dr,
            'total_balance' => $updatebalance,
            'print'=>0,
            "remark" => $invoice_remark,
        ]);
    }
    else{
        return error()->Json([
            'status'=>"There is error in server"
        ]);
    }

    
    PatientLadger::create([
        "patient_id" => $idForTestbooking,
        "particular" => "PL-TEST-BOOKED_AMT",
        "invoice_id" => $InvoiceId->id,
        "dr" => $dr,
        "cr" => $cr,
        'discount_amt'=>0,
        'discount_per'=>0,
        'returned_cash'=>0,
        "balance" => $updatebalance,
        "remark" => $remark,
        'print'=>0,
    ]);

    //setTestBooking();



    return response()->json([
        "patientId"=>$patient->reg_no
    ]);
  }
  
}
