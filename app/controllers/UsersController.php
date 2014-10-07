<?php

class UsersController extends \BaseController {

	/**
	 * View for login
	 *
	 * @return View
	 * @author Rahman
	 **/
	public function getLogin( $service = '' )
	{
		switch ($service) {
			case 'fb':
				return $this->facebook();
				break;

			case 'tw':
				return $this->twitter();
				break;
			
			default:
				return App::abort(500, 'Redirect for unknown service request not implemented yet!');
				break;
		}
	}

	/**
	 * Logout
	 *
	 * @return Redirect
	 * @author Rahman
	 **/
	public function getLogout()
	{
		Auth::logout();
		return Redirect::home();
	}

	/**
	 * Login/register Using Facebook Account
	 *
	 * @return void
	 * @author Rahman
	 **/
	public function facebook()
	{
		$code = Input::get( 'code' );

		$fb = OAuth::consumer( 'Facebook' );

		if ( !empty( $code ) ) {

			$token = $fb->requestAccessToken( $code );

			$result = json_decode( $fb->request( '/me' ), true );

			$id          = $result['id'];
			$name        = $result['name'];
			$email       = $result['email'];
			$gender      = $result['gender'];
			$timezone    = $result['timezone'];
			$username    = str_random(10);
			$password    = Hash::make(str_random(20));
			$confirmed   = true;
			
			$user = User::where(['email'=>$email])->first();
			
			if(!$user){
			
				$user = User::create([
					'email'    => $email,
					'username' => $username,
					'password' => $password,
					'confirmed'=> $confirmed,
					]);

			}

			Auth::login($user);

			return Redirect::home();

		}else {

			$url = $fb->getAuthorizationUri();

			return Redirect::to( (string)$url );

		}
	}

	/**
	 * Login/Register Using twitter
	 *
	 * @return void
	 * @author Rahman
	 **/
	public function twitter()
	{
		return App::abort(500, 'Twitter login is not implemented yet!');
	}

}
