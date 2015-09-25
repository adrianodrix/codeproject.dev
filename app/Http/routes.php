<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function(){
    return view('app');
});

Route::post('oauth/access_token', function() {
    return Response::json(Authorizer::issueAccessToken());
});

Route::group(['middleware' => 'oauth'], function() {
    Route::resource('user',           'UserController',          ['except' => ['create', 'edit']]);
    Route::resource('client',         'ClientController',        ['except' => ['create', 'edit']]);
    Route::resource('project',        'ProjectController',       ['except' => ['create', 'edit']]);
    Route::get('/user/authenticated', ['as' => 'user.authenticated', 'uses' => 'UserController@authenticated']);

    Route::group(['middleware' => 'check-project-permission'], function() {
        Route::resource('project.note',   'ProjectNoteController',   ['except' => ['create', 'edit']]);
        Route::resource('project.task',   'ProjectTaskController',   ['except' => ['create', 'edit']]);
        Route::resource('project.file',   'ProjectFileController',   ['except' => ['create', 'edit']]);
        Route::resource('project.member', 'ProjectMemberController', ['except' => ['create', 'edit', 'update']]);

        Route::get('/project/{project}/file/{file}/download', ['as' => 'project.file.download', 'uses' => 'ProjectFileController@download']);
    });
});