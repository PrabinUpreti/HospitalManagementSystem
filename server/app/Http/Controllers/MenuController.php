<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menu;
use Illuminate\Support\Facades\DB;
class MenuController extends Controller
{
    // public function postdata(Request $request){
    // return response()->json([
    //         "data"=>"",
    //         "data2"=>$response->input('datafromclient')
    //     ]);

    // foreach($request->input('datafromclient') as $record){
    //   $name = $record['name'];
    //   $position = $record['position'];

    //     Menu::create([
    //             "name"=>$name,
    //             "position"=>$position
    //         ]);
    // }
    //   return"Successfully Stored";


// }
  public function Menucontroller(){
    $menu = DB::table('menus')->get();
    return response()->json(['menu'=>$menu]);
  }
}
