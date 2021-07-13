<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PrestadoresController;
use App\Http\Controllers\ServicosController;

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

Route::get('/login', [UsersController::class, 'login'])->name('login');
Route::post('/usuarios/send', [UsersController::class, 'ajax'])->name('ajaxUsuarios');

Route::group(['middleware' => 'web'], function () {
    Route::get('/', [HomeController::class, 'home'])->name('home');
    Route::get('/home', [HomeController::class, 'home'])->name('home');
    Route::get('/logout', [UsersController::class, 'logout'])->name('logout');

    Route::get('/prestadores', [PrestadoresController::class, 'prestadores'])->name('prestadores');
    Route::get('/prestadores/insert', [PrestadoresController::class, 'insert'])->name('insertPrestadores');
    Route::get('/prestadores/update/{id}', [PrestadoresController::class, 'update'])->name('updatePrestadores');
    Route::post('/prestadores/send', [PrestadoresController::class, 'ajax'])->name('ajaxPrestadores');

    Route::get('/servicos', [ServicosController::class, 'servicos'])->name('servicos');
    Route::get('/servicos/insert', [ServicosController::class, 'insert'])->name('insertServicos');
    Route::get('/servicos/update/{id}', [ServicosController::class, 'update'])->name('updateServicos');
    Route::post('/servicos/send', [ServicosController::class, 'ajax'])->name('ajaxServicos');

    Route::get('/usuarios', [UsersController::class, 'usuarios'])->name('usuarios');
    Route::get('/usuarios/insert', [UsersController::class, 'insert'])->name('insertUsuarios');
    Route::get('/usuarios/update/{id}', [UsersController::class, 'update'])->name('updateUsuarios');
});
