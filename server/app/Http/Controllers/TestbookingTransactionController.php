<?php

namespace App\Http\Controllers;

use App\Invoice;
use App\PatientLadger;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TestbookingTransactionController extends Controller
{
    //

    public function getPatientTestbookingTest($id){
        $patientId = DB::table('patients')
        ->where('reg_no', $id)
        ->select('patients.id')
        ->first()->id;

        $testLastData =DB::table('invoices')
        ->leftJoin('patient_ladgers', 'patient_ladgers.invoice_id', '=', 'invoices.id')
        ->leftJoin('patients', 'patients.id', '=', 'patient_ladgers.patient_id')
        ->where('patient_ladgers.patient_id', $patientId)
        ->select('invoices.id as invoices_id','invoices.balance as invoices_balance','invoices.remark as invoices_remark','invoices.particular as invoices_particular','invoices.*', 'patient_ladgers.*', 'patients.*')
        ->get();
        return $testLastData;
    }

    public function postInvoice(Request $request){
        
        $testbooking = $request->input('TestBookingId');
        // $invoiceParticular = $request->input('');
        $cash = $request->input('cash');
        $invoiceBalance = $request->input('InvoiceAmount');
        $discountAmount = $request->input('DiscountAmount');
        $discountPer = $request->input('DiscountPer');
        $invoiceremark = $request->input('invoiceRemark');
        $patientId = $request->input('patientId');
        $dR = 0;
        $cR = $request->input('cash');
        $balance = $request->input('pl_balance');
        $remark = $request->input('invoiceRemark');
        $invParticuler = $request->input('inv_particular');
        $plParticuler = $request->input('pl_particular');
        $BackedMoney = $request->input('MoneyBack');
        $storedInInvoice = $request->input('updateInvoiceId');
        $print = $request->input('print');
        // return $BackedMoney;
        if($discountPer >0){
            $DiscountPer = $discountPer;
        }
        else{
            $DiscountPer = 0;
        }
        if($discountAmount>0){
            $DiscountAmount = $discountAmount;
        }
        else{
            $DiscountAmount = 0;
        }
        
        DB::table('invoices')
            ->where('id', '=', $storedInInvoice)
            ->update([
            // 'testbooking_id'=>$testbooking,
            'particular'=>$invParticuler,
            'cash'=>$cash,
            'balance'=>$invoiceBalance,
            'discount_amount'=>$DiscountAmount,
            'discount_percentage'=>$DiscountPer,
            'remark'=>$invoiceremark,
            // 'total'=>$total,
        ]);

        // $invoiceId = $storedInInvoice->id;

        $storedInPatientLadger = PatientLadger::create([
            'patient_id'=>$patientId,
            'invoice_id'=>$storedInInvoice,
            'particular'=>$plParticuler,
            'dr'=>$dR,
            'cr'=>$cR,
            'backed_money'=>$BackedMoney,
            'balance'=>$balance,
            'remark'=>$remark,
            'print'=>$print,
        ]);

        return response()->Json([
            'status'=>"Successufally Stored"
        ]);
    }
    public function InvoiceDetial($id){
        // $invoice=Invoice::join('invoices','testbookings.id','=','invoices.testbooking_id')
        //                   ->where('testbooking_id',$id)
        //                   ->orderBy('created_at', 'desc')
        //                   ->get();
        //   return $invoice;
        // $invoiceId = DB::table('patient_ladgers')->latest();
        // return $invoiceId;
        $invoice=DB::table('patient_ladgers')
                ->leftJoin('invoices', 'invoices.id', '=', 'patient_ladgers.invoice_id' )
                ->where('patient_ladgers.patient_id', $id )
                ->select("invoices.*")
                ->orderBy('created_at','desc')
                ->get();
                return $invoice;
              }
}
