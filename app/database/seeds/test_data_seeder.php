<?php 
class TestDataSeeder extends Seeder{

	public function run()
	{
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
		DB::table('post_tag')->truncate();
		DB::table('tags')->truncate();
		DB::table('posts')->truncate();
		DB::table('users')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

		DB::table('users')->insert([
			[
				'id'		=> 1,
				'email' 	=> 'rahman@localhost.com',
				'username'	=> 'mousavian',
				'password' 	=> Hash::make('123456'),
				'confirmed' => '1',
				'last_logged_in' => new DateTime,
				'created_at'=> new DateTime,
				'updated_at'=> new DateTime
			]
		]);

		DB::table('tags')->insert([
			[
				'id'	=> 1,
				'name'	=> 'cloud',
			],[
				'id'	=> 2,
				'name'	=> 'network',
			],[
				'id'	=> 3,
				'name'	=> 'programming',
			],[
				'id'	=> 4,
				'name'	=> 'os',
			],[
				'id'	=> 5,
				'name'	=> 'security',
			]
		]);

		DB::table('posts')->insert([
			[

				'id'		=> 1,
				'user_id' 	=> 1,
				'title'		=> 'What is Openstack?',
				'audio' 	=> '1.mp3',
				'image' 	=> 'p-01.jpg',
				'created_at'=> new DateTime,
				'updated_at'=> new DateTime
			],[
				'id'		=> 2,
				'user_id' 	=> 1,
				'title'		=> 'What is Linux?',
				'audio' 	=> '2.mp3',
				'image' 	=> 'p-02.jpg',
				'created_at'=> new DateTime,
				'updated_at'=> new DateTime
			],[
				'id'		=> 3,
				'user_id' 	=> 1,
				'title'		=> 'What is Cloud?',
				'audio' 	=> '3.mp3',
				'image' 	=> 'p-04.jpg',
				'created_at'=> new DateTime,
				'updated_at'=> new DateTime
			],[
				'id'		=> 4,
				'user_id' 	=> 1,
				'title'		=> 'What is ShellShock?',
				'audio' 	=> '4.mp3',
				'image' 	=> 'p-05.jpg',
				'created_at'=> new DateTime,
				'updated_at'=> new DateTime
			],[
				'id'		=> 5,
				'user_id' 	=> 1,
				'title'		=> 'Who am i?',
				'audio' 	=> '6.mp3',
				'image' 	=> 'p-07.jpg',
				'created_at'=> new DateTime,
				'updated_at'=> new DateTime
			]
		]);
		
		DB::table('post_tag')->insert([
			['post_id'=> 1, 'tag_id'=> 1],
			['post_id'=> 1, 'tag_id'=> 4],
			['post_id'=> 2, 'tag_id'=> 4],
			['post_id'=> 3, 'tag_id'=> 1],
			['post_id'=> 3, 'tag_id'=> 4],
			['post_id'=> 4, 'tag_id'=> 5],
			['post_id'=> 4, 'tag_id'=> 4],
		]);
	}
}