<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ViewTransaction extends Controller
{
    //

    public function getpatient(){



        // return DB:: select('SELECT 
        // pt.`patient_name`, `balance`, `remark`
        // FROM
        // patient_ladgers b
        //     INNER JOIN
        // (SELECT 
        //     patient_id, MAX(id) as id
        // FROM
        //     patient_ladgers
        // GROUP BY patient_id) a on a.id = b.id
        // inner join `patients` pt on pt.id = a.patient_id'); 



        $patient = DB::table('patients')->orderBy('updated_at','desc')->take(10)->get();
        return $patient;
    }

    public function getpatientFromDate(Request $request){
        // $date = $request->all();
        
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        // // return var_dump($endDate);

        // $patient = DB::table('patients')
        // ->whereBetween('patients.updated_at', [$startDate, $endDate])
        // // ->where('testbookings.doctor_list_id', '=', $doctorId)
        // // ->select('patients.*')
        // ->orderBy('updated_at','desc')
        // ->get();
        // return $patient;

        return DB:: select('SELECT pt.id,pt.updated_at,pt.phone,pt.patient_address,
        pt.patient_name, balance, remark
        FROM
        patient_ladgers b
            INNER JOIN
        (SELECT 
            patient_id, MAX(id) as id
        FROM
            patient_ladgers
        GROUP BY patient_id) a on a.id = b.id
        inner join patients pt on pt.id = a.patient_id
        WHERE pt.updated_at BETWEEN \''.$startDate.'\' AND \''.$endDate.'\' 
        ORDER BY pt.updated_at DESC'        
        );

}
public function getInvoicesFromDate(Request $request){
    $startDate = $request->input('startDate');
    $endDate = $request->input('endDate');

    return $invoices = DB::table('invoices')
    ->leftJoin('patients','patients.id','=','invoices.patient_id')
    // ->leftJoin('invoices','invoices.id','=','patient_ladgers.invoice_id')
    ->orderBy('invoices.created_at','desc')
    ->whereBetween('invoices.created_at', [$startDate, $endDate])
    // ->groupBy('patient_ladgers.invoice_id')
    // ->select('invoices.balance as invBalance','invoices.cash','invoices.discount_amount','invoices.discount_percentage','invoices.particular','patient_ladgers.cr','patient_ladgers.remark','patient_ladgers.dr','patient_ladgers.backed_money','patient_ladgers.balance','patient_ladgers.invoice_id')
    ->select('invoices.*','patients.patient_name')
    ->get();
    return $patient;
}

    public function getpatientInvoices($id){
        $invoices = DB::table('patient_ladgers')
        ->join('invoices','invoices.id', '=', 'patient_ladgers.invoice_id')
        ->where('patient_ladgers.patient_id', '=', $id)
        // ->select('invoices.id as invoices_id', 'invoices.remark as invoices_remark','invoices.particular as invoices_particular','invoices.balance as invoices_balance')
        ->select('invoices.*')
        ->groupBy('invoices.id','invoices.patient_id','invoices.deleted_at','invoices.testbooking_id','invoices.particular','invoices.cash','invoices.balance','invoices.discount_amount','invoices.discount_percentage','invoices.remark','invoices.created_by','invoices.updated_by','invoices.created_at','invoices.updated_at','invoices.returned_cash','invoices.sub_total','invoices.total_balance','invoices.print','invoices.received_cash','narration')
        ->orderBy('updated_at','desc')
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
        // return DB::table('patients')
        // ->where('patient_name','like', '%'.$id.'%')
        // ->select('patients.*')
        // ->get();
        return DB::select('SELECT pt.id,pt.updated_at,pt.phone,pt.patient_address,
        pt.patient_name, balance, remark
    FROM
        patient_ladgers b
            INNER JOIN
        (SELECT 
            patient_id, MAX(id) AS id
        FROM
            patient_ladgers
        GROUP BY patient_id) a ON a.id = b.id
            INNER JOIN
        patients pt ON pt.id = a.patient_id
    WHERE
        pt.patient_name LIKE \'%'.$id.'%\'');
    }


    public function searchInvoicesByName($id){
        // return DB::table('patients')
        // ->where('patient_name','like', '%'.$id.'%')
        // ->select('patients.*')
        // ->get();


    return $invoices = DB::table('invoices')
    ->leftJoin('patients','patients.id','=','invoices.patient_id')
    // ->leftJoin('invoices','invoices.id','=','patient_ladgers.invoice_id')
    ->orderBy('invoices.created_at','desc')
    ->where('patients.patient_name','like', '%'.$id.'%')
    // ->whereBetween('invoices.created_at', [$startDate, $endDate])
    // ->groupBy('patient_ladgers.invoice_id')
    // ->select('invoices.balance as invBalance','invoices.cash','invoices.discount_amount','invoices.discount_percentage','invoices.particular','patient_ladgers.cr','patient_ladgers.remark','patient_ladgers.dr','patient_ladgers.backed_money','patient_ladgers.balance','patient_ladgers.invoice_id')
    ->select('invoices.*','patients.patient_name')
    ->get();
    }


    public function getAllInvoices(Request $request){
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        return $invoices = DB::table('invoices')
        ->leftJoin('patients','patients.id','=','invoices.patient_id')
        // ->leftJoin('invoices','invoices.id','=','patient_ladgers.invoice_id')
        ->orderBy('invoices.created_at','desc')
        ->whereBetween('invoices.created_at', [$startDate, $endDate])
        // ->groupBy('patient_ladgers.invoice_id')
        // ->select('invoices.balance as invBalance','invoices.cash','invoices.discount_amount','invoices.discount_percentage','invoices.particular','patient_ladgers.cr','patient_ladgers.remark','patient_ladgers.dr','patient_ladgers.backed_money','patient_ladgers.balance','patient_ladgers.invoice_id')
        ->select('invoices.*','patients.patient_name')
        ->get();
        // return response()->Json([
        //     'status'=>"Hello world",
        // ]);
    }

    public function updatePrint(Request $request){
        $testbookingId = $request->input('testBookingId');
        $print = $request->input('print');
        if($print){
            DB::table('invoices')
            ->where('testbooking_id',$testbookingId)
            ->update([
                'print'=>$print,
            ]);
        }
        return DB::table('easy_accesses')
        ->leftJoin('tests','tests.id','=','easy_accesses.test_id')
        ->leftJoin('patients','patients.id','=','easy_accesses.patient_id')
        ->where('easy_accesses.testbooking_id',$testbookingId)
        ->select('tests.name','easy_accesses.rate','patients.patient_name','patients.patient_address','patients.reg_no','patients.age','patients.gender','patients.marital_status','patients.nationality')
        ->get();
    }
}

//////////query By Sulav Sir//////////

// SELECT 
// pt.`patient_name`, `balance`, `remark`
// FROM
// patient_ladgers b
//     INNER JOIN
// (SELECT 
//     patient_id, MAX(id) as id
// FROM
//     patient_ladgers
// GROUP BY patient_id) a on a.id = b.id
// inner join `patients` pt on pt.id = a.patient_id;
