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

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/control-drone', function () {
    return view('control_drone');
})->name('control-drone');

Route::get('/control-kunka', function () {
    return view('control_kunka');
})->name('control-kunka');
