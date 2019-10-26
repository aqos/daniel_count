<?php

use Illuminate\Http\Request;

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

Route::middleware(['cors'])->group(function () {
    Route::namespace('Api')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('login', 'AuthController@login');
            Route::post('register', 'AuthController@register');

            Route::middleware(['auth:api'])->group(function () {
                Route::get('logout', 'AuthController@logout');
                Route::get('user', 'AuthController@user');
            });
        });
        
        Route::resource('weather', 'WeatherController');
        Route::resource('time-slot', 'TimeSlotController');
        Route::resource('road', 'RoadController');
        Route::resource('department-couple', 'DepartmentCoupleController');
        Route::get('department-couple/{id}/roads', 'RoadController@showByDepartmentCouple');
        Route::resource('car-category', 'CarCategoryController');
        Route::resource('count', 'CountController');
    });
});