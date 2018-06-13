<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'Front@home')->name('home');

Route::get('/control-drone', 'Front@control_drone')->name('control-drone');

Route::get('/control-kunka', function () {
    return view('kunka.control');
})->name('control-kunka');

Route::get('/webrtc', 'Front@webrtc')->name('webrtc');
Route::get('/webrtclient', 'Front@webrtc_client')->name('webrtc_client');
