<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ViewTransaction extends Controller
{
    //

    public function getpatient(){
        $patient = DB::table('patients')->orderBy('created_at','desc')->get();
        return $patient;
    }

    public function getpatientInvoicesAndledger($id){
        $invoicesAndLedger = DB::table('patient_ladgers')
        ->leftJoin('invoices','invoices.id', '=', 'patient_ladgers.invoice_id')
        ->where('patient_ladgers.patient_id', '=', $id)
        // ->orderBy('created_at', 'desc')
        ->get();
        return $invoicesAndLedger;
    }
}
