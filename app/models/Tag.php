<?php

class Tag extends Eloquent{
	protected $table = 'tags';
	protected $fillable = ['name'];
	protected $hidden = ['pivot'];

	public function posts(){
		return $this->belongsToMany('Post');
	}
}