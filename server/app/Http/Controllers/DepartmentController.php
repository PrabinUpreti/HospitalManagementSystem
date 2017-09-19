<?php

namespace App\Http\Controllers;
use App\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    // public function postDepartment(Request $request){
    //     $departmentName = $request->input('DepartmentName');
    //     $departmentDescription = $request->input('DepartmentDescription');
        
    //        $department = Department::create([
    //             'name'=>$departmentName,
    //             'description'=>$departmentDescription,
    //          ]);

    //          return $department;
    // }


    // public function getDepartment(){
    //     $getdepartment = Department::all();
    //     return $getdepartment;
    // }







    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index(){
            $getdepartment = Department::orderBy("created_at" , "desc")->get();
            return $getdepartment;
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
            $departmentName = $request->input('DepartmentName');
            $departmentDescription = $request->input('DepartmentDescription');
            
               $department = Department::create([
                    'name'=>$departmentName,
                    'description'=>$departmentDescription,
                 ]);    
                 return $department;
     }
 
     /**
      * Display the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function show($id){
 
        //  $items = Data::find($id)->amounts;
        //  return view('khata.peopleList')
        //          ->with("items",$items)
        //          ->with("itemsOnly",Data::find($id));         
 
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
         $name =   $request->input('DepartmentName');
         $description =   $request->input('DepartmentDescription');
         Department::where('id',$id)->update(array(
            'name' =>  $name,
            'description' =>  $description
            ));
        return response()->json([
            'name' => $name,
            'description' => $description
        ]);

     }
 
     /**
      * Remove the specified resource from storage.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function destroy($id){
         Department::find($id)->delete();
         return($id);
     }












    
}
