<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ViewTransaction extends Controller
{
    //

    public function getpatient(){
        $patient = DB::table('patients')->orderBy('created_at','desc')->take(10)->get();
        return $patient;
    }

    public function getpatientFromDate(Request $request){
        // $date = $request->all();
        
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        // return var_dump($endDate);

        $patient = DB::table('patients')
        ->whereBetween('patients.created_at', [$startDate, $endDate])
        // ->where('testbookings.doctor_list_id', '=', $doctorId)
        // ->select('patients.*')
        ->orderBy('created_at','desc')
        ->get();
        return $patient;
}

    public function getpatientInvoices($id){
        $invoices = DB::table('patient_ladgers')
        ->join('invoices','invoices.id', '=', 'patient_ladgers.invoice_id')
        ->where('patient_ladgers.patient_id', '=', $id)
        // ->select('invoices.id as invoices_id', 'invoices.remark as invoices_remark','invoices.particular as invoices_particular','invoices.balance as invoices_balance')
        ->select('invoices.*')   
        ->groupBy('invoices.id','invoices.testbooking_id','invoices.particular','invoices.cash','invoices.balance','invoices.discount_amount','invoices.discount_percentage','invoices.backed_money','invoices.remark','invoices.created_by','invoices.updated_by','invoices.created_at','invoices.updated_at')     
        ->orderBy('created_at','desc')
        ->get();
        return $invoices;
    }

    public function getpatientInvoiceledgers($id){
        return DB::table('patient_ladgers')
                ->where('invoice_id', '=', $id)
                ->orderBy('created_at','desc')
                ->get();
    }
    public function getpatientInvoiceAllledgers($id){
        return DB::table('patient_ladgers')
                ->where('patient_id', '=', $id)
                ->orderBy('created_at','desc')
                ->get();
    }
    public function searchpatientByName($id){
        return DB::table('patients')
        // ->where('reg_no', $id)
        ->where('patient_name','like', '%'.$id.'%')
        ->select('patients.*')
        ->get();
    }
}
