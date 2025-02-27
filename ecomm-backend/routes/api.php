<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('addproduct', [ProductController::class,'addProduct']); 
Route::get('list', [ProductController::class,'list']); 
Route::delete('delete/{id}', [ProductController::class,'delete']); 
Route::get('product/{id}', [ProductController::class,'getProduct']); 
Route::post('update/{id}', [ProductController::class, 'updateProduct']);
Route::get('search/{key}',[ProductController::class, 'search']);
Route::post('adduser', [UserController::class,'addUser']); 
Route::get('listuser', [UserController::class,'listUser']); 
Route::delete('deleteuser/{id}', [UserController::class,'deleteUser']); 
Route::get('user/{id}', [UserController::class,'getUser']); 
Route::post('updateuser/{id}', [UserController::class, 'updateUser']);
Route::get('searchuser/{key}',[UserController::class, 'searchUser']);
