<?php 

return array( 
	
	/*
	|--------------------------------------------------------------------------
	| oAuth Config
	|--------------------------------------------------------------------------
	*/

	/**
	 * Storage
	 */
	'storage' => 'Session', 

	/**
	 * Consumers
	 */
	'consumers' => [

		/**
		 * Facebook
		 */
        'Facebook' => [
            'client_id'     => '1498115177113948',
            'client_secret' => '8f04eabe764c204997c8006de8ece981',
            'scope'         => ['email'],
        ],

	]

);