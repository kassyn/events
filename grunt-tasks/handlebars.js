module.exports = {
	options: {
		namespace: 'MONKEY.Templates',
		processName: function(filePath) {
			var text = filePath.replace(/(ghost\/)?handlebars\//, '').replace(/\.hbs$/, '');
			text = text.replace(/(?:^|-)\w/g, function(match, index) {
				return ( !index ) ? match : match.toUpperCase();
			});
			return text.replace(/-/g, '');
		}
	},
	dev: {
		files: {
			"<%= paths.js %>/templates/templates.js": ["handlebars/**/*.hbs"],
		}
	}
};
