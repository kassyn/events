<?php
if ( ! function_exists( 'add_action' ) ) {
	exit(0);
}

/*
 * Import Files
 */
include 'includes/utils.php';
include 'includes/metaboxes.php';

/*
 * All Hooks
 */
add_action( 'after_setup_theme', 'rest_setup_theme' );
add_action( 'admin_init', 'rest_register_meta_boxes' );
add_action( 'admin_enqueue_scripts', 'rest_admin_scripts' );
add_action( 'admin_enqueue_scripts', 'rest_admin_styles' );

/*
 * Generic functions in theme
 */
function rest_setup_theme()
{
	// Enable featured image
	add_theme_support( 'post-thumbnails' );

	// Thumbnail sizes
	//add_image_size( 'slug-image', 520, 245, true );
}

function rest_register_meta_boxes()
{
	new Metaboxes(
		array(
			'id'               => 'post-location',
			'meta_keys'        => array(
				'address'  => true,
				'route'    => true,
				'locality' => true,
				'state'    => true,
				'lat'      => true,
				'lng'      => true,
			),
			'post_type'        => 'post',
			'context'          => 'normal',
			'priority'         => 'high',
			'title'            => 'Local do Evento',
			'content_callback' => 'rest_get_view_metaboxes',
		)
	);
}

function rest_get_view_metaboxes( $post, $id )
{
	$file = TEMPLATEPATH . "/view/{$id}.php";

	if ( ! file_exists( $file ) ) {
		echo "<pre>file not exists in view/{$id}.php</pre>";
		return;
	}

	include $file;
}

function rest_admin_scripts()
{
	wp_enqueue_script(
		'rest-theme-script',
		get_stylesheet_directory_uri() . '/assets/javascripts/built.js',
		array( 'jquery' ),
		filemtime( get_stylesheet_directory() . '/assets/javascripts/built.js' ),
		true
	);
}

function rest_admin_styles()
{
	wp_enqueue_style(
		'rest-theme-style',
		get_stylesheet_directory_uri() . '/assets/stylesheets/style.css',
		array(),
		filemtime( get_stylesheet_directory() . '/assets/stylesheets/style.css' )
	);
}
