MONKEY( 'ThirdParty.Maps', function(Maps, utils, $) {

	Maps.callbacks         = [];
	Maps.isExecuteCallback = false;
	Maps.noop              = function() {};

	Maps.getScriptService = function(context, method) {
		context = ( context || this );
		method  = ( method || 'noop' );

		if ( this.isExecuteCallback ) {
			$.proxy( context, method ).call( null );
			return;
		}

		this.callbacks.push( $.proxy( context, method ) );
		this.getScript();
	};

	Maps.isExistScript = function() {
		return ( document.getElementById( 'google-service-maps' ) );
	};

	Maps.getScript = function() {
		var args
		  , script
		;

		if ( this.isExistScript() ) {
			return;
		}

		args = {
			'callback'  : 'MONKEY.ThirdParty.Maps.onFinallyScript',
			'libraries' : 'geometry,places',
			'key'       : 'AIzaSyDUX1SdMjfsjl30ycd9-yqmrMaa-FqPWgw',
			'v'			: '3.exp'
		};

		script = $( '<script>', {
			src : utils.addQueryVars( args, 'http://maps.googleapis.com/maps/api/js' ),
			id  : 'google-service-maps'
		});

		$( 'script:first' ).before( script );
	};

	Maps.onFinallyScript = function() {
		( this.callbacks || [] ).forEach(function(callback) {
			callback.call( null );
		});

		this.isExecuteCallback = true;
	};

}, {});
