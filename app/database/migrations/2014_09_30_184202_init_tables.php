<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InitTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create('users', function(Blueprint $table){
			$table->increments('id');
			$table->string('email')->unique();
			$table->string('username')->unique();
			$table->string('password', 64);
			$table->tinyInteger('confirmed')->unsigned()->default(0);
			$table->string('remember_token', 64)->nullable();
			$table->dateTime('last_logged_in')->nullable();
			$table->timestamps();
		});

		Schema::create('tags', function(Blueprint $table){
			$table->increments('id');
			$table->string('name')->unique();

		});

		Schema::create('post_tag', function(Blueprint $table){
			$table->integer('post_id')->unsigned();
			$table->integer('tag_id')->unsigned();
		});

		Schema::create('posts', function(Blueprint $table){
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->string('title');
			$table->string('audio');
			$table->string('image');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('post_tag');
		Schema::drop('tags');
		Schema::drop('posts');
		Schema::drop('users');
	}

}
