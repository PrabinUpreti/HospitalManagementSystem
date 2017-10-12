<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Patient;
use App\Invoice;
use App\PatientLadger;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TransactionController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index(){
        // $getdepartment = Department::orderBy("created_at" , "desc")->get();
        // return $getdepartment;
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function create(){
        // 
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request){
                
        $testBookingId = $request->input('');
        $invoiceParticular = $request->input('');
        $cash = $request->input('cash');
        $invoiceBalance = $request->input('');
        $discountAmount = $request->input('');
        $discountPer = $request->input('');
        $invoiceremark = $request->input('');
        $patientId = $request->input('');
        $dR = $request->input('');
        $cR = $request->input('');
        $balance = $request->input('');
        $remark = $request->input('');
        $particuler = $request->input('');

        $storedInInvoice = Invoice::create([
            'testbooking_id'=>$testBookingId,
            'particular'=>$invoiceParticular,
            'cash'=>$cash,
            'balance'=>$invoiceBalance,
            'discount_amount'=>$discountAmount,
            'discount_percentage'=>$discountPer,
            'remark'=>$invoiceremark
        ]);
        $invoiceId = $storedInInvoice->id;

        $storedInPatientLadger = PatientLadger::create([
            'patient_id'=>$patientId,
            'invoice_id'=>$invoiceId,
            'particular'=>$particuler,
            'dr'=>$dR,
            'cr'=>$cR,
            'balance'=>$balance,
            'remark'=>$remark,
        ]);


        if($storedInInvoice && $storedInPatientLadger){
            return response()->json([
                "status"=>'successfully stored'
            ]);
        }


        
    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function show($id){
        $patientId = DB::table('patients')
        ->where('reg_no', $id)
        ->orWhere('patient_name','like', '%'.$id.'%')
        ->select('patients.id')
        ->get();
        $id= $patientId[0]->id;
        echo(gettype($id));



            return Patient::select(DB::raw('select pt.*, tst.*, pled.*, inv.* from patients pt
            INNER join testbookings tst on tst.patient_id = pt.id
            left join (select MAX(id) id, patient_id from patient_ladgers where patient_ladgers.patient_id = 1) a on a.patient_id = pt.id
            left join patient_ladgers pled on pled.id = a.id
            left join invoices inv on inv.id = pled.invoice_id
            where pt.id = 1'))
            ->get();
            



            


        // select pt.*, tst.*, pled.*, inv.* from patients pt
        // INNER join testbookings tst on tst.patient_id = pt.id
        // left join (select MAX(id) id, patient_id from patient_ladgers where patient_ladgers.patient_id = 1) a on a.patient_id = pt.id
        // left join patient_ladgers pled on pled.id = a.id
        // left join invoices inv on inv.id = pled.invoice_id
        // where pt.id = 1


        
        
            $dataFromPatient = DB::table('patients AS pt')
            ->join('testbookings AS tst', 'pt.id', '=', 'tst.patient_id')
            ->leftJoin('patient_ladgers AS pled', function ($join){
                $join->max(function());
                $join->where('pled.patient_id', '=', 2);
            })
            // ->leftJoin('invoices', function ($Invoice){
            //     $Invoice->where('invoices.id', '=', $join'patient_ladger.invoice_id');
            // })
            // ->first()
            // ->get();
            
            // ->join('test_details', 'reports.test_id', '=', 'test_details.test_id')
            // ->select( 'testbookings.id as testbookings_id', 'test_details.gender as genderdetails','reports.id as reports_id','test_details.id as test_details_id','testbookings.*','reports.*','test_details.*', 'patients.*')->where('reg_no', $id)
            // ->where('reg_no', $id)
            // ->orWhere('patient_name','like', '%'.$id.'%')
            ->select('pt.*', 'tst.*', 'pled.*')
            // ->orderBy('patient_ladgers.created_at', 'desc')
            ->get();

            return $dataFromPatient;
        // }
        // else{
        //     return response()->json([
        //         'Test'=>"Nothing"
        //     ]);
        // }
            // $patientID = DB::table('patients')
            // ->where('reg_no', $id)
            // ->orWhere('patient_name','like', '%'.$id.'%')
            // ->select('patients.id')
            // ->get();
            
            // $patientLadger = DB::table('patient_ladgers')
            // // ->leftJoin('invoices', 'testbookings.id', '=', 'invoices.testbooking_id')
            // // ->leftJoin('patient_ladgers', 'patients.id', '=', 'patient_ladgers.patient_id')
            // ->where('patient_ladgers.id', $patientID[0]->id)
            // ->latest()
            // ->first();
            // // ->select('patient_ladgers.*');
            // return response()->json($patientID);
            

            // $dataFromPatient = DB::table('patients')
            // ->join('testbookings', 'patients.id', '=', 'testbookings.patient_id')
            // // ->leftJoin('invoices', 'testbookings.id', '=', 'invoices.testbooking_id')
            // // ->leftJoin('patient_ladgers', function ($join){
            // //     $join->on('patients.id', '=', 'patient_ladgers.patient_id');
            // //     $join->orderBy('patient_ladgers.created_at', 'desc');
            // //     $join->first();
            // // })
            // // ->first()
            // // ->get();
            // //
            // // ->join('test_details', 'reports.test_id', '=', 'test_details.test_id')
            // // ->select( 'testbookings.id as testbookings_id', 'test_details.gender as genderdetails','reports.id as reports_id','test_details.id as test_details_id','testbookings.*','reports.*','test_details.*', 'patients.*')->where('reg_no', $id)
            // ->where('reg_no', $id)
            // ->orWhere('patient_name','like', '%'.$id.'%')
            // ->select('testbookings.id as testbookings_id', 'invoices.id as invoices_id', 'patient_ladgers.id as patient_ladgers_id','invoices.*','patient_ladgers.*','testbookings.*', 'patients.*')
            // // ->orderBy('patient_ladgers.created_at', 'desc')
            // ->get();
    
            // return $dataFromPatient;

        // $dataFromPatient = DB::table('patients')
        // ->join('testbookings', 'patients.id', '=', 'testbookings.patient_id')
        // ->join('invoices', 'testbookings.id', '=', 'invoices.testbooking_id')
        // ->join('patient_ladgers', 'patients.id', '=', 'patient_ladgers.patient_id')
        // ->get();
        // //
        // // ->join('test_details', 'reports.test_id', '=', 'test_details.test_id')
        // // ->select( 'testbookings.id as testbookings_id', 'test_details.gender as genderdetails','reports.id as reports_id','test_details.id as test_details_id','testbookings.*','reports.*','test_details.*', 'patients.*')->where('reg_no', $id)
        // // ->where('reg_no', $id)
        // // ->orWhere('patient_name','like', '%'.$id.'%')
        // // ->select('testbookings.id as testbookings_id', 'invoices.id as invoices_id', 'patient_ladgers.id as patient_ladgers_id','invoices.*','patient_ladgers.*','testbookings.*', 'patients.*')
        // // ->orderBy('patient_ladgers.created_at', 'desc')
        // // ->first();

        // return $dataFromPatient;
    }

    /**
    * Show the form for editing the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function edit($id){
        //
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, $id){
        // $name =   $request->input('DepartmentName');
        // $description =   $request->input('DepartmentDescription');
        // Department::where('id',$id)->update(array(
        //     'name' =>  $name,
        //     'description' =>  $description
        //     ));
        // return response()->json([
        //     'name' => $name,
        //     'description' => $description
        // ]);

    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function destroy($id){
        // Department::find($id)->delete();
        // return($id);
    }
    public function getDetialsOfPatient($id){
        $dataFromPatient = DB::table('testbookings')
        // ->join('testbookings', 'patients.id', '=', 'testbookings.patient_id')
        ->join('reports', 'testbookings.id', '=', 'reports.testbooking_id')
        ->join('test_details', 'reports.test_id', '=', 'test_details.test_id')
        ->where('testbookings.patient_id', $id)
        ->select('test_details.gender as genderdetails','reports.id as reports_id','test_details.id as test_details_id','reports.*','test_details.*')
        // ->select('testbookings.id as testbookings_id', 'testbookings.*', 'patients.*')->where('reg_no', $id)
        ->get();
        return $dataFromPatient;
    }

}
