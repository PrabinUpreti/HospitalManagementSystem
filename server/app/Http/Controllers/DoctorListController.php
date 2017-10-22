<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DoctorList;

class DoctorListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index()
     {
        // $getDoctorList = DB::table('doctor_lists')->get();
        // return $getDoctorList;
        $getDoctorList = DoctorList::orderBy("created_at" , "desc")->get();
        return $getDoctorList;
     }
 
     /**
      * Show the form for creating a new resource.
      *
      * @return \Illuminate\Http\Response
      */
     public function create()
     {
        //
     }
 
     /**
      * Store a newly created resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @return \Illuminate\Http\Response
      */
     public function store(Request $request)
     {         
        $name = $request->input('doctor_name');
        $address = $request->input('doctor_address');
        $nationality = $request->input('identity_card');
        $gender = $request->input('gender');
        $marital_status = $request->input('marital_status');
        $month = $request->input('month');
        $day = $request->input('day');
        $year = $request->input('year');
        $phone = $request->input('phone');
        $email = $request->input('email');
           $doctor = DoctorList::create([
                'name' => $name,
                'address'=>$address,
                'phone'=>$phone,
                'registration_no'=>$nationality,
                'email'=>$email,
                'department'=>$marital_status,
             ]);
             return $doctor;
     }
 
     /**
      * Display the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function show($id)
     {
         return response()->Json([
             'status'=>'i am inside'
         ]);
     }
 
     /**
      * Show the form for editing the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function edit($id)
     {
         //
     }
 
     /**
      * Update the specified resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function update(Request $request, $id)
     {
    //     $name =   $request->input('TestName');
    //     $description =   $request->input('TestDescription');
    //     Test::where('id',$id)->update(array(
    //        'name' =>  $name,
    //        'description' =>  $description
    //        ));
    //    return response()->json([
    //        'name' => $name,
    //        'description' => $description
    //    ]);
     }
 
     /**
      * Remove the specified resource from storage.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function destroy($id)
     {
        // Test::find($id)->delete();
        // return($id);
     }
}
