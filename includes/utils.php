<?php
// Avoid that files are directly loaded
if ( ! function_exists( 'add_action' ) ) {
	exit(0);
}

class Utils
{
	public static function get( $key, $default = '', $sanitize = 'esc_html' )
	{
		if ( ! isset( $_GET[ $key ] ) OR empty( $_GET[ $key ] ) )
			return $default;

		if ( is_array( $_GET[ $key ] ) )
			return $_GET[ $key ];

		return self::sanitize_type( $_GET[ $key ], $sanitize );
	}

	public static function post( $key, $default = '', $sanitize = 'esc_html' )
	{
		if ( ! isset( $_POST[ $key ] ) OR empty( $_POST[ $key ] ) )
			return $default;

		if ( is_array( $_POST[ $key ] ) )
			return $_POST[ $key ];

		return self::sanitize_type( $_POST[ $key ], $sanitize );
	}

	public static function sanitize_type( $value, $name_function )
	{
		if ( ! $name_function )
			return $value;

		if ( ! is_callable( $name_function ) )
			return esc_html( $value );

		return call_user_func( $name_function, $value );
	}

	public static function has_key( $list, $key )
	{
		return isset( $list[$key] ) && (bool)$list[$key];
	}

	public static function verify_nonce_post( $name, $action )
	{
		return wp_verify_nonce( self::post( $name, false ), $action );
	}
}
