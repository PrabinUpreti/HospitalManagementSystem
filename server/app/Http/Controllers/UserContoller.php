<?php

namespace App\Http\Controllers;
use App\User;
use App\Access_menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class UserContoller extends Controller
{
    public function userdata(){
        $user = User::with('access')->get();
        return response()->json(['user'=>$user]);
    }
    
    
    public function Adduserdata(Request $request){
        $user = $request -> all();
            
            $name = $user['name'];
            $email = $user['email'];
            $password = $user['password'];
            $status = $user['status'];

        $users = User::create([
               "name" => $name,
               "email" => $email,
               "password" => bcrypt($password),
               "status" => $status,
            ]);
        return response()->json([$users]);
  }

  public function EditUser(Request $request, $id){
        $name = $request->input('User_name');
        $email =   $request->input('email');
        $status = $request->input('status');
        User::where('id',$id)->update(array(
            'name' =>  $name,
            'email' =>  $email,
            'status'=> $status
            ));
            return response()->json([
                'name' => $name,
                'email' => $email,
                'status'=> $status
            ]);
    }

    public function DeleteUser($id){
        Access_menu::where('user_id',$id)->delete();
        User::find($id)->delete();
        return($id);
    }
    public function hospitalInfo(){
        return DB::table('init_hospitals')->get();
    }
}
