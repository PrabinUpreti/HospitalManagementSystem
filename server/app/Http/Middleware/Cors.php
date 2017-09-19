<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
    //    $trusted_domains = ["http://localhost:8000","http://localhost:4200"];
        
    //     if(isset($request->server()['HTTP_ORIGIN'])) {
    //         $origin = $request->server()['HTTP_ORIGIN'];

    //         if(in_array($origin, $trusted_domains)) {
    //             header('Access-Control-Allow-Origin: ' . $origin);
    //             header('Access-Control-Allow-Headers: Origin, Content-Type, x-requested-with, Accept, Authorization');
    //             header('Access-Control-Allow-Credentials: true');
    //         }
    //     }
        return $next($request);
    }
}
