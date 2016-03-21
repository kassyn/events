MONKEY( 'Utils', function(Utils, _, $) {

	Utils.now = function() {
		return ( new Date() ).getTime();
	};

	Utils.getArgs = function(args) {
		return [].slice.call( args );
	};

	Utils.addQueryVars = function(params, url) {
		var listParams = [];

		for ( var item in params ) {
			listParams.push( item + '=' + params[ item ] );
		}

		return url + ( url.match(/\/\?/) ? '&' : '?' ) + listParams.join( '&' );
	};

	Utils.getFieldsByPlace = function(place) {
		var fields = {
			route                       : 'long_name',
			locality                    : 'long_name',
			administrative_area_level_1 : 'short_name',
		};

		var founds = {}
		  , field
		  , i
		;

		for ( i = 0; i < place.address_components.length; i++ ) {
			field = place.address_components[i].types[0];

			if ( fields[field] && field == 'administrative_area_level_1' ) {
				founds['state'] = place.address_components[i][fields[field]];
				continue;
			}

			if ( fields[field] ) {
				founds[field] = place.address_components[i][fields[field]];
			}
		}

		return founds;
	};

}, MONKEY.utils );
