<?php
if ( ! function_exists( 'add_action' ) ) {
    exit(0);
}

$address  = get_post_meta( $post->ID, 'address', true );
$route    = get_post_meta( $post->ID, 'route', true );
$locality = get_post_meta( $post->ID, 'locality', true );
$state    = get_post_meta( $post->ID, 'state', true );
$lat      = get_post_meta( $post->ID, 'lat', true );
$lng      = get_post_meta( $post->ID, 'lng', true );
?>

<div data-component="place" class="wrap-location">
	<div class="input-place">
	    <input data-element="search" class="large-text" placeholder="Informe a localização" type="text" name="address" value="<?php echo esc_attr( $address ); ?>">
        <input data-element="route" type="hidden" name="route" value="<?php echo esc_attr( $route ); ?>">
        <input data-element="locality" type="hidden" name="locality" value="<?php echo esc_attr( $locality ); ?>">
        <input data-element="state" type="hidden" name="state" value="<?php echo esc_attr( $state ); ?>">
        <input data-element="lat" type="hidden" name="lat" value="<?php echo esc_attr( $lat ); ?>">
        <input data-element="lng" type="hidden" name="lng" value="<?php echo esc_attr( $lng ); ?>">
	</div>

	<div data-element="canvas" class="map"></div>
</div>
