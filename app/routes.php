 <?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
Route::when('*', 'auth', ['post', 'put', 'delete']);
Route::get('/', ['as'=> 'home', 'uses' => 'HomeController@showIndex']);
Route::resource('posts', 'PostsController');
Route::resource('tags', 'TagsController');
Route::controller('users', 'UsersController', [
	'getLogin'	=> 'user.login',
	'getLogout'	=> 'user.logout',
	]);
Route::get('/', function()
{
	return View::make('hello');
});
