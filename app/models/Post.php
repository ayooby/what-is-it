<?php

class Post extends Eloquent{
	protected $table = 'posts';
	protected $fillable = ['user_id', 'title', 'image', 'audio'];
	
	public function user(){
		return $this->belongsTo('User');
	}

	public function tags(){
		return $this->belongsToMany('Tag');
	}
}