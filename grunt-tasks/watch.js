module.exports =  {
	styles : {
		files : ['<%= paths.style %>/**/*.scss'],
		tasks : ['sass:dev']
	},
	templates : {
		files: ['handlebars/**/*.hbs'],
		tasks: ['handlebars:dev']
	},
	scripts : {
		files : '<%= concat.dist.src %>',
		tasks : ['jshint', 'concat']
	}
};
