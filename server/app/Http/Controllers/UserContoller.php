<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class UserContoller extends Controller
{
    public function userdata(){
        $user = DB::table('users')->get();
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
        User::where('id',$id)->update(array(
            'name' =>  $name,
            'email' =>  $email
            ));
            return response()->json([
                'name' => $name,
                'email' => $email
            ]);
    }

    public function DeleteUser($id){
        User::find($id)->delete();
        return($id);
    }
}
