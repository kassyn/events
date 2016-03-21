MONKEY.ComponentWrapper( 'Place', function(Place, utils, $) {

	Place.fn.init = function() {
		this.places = null;
		this.map    = null;
		this.marker = null;
		this.getServiceMaps();
	};

	Place.fn.getServiceMaps = function() {
		MONKEY.ThirdParty.Maps.getScriptService( this, 'onFinallyScript' );
	};

	Place.fn.onFinallyScript = function() {
		this.setGoogleMap();
		this.setGooglePlaces();
		this.setGoogleMarker();
		this.setDefaultPosition();
		this.addEventListener();
	};

	Place.fn.addEventListener = function() {
		this.elements.search.on( 'keypress', this._onKeypress.bind( this ) );
		this.places.addListener( 'place_changed', this._onPlaceChanged.bind( this ) );
		this.marker.addListener( 'dragend', this._onDragend.bind( this ) );
	};

	Place.fn._onDragend = function() {
		this.setLatLng( this.marker.getPosition() );
	};

	Place.fn.setLatLng = function(position) {
		this.elements.lat.val( position.lat() );
		this.elements.lng.val( position.lng() );
	};

	Place.fn._onPlaceChanged = function() {
		var place = this.places.getPlace();

		if ( !place.geometry ) {
			return;
		}

		this.setPlaceInMap( place );
		this.setUpdateFields( place );
	};

	Place.fn.setUpdateFields = function(place) {
		var fields = $.extend( utils.getFieldsByPlace( place ), {
			lat : place.geometry.location.lat(),
			lng : place.geometry.location.lng(),
		});

		for ( var field in fields ) {
			this.elements[field].val( fields[field] );
		}
	};

	Place.fn.setPlaceInMap = function(place) {
		this.marker.setVisible( false );
		this.setViewportMap( place );
		this.marker.setPosition( place.geometry.location );
		this.marker.setVisible( true );
	};

	Place.fn.setViewportMap = function(place) {
		// If the place has a geometry, then present it on a map.
		if ( place.geometry.viewport ) {
			this.map.fitBounds( place.geometry.viewport );
			return;
		}

		this.map.setCenter( place.geometry.location );
		this.map.setZoom( 17 );
	};

	Place.fn._onKeypress = function(event) {
		if ( ( event.keyCode || event.which ) == 13 ) {
			event.preventDefault();
		}
	};

	Place.fn.setGooglePlaces = function() {
		this.places = new google.maps.places.Autocomplete( this.elements.search.get(0), {
			types: ['geocode']
		});

		this.places.bindTo( 'bounds', this.map );
	};

	Place.fn.setGoogleMap = function() {
		this.map = new google.maps.Map( this.elements.canvas.get(0), {
			zoom   : 5,
			center : {
				lat : -14.2400732,
				lng : -53.1805017
			}
        });
	};

	Place.fn.setDefaultPosition = function() {
		var lat = this.elements.lat.val()
		  , lng = this.elements.lng.val()
		;

		if ( !lat || !lng ) {
			return;
		}

		var position = this.getLatLng( lat, lng );

		this.map.setCenter( position );
		this.marker.setPosition( position );
		this.map.setZoom( 17 );
		this.marker.setVisible( true );
	};

	Place.fn.getLatLng = function(lat, lng) {
		return new google.maps.LatLng( lat, lng );
	};

	Place.fn.setGoogleMarker = function() {
		this.marker = new google.maps.Marker({
			map       : this.map,
			animation : google.maps.Animation.DROP,
			draggable : true,
			title     : 'Arraste este ponto',
        });
	};

});
