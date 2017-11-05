<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Access_menu;
class Access_menu_Controller extends Controller{
  
    public function Access_Menu(Request $request){
         $array=$request->all();
         for( $i=0 ; $i < count($array); $i++){
                $access_menu = Access_menu::create([
                  'menu_id'=>$array[$i]['id'],
                  'user_id'=>$array[$i]['user_id']
               ]);
         }
 return response()->json(['access_menu'=> $access_menu]);
    } 
    public function Menubar($id){
      $menubar = Access_menu::
           join('users','access_menus.user_id','=','users.id')
         ->join('menus','access_menus.menu_id','=','menus.id')
         ->where('user_id', $id)
         ->select('menus.*','access_menus.*')
         ->get();
         return response()->json(['menubar'=> $menubar]);
      }

      public function EditMenu(Request $request){
         $menuList=$request->all();
         $deleteId=$menuList[0]['user_id'];   
         $delete_menu = Access_menu::where('user_id',$deleteId)->delete();
         for($i=0;$i<count($menuList);$i++){
              $menus = Access_menu::create([
                    'menu_id'=>$menuList[$i]['id'],
                    'user_id'=>$menuList[$i]['user_id']
             ]);
          }
          return response()->json(['successfully Updated User!']);
 }
  }

